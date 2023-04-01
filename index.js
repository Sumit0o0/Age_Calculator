$(document).ready(function () {
  function setCookie(day, month, year) {
    document.cookie = "day" + "=" + day;
    document.cookie = "month" + "=" + month;
    document.cookie = "year" + "=" + year;
    document.cookie = "max-age=900";
  }

  $("input").focusin(function () {
    $(this).addClass("colorChange");
  });
  $("input").focusout(function () {
    $(this).removeClass("colorChange");
  });

  /* ----------------------------- INPUT MAXLENGTH ---------------------------- */
  $("#dayInput").on("input", function () {
    if ($(this).val().length > 2) {
      $(this).val($(this).val().slice(0, 2));
    }
  });

  $("#monthInput").on("input", function () {
    if ($(this).val().length > 2) {
      $(this).val($(this).val().slice(0, 2));
    }
  });

  $("#yearInput").on("input", function () {
    if ($(this).val().length > 4) {
      $(this).val($(this).val().slice(0, 4));
    }
  });

  /* ---------------------------- INPUT VALIDATION ---------------------------- */
  $("#dayInput").focusout(function () {
    let dayval = parseInt($("#dayInput").val());
    if (dayval >= 31) {
      $("#dayInput").val(31);
    } else if (dayval <= 0) {
      $("#dayInput").val(01);
    } else if (dayval < 10 && $("#dayInput").val().length < 2) {
      $("#dayInput").val(0 + $("#dayInput").val());
    }
  });

  $("#monthInput").focusout(function () {
    let monthval = parseInt($("#monthInput").val());
    if (monthval >= 12) {
      $("#monthInput").val(12);
    } else if (monthval <= 0) {
      $("#monthInput").val(1);
    } else if (monthval < 10 && $("#monthInput").val().length < 2) {
      $("#monthInput").val(0 + $("#monthInput").val());
    }
    oddevenmonth();
  });

  $("#yearInput").focusout(function () {
    let yearval = parseInt($("#yearInput").val());
    let latestYear = parseInt(new Date().getFullYear().toString());
    if (yearval <= 1875) {
      $("#yearInput").val(1875);
    } else if (yearval > latestYear) {
      $("#yearInput").val(latestYear);
    }
    oddevenmonth();
  });

  function oddevenmonth() {
    let dayval = parseInt($("#dayInput").val());
    let monthval = parseInt($("#monthInput").val());

    if (dayval == 31 && [4, 6, 9, 11].includes(monthval)) {
      $("#dayInput").val(30);
    } else if (
      dayval == 30 &&
      monthval == [1, 3, 5, 7, 8, 10, 12].includes(monthval)
    ) {
      $("#dayInput").val(31);
    } else if (dayval == 31 || (dayval == 30 && [2].includes(monthval))) {
      $("#dayInput").val(28);
    }
  }

  /* -------------------------- FINAL OUTPUT ON CLICK ------------------------- */
  $("#submitbtn").click(function (e) {
    let dayval = parseInt($("#dayInput").val());
    let monthval = parseInt($("#monthInput").val());
    let yearval = parseInt($("#yearInput").val());

    let currentYear = parseInt(new Date().getFullYear().toString()) - 1;
    let currentmonth = 11 + parseInt(new Date().getMonth().toString());
    let currentday = 31 + parseInt(new Date().getDate().toString());

    let finalYear = Math.abs(currentYear - yearval);
    let finalMonth = Math.abs(currentmonth - monthval + 1);
    let finalDay = Math.abs(currentday - dayval);

    if ($("input").val() === "") {
      $("li span").addClass("visble");
      $("label").addClass("redoutput");
      $("#daysOutput").text("--");
      $("#monthOutput").text("--");
      $("#yearOutput").text("--");
      return false;
    }

    if (finalDay.toString().length < 2) {
      $("#daysOutput").text(`0${finalDay}`);
    } else {
      $("#daysOutput").text(finalDay);
    }

    if (finalMonth.toString().length < 2) {
      $("#monthOutput").text(`0${finalMonth}`);
    } else if (finalMonth == 12) {
      $("#monthOutput").text(0);
      $("#yearOutput").text(finalYear + 1);
    } else {
      $("#monthOutput").text(finalMonth);
      $("#yearOutput").text(finalYear);
    }

    if (finalMonth >= 12) {
      $("#monthOutput").text(finalMonth - 12);
    } else {
      $("#yearOutput").text(finalYear);
    }

    setCookie(
      $("#dayInput").val(),
      $("#monthInput").val(),
      $("#yearInput").val()
    );

    $("li span").removeClass("visble");
    $("label").removeClass("redoutput");
    e.preventDefault();
    return true;
  });

  function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  $("#dayInput").val(getCookie("day"));
  $("#monthInput").val(getCookie("month"));
  $("#yearInput").val(getCookie("year"));
});
