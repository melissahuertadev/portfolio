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
      let projectCategories = "";

      for (let i = 0; i < project.category.length; i++) {
        projectCategories += `<span class="badge ${project.category[i].categoryClass}">${project.category[i].categoryName}</span> `;
      }

      projectGallery.append(
        `<div class="col-xlg-4 col-lg-5 col-md-6 project">
          <div class="card mb-4 box-shadow">
            <img class="card-img-top img-project" id="${project.id}" alt="${project.projectName}" style="width: 100%; display: block;" src="${project.imgSrc}" data-holder-rendered="true">
            <div class="card-body">
              <p class="card-text"> ${project.shortDescription}</p>
              <a class="card-text" href="">View project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
             
            </div>
          </div>
        </div>`
      );

      //Add modal to each project
      $(`#${project.id}`).on("click", function () {
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
