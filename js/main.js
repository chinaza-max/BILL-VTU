


$(document).ready(function () {


    $(".icon-hide").hide();

    const isMoneyVisibility=localStorage.getItem("isMoneyVisibility")

    if(isMoneyVisibility==="true"){

    }

    $('.icon-show').on('click', function () {
      $("#balance").text('........');
      $(this).hide();
      $(this).siblings('.icon-hide').show();
      localStorage.setItem("isMoneyVisibility",true)

    });

    $('.icon-hide').on('click', function () {
      $("#balance").text('90000');
      $(this).hide();
      $(this).siblings('.icon-show').show();
      localStorage.setItem("isMoneyVisibility",true)

    });
  });