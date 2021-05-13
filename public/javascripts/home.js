
$(document).ready(function () {

    let userBadge = $('#userBadge');
    let kids = userBadge.children();
    if (kids.length > 5) {
      kids.last().remove();
    }

  $(".title").each(function () {
    $(this).children(":first").removeAttr("style");
    $(this).children(":first").css({"font-weight": "600",
    "font-size": "20px",
    "line-height": "24px",})
  });
});

