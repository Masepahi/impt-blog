$("#signInBtn").on("click", function () {
  let userName = $("#userInput").val();
  let password = $("#passInput").val();


  $.ajax({
    type: "POST",
    url: "/auth/signIn",
    data: {
      emailOrUserName: userName,
      password: password,
    },
    success: function (response) {

      window.location.href = '../user/dashboard';
    }, error: function (res) {
      $('#alert').css('display', 'block');

    }
  });
});
