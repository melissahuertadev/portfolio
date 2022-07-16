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
