// Client facing scripts here

$(() => {
  $('#fetch-orders').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/orders'
    })
    .done((response) => {
      const $ordersList = $('#orders');
      $ordersList.empty();

      for(const order of response.orders) {
        $(`
        <article class="order">
          <header>
            <div class="order-id">order #${order.id}</div>
          </header>
            <div class="order-user_id">user_id ${order.user_id}</div>
            <div class="order-active">${order.active}</div>
            <div class="order-estimated_time_minutes">ETA: ${order.estimated_time_minutes}</div>
          <footer>
          <button type="button">Accept order</button> 
          <button type="button">Reject order</button> 
          </footer>
        </article>
        `).appendTo($ordersList);
      }
    });
  });
});