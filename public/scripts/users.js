$(() => {
  // Existing users fetching code
  $('#fetch-users').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/users'
    })
    .done((response) => {
      const $usersList = $('#users');
      $usersList.empty();

      for(const user of response.users) {
        $(`<li class="user">`).text(user.name).appendTo($usersList);
      }
    });
  });

  // Form submission code
  $('#contact-form').on('submit', function(event) {
    console.log('inside submit handle');
    event.preventDefault();

    let name = $('#name').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let message = $('#message').val();

    //check if any of the input fields is empty
    if(name === '' || email === '' || phone === '' || message === ''){
      $('#form-error-message').text('⚠️ Error: All fields are required! ⚠️');
      $('#form-error-message').slideDown();
      return;
    }

    // If everything is filled out, submit the form (you would need to do this via AJAX in this example)
    $.ajax({
      type: 'POST',
      url: '/submit_form',
      data: {
        name: name,
        name: name,
        email: email,
        phone: phone,
        message: message
      },
      success: function(data) {
        $('#form-success-message').text('✅ Your message has been sent! ✅');
        $('#form-success-message').slideDown();
      },
      error: function(data) {
        $('#form-error-message').text('⚠️ Error: Something went wrong. Please try again. ⚠️');
        $('#form-error-message').slideDown();
      }
    });
  });
});
