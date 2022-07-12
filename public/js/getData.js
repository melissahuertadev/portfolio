$(function () {
  $.ajax({
    type: "GET",
    url: "../data/data.json",
    dataType: "json",
  }).done((data) => {
    $.each(data, function (index, item) {
      switch (index) {
        case "workflow":
          populateWorkflow(item);
          break;
        case "projects":
          populateProjects(item);
          break;
        case "socials":
          populateSocials(item);
          break;
        default:
          break;
      }
    });
  });

  //Get workflow steps info for Workflow section
  function populateWorkflow(workflowSteps) {
    let workflowSection = $("#workflow-steps");

    $.each(workflowSteps, function (index, step) {
      workflowSection.append(
        `<div class="stage-box col-lg-4">
          <img src="${step.imgSrc}" width="60px">
          <h3 class="stage-title">${step.stepName}</h3>
          <p>${step.stepDescription}</p>
        </div>
     `
      );
    });
  }

  //Getting projects info for Portfolio section
  function populateProjects(projArr) {
    let projectGallery = $("#project-gallery");

    $.each(projArr, function (index, project) {
      projectGallery.append(
        `<div class="isotope-item col-md-6 mb-5">
          <div class="card project-card">
            <div class="row">
              <div class="col-12 col-xl-5 card-img-holder">
                <img src="${project.imgSrc}" alt="${project.name}" class="card-img" alt="image">
              </div>
              <div class="col-12 col-xl-7">
                <div class="card-body">
                    <h5 class="card-title"><a href="/p/${index}" class="theme-link project-link">${project.name}</a></h5>
                    <p class="card-text">${project.shortDescription}</p>
                    <a class="card-text project-link" href="/p/${index}">View project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>
              </div>
            </div>
            <div class="link-mask">
                <a class="link-mask-link" href="/p/${index}"></a>
                <div class="link-mask-text">
                  <a class="btn btn-secondary" href="/p/${index}">
                    <svg class="svg-inline--fa fa-eye me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"></path></svg>
                    <i class="fas fa-eye me-2"></i> 
                  </a>
                </div>
            </div>
          </div>
        </div>`
      );

      //Add modal to each project
      $(`#${index}`).on("click", function () {
        let modal = "";

        if (project.modalType === "img") {
          modal =
            '<div class="modal" id="modal"> <img src="' +
            project.modalPath +
            '"><div class="btn-close" id="btnClose"><i class="fa fa-times" aria-hidden="true"></i></div></div>';
        } else if (project.modalType === "mov") {
          modal =
            '<div class="modal" id="modal"><video autoplay> <source src="' +
            project.modalPath +
            '" type="video/mp4"></video><div class="btn-close" id="btnClose"><i class="fa fa-times" aria-hidden="true"></i></div></div>';
        }

        $("#portfolio").after(modal);
        $("#btnClose").on("click", function () {
          $("#modal").remove();
        });
      });
    });
  }

  //Populate socials links
  function populateSocials(socArr) {
    let socialsSection = $(".socials-links");

    $.each(socArr, function (index, social) {
      socialsSection.append(
        `<a target=”_blank” href="${social.url}">
          ${social.iconTag}
        </a>`
      );
    });
  }

  //Getting medium articles for Blog section
  let mediumPromise = new Promise(function (resolve) {
    let $content = $("#mediumPosts");
    let data = {
      rss: "https://medium.com/feed/@melissahuertadev",
    };
    const rssJson =
      "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40melissahuertadev";

    $.get(rssJson, data, function (res) {
      if (res.status == "ok") {
        let postCard = "";
        $.each(res.items, function (k, item) {
          let src = item["thumbnail"];

          postCard += `<div class="postcard card mb-3 mx-auto mr-5" style="width: 20rem;">`;
          postCard += `<img src="${src}" class="card-img-top" alt="Cover image">`;
          postCard += `<div class="card-body">`;
          postCard += `<h5><a href="${item.link}" target="_blank" class="post-title">${item.title}</a></h5>`;
          var postText = item.description.replace(/<img[^>]*>/g, "");
          postText = postText.replace("h4", "p");
          postText = postText.replace("h3", "p");
          postText = postText.replace("<em>", "");
          var maxLength = 100;
          var trimmedString = postText.substr(0, maxLength);
          trimmedString = trimmedString.substr(
            0,
            Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
          );
          postCard += `<p class="card-text">${trimmedString}...</p>`;

          postCard += `<a href="${item.link}" target="_blank" class="btn btn-white" >Read More</a>`;
          postCard += "</div></div>";
          return k < 10;
        });

        resolve($content.html(postCard));
      }
    });
  });

  mediumPromise.then(function () {
    pageSize = 3;

    let pageCount = $(".postcard").length / pageSize;

    for (let i = 0; i < pageCount; i++) {
      $("#pagin").append(
        `<li class="page-item"><a class="page-link" href="#">${i + 1}</a></li> `
      );
    }

    $("#pagin li:nth-child(1)").addClass("active");
    showPage = function (page) {
      $(".postcard").hide();
      $(".postcard").each(function (n) {
        if (n >= pageSize * (page - 1) && n < pageSize * page) {
          $(this).show();
        }
      });
    };

    showPage(1);

    $("#pagin li").click(function () {
      $("#pagin li").removeClass("active");
      $(this).addClass("active");

      showPage(parseInt($(this).text()));
      return false;
    });
  });
});
