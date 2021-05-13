

$("#regBtn").on("click", function () {
    let name = $("#nameInput").val();
    let familyName = $("#familyInput").val();
    let userName = $("#userInput").val();
    let password = $("#passInput").val();
    let rePassword = $("#rePassInput").val();
    let email = $("#emailInput").val();
    let sex = $("#sex").val();
    let phoneNumInput = $("#phoneNumInput").val();

    

  if (password === rePassword) {
    $.ajax({
      type: "POST",
      url: "/auth/signUp",
      data: {
        firstName: name,
        lastName: familyName,
        userName: userName,
        password: password,
        sex: sex,
        mobile: phoneNumInput,
        email: email,
      },
      success: function (response) {
          window.location.href = './signInPage';
      }, error: function (res) {
        if (res.status === 403) {
          $('#userInput').css( 'border-color', 'red' );
          $('#userInput').attr('placeholder', 'User Already Exist');
          $('#userInput').val('');
        }
      }
    });
  } else {
    $("#passInput").css( 'border-color', 'red' );
    $("#passInput").attr('placeholder', 'Password are not the same');
    $('#passInput').val('');
    $("#rePassInput").css( 'border-color', 'red' );
    $("#rePassInput").attr('placeholder', 'Password are not the same');
    $('#rePassInput').val('');

  }
 
});
