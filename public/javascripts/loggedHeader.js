$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "../user/loggedUser",
    success: function (response) {
      let userName = $("#userNameLogged");
      let avatar = `${response.avatar}`;
      $("#headerAvatar").attr("src", `../images/${response.avatar}`);

      let userNameContent = $(`<p>${response.userName}</p>`);
      userNameContent.appendTo(userName);
    },
  });
});
