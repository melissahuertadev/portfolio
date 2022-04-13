$(document).ready(function () {
  let btnGobackUp = $("#btnGobackUp");

  window.addEventListener("pageshow", () => {
    let contactForm = $("#contact-form");
    contactForm[0].reset();
  });

  //Display and hide "goback up button"
  $(window).on("scroll", function () {
    let workflowOffset = $("#workflow").offset().top;
    let windowScroll = $(window).scrollTop();

    if (windowScroll >= workflowOffset) {
      btnGobackUp.css("margin-right", 0);
    } else if (windowScroll <= workflowOffset / 2) {
      btnGobackUp.css("margin-right", "-60px");
    }
  });

  //"Go up" soft scroll effect
  $("a.goback-up").on("click", function (e) {
    e.preventDefault();

    if ($(window).scrollTop() != 0) {
      $("html, body").stop().animate({ scrollTop: 0 }, 1000);
    }
  });

  //Scroll soft effect
  $("a.scroll-soft").on("click", function (e) {
    e.preventDefault();

    let sectionOffset = $($(this).attr("href")).offset().top;

    $("html, body").stop().animate({ scrollTop: sectionOffset }, 1000);
  });

  //"Go up" soft scroll effect
  $("a.scroll-about").on("click", function (e) {
    e.preventDefault();

    let sectionOffset = $($(this).attr("href")).offset().top - 95;

    $("html, body").stop().animate({ scrollTop: sectionOffset }, 1000);
  });

  //Portfolio
  $(".img-project").on("click", function () {
    let videoPath = $(this).attr("src");
    let videoSrc = videoPath.slice(0, -3) + "mov";

    console.log(videoSrc);
    let modal =
      '<div class="modal" id="modal"><video autoplay> <source src="' +
      videoSrc +
      '" type="video/mp4"></video><div class="btn-close" id="btnClose"><i class="fa fa-times" aria-hidden="true"></i></div></div>';

    $("#portfolio").after(modal);
    $("#btnClose").on("click", function () {
      $("#modal").remove();
    });
  });

  $(document).on("keyup", function (e) {
    if (e.which === 27) {
      $("#modal").remove();
    }
  });
});
