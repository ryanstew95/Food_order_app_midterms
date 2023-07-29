// Client facing scripts here

$(() => {
  $('#fetch-orders').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/orders'
    })
    .done((response) => {
      const $ordersPending = $('#orders-pending');
      const $ordersProgress = $('#orders-progress');
      const $ordersCompleted = $('#orders-completed');
      const $ordersCancelled = $('#orders-cancelled');
      $ordersPending.empty();
      $ordersProgress.empty();
      $ordersCompleted.empty();
      $ordersCancelled.empty();
      for (const order of response.orders) {
        let oStatus = '';
        let orderElementbuttons = ``;
        if (order.active && order.date_created !== null && order.date_accepted === null && order.date_completed === null) {
          oStatus = 'pending';
          orderElementbuttons = `
          <button type="button" class="accept">Accept order</button>
          <button type="button" class="reject">Reject order</button>
          `
        } else if (order.active && order.date_created !== null && order.date_accepted !== null && order.date_completed === null) {
          oStatus = 'progress';
          orderElementbuttons = `
          <button type="button" class="complete">Complete order and send ETA</button>
          <button type="button" class="cancel">Cancel order and notify customer</button>
          `
        } else if (!order.active && order.date_created !== null && order.date_accepted !== null && order.date_completed !== null) {
          oStatus = 'completed';
        } else if (!order.active && order.date_created !== null && order.date_completed === null) {
          oStatus = 'cancelled';
        }
        const orderElement = `
        <article class="order-${oStatus}" id="${order.id}">
          <header>
            <div class="order-id">order #${order.id}</div>
            <div class="order-status">order status: ${oStatus}</div>
          </header>
            <div class="order-user_id">user_id ${order.user_id}</div>
            <div class="order-active">${order.active}</div>
            <div class="order-estimated_time_minutes">ETA: ${order.estimated_time_minutes}</div>
          <footer>
          ${orderElementbuttons}
          </footer>
        </article>
        `;
        if (oStatus === 'pending') {
          $(orderElement).appendTo($ordersPending);
        }
        else if (oStatus === 'progress') {
          $(orderElement).appendTo($ordersProgress);
        }
        else if (oStatus === 'completed') {
          $(orderElement).appendTo($ordersCompleted);
        }
        else if (oStatus === 'cancelled') {
          $(orderElement).appendTo($ordersCancelled);
        }
      }
      let buttons = document.querySelectorAll(".accept, .reject, .complete, .cancel")
      for (const button of buttons) {
        let orderId = button.parentElement.parentElement.id;
        let buttonType = button.className
        button.addEventListener('click', () => {
          $.ajax({
            method: 'POST',
            url: '/api/orders',
            data: {buttonType, orderId}
          })
          console.log(orderId);
          console.log(button.className);

        })
      };
    document.getElementById("defaultTab").click();
    });
  });
  document.getElementById("fetch-orders").click();
});
const openTab = (e, tab) => {
  const sections = document.getElementsByTagName("section");
  const sectionToShow = document.getElementById(tab);
  for (const section of sections) {
    section.style.display = "none";
  }
  sectionToShow.style.display = "unset";
};
