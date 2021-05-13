

$(document).on("click", "#saveBtn", function () {
  let email = $("#emailInput").val();
  let mobile = $("#phoneNumInput").val();
  let userName = $("#userInput").val();
  let bio = $("#bioInput").val();
  let password = $("#password").val();
  let repassword = $("#repassword").val();

  if (password !== repassword) {
    $("#password").removeClass('border-gray-300');
    $("#repassword").removeClass('border-gray-300');
    $("#password").addClass('border-red');
    $("#repassword").addClass('border-red');
  } else {
    $.ajax({
      type: "put",
      url: "./updateUser",
      data: {
        email: email,
        mobile: mobile,
        userName: userName,
        bio: bio,
        password: password,
      },
      success: function (response) {
        window.location.href = "./user/dashboard";
      },
    });
  }
});
