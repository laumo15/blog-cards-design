function getArticles() {
    const url = `https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json`;
    axios.get(url).then(displayArticles);
}

function displayArticles(response) {
    let articles = response.data;
    let articlesElement = document.querySelector("#articles");
    let articlesHTML = `<div class="row">`;
    articles.forEach(function (article, index) {
      if (index < 3) {
        let categoryId = article.categories[0]; 
        let categoryName = "";
        let categoryLink = "";
        for (let i = 0; i < article._embedded["wp:term"].length; i++) {
          let elements = article._embedded["wp:term"][i];
          for (let j = 0; j < elements.length; j++) {
            if (elements[j].id == categoryId) {
              categoryName = elements[j]["name"];
              categoryLink = elements[j]["link"];
            }
          }
        }
        let groupName = "&nbsp";
        let groupLink = "";
        if (article.group) {
          let group_id = article.group[0];
          for (let i = 0; i < article._embedded["wp:term"].length; i++) {
            let elements = article._embedded["wp:term"][i];
            for (let j = 0; j < elements.length; j++) {
              if (elements[j].id == group_id) {
                groupName = elements[j]["name"].toUpperCase();
                groupLink = elements[j]["link"];
              }
            }
          }
        }
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ]
        let articleDate = new Date(article.date);
        let date = articleDate.getDate();
        let month = months[articleDate.getMonth()]
        let year = articleDate.getFullYear()
        
        articlesHTML =
          articlesHTML +
          `<div class="col-4 p-card top-cards">
            <div class="">
              <a href="${groupLink}">${groupName}</a>
              <hr class="u-sv1">
              <div class="p-card__content">
                <img class="p-card__image" alt="" height="185" width="330" src="${article.featured_media}">
                <h4>
                    <a href="${article.link}">${article.title.rendered}</a>
                </h4>
                <hr class="u-no-margin--bottom">
                <div class="p-card__inner">
                  By <a href="${article._embedded.author[0].link}" target="_blank">${article._embedded.author[0].name}</a> on ${date} ${month} ${year}
                </div>
                <hr class="u-no-margin--bottom">
                <div class="p-card__inner">
                  <a href="${categoryLink}">${categoryName}</a>
                </div>
              </div>
            </div>
        </div>
        `
        }
  })
    articlesHTML = articlesHTML + `</div>`;
    articlesElement.innerHTML = articlesHTML;
}

getArticles();