const loadNewsCategory = () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsCatogory(data.data.news_category));
};
const displayNewsCatogory = (newsCategory) => {
  //   console.log(newsCategory);
  const newsCategoryContainer = document.getElementById(
    "news-category-container"
  );
  newsCategory.forEach((news) => {
    // console.log(news);
    const newsDiv = document.createElement("div");

    newsDiv.innerHTML = `
    <ul class="nav justify-content-center fs-5">
       <li class="nav-item">
          <a onclick = 'loadNewsInCategory("${news.category_id}", "${news.category_name}")' class="nav-link" href="#">${news.category_name} 
          </a>
       </li>
    </ul>
    
        `;
    newsCategoryContainer.appendChild(newsDiv);
  });
};

const loadNewsInCategory = (category_id, category_name) => {
  //   console.log(category_id);
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsInCategory(data.data, category_name));
};

const displayNewsInCategory = (newsInCategory, category_name) => {
  console.log(newsInCategory.length);

  const totalNews = document.getElementById("total-news");

  if (newsInCategory.length === 0) {
    totalNews.innerText = `No news found ${category_name}.Plesase search another one `;
  } else {
    totalNews.innerText = `${newsInCategory.length} items Found for ${category_name} `;
  }

  const newsCategoryInContainer = document.getElementById(
    "newsCategoryIn-container"
  );

  newsCategoryInContainer.innerHTML = "";
  newsInCategory.forEach((news) => {
    console.log(news);
    const newsInDiv = document.createElement("div");
    newsInDiv.classList.add("row");
    newsInDiv.innerHTML = `
    <div class="col-md-4">
        <img src="${
          news.thumbnail_url
        }" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
            <h5 class="card-title">${news.title}</h5>
            <p class="card-text">${news.details.slice(0, 400)}</p>
            <div class = 'd-flex justify-content-between align-items-center'>

            <div>
            <img class = 'rounded-pill' style = "width: 5rem" src = '${
              news.author.img
            }'>
              <span class="card-title fw-semibold">${news.author.name}</span>
            </div>
            <div>
                <i class="fa-regular fa-eye"></i>
               <span> ${
                 news.total_view ? news.total_view : "no views found"
               }</span>
            </div>
               <div>
                  <button onclick = 'loadNewsDetails("${
                    news._id
                  }")'  class ='btn btn-primary me-4' data-bs-toggle="modal" data-bs-target="#newsModal">Details</button>
                 
               </div>
           </div>
        
    </div>`;
    newsCategoryInContainer.appendChild(newsInDiv);
  });
};

// const toogleSpinner = (isLoading) => {
//   const loader = document.getElementById("spinner");
//   if (isLoading) {
//     loader.classList.remove("d-none");
//   } else {
//     loader.classList.add("d-none");
//   }
// };

// loadNews Details

const loadNewsDetails = (news_id) => {
  //   console.log(news_id);
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`

    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data[0]));
  fetch(url);
};

const displayNewsDetails = (newsDetail) => {
  console.log(newsDetail);
  const modalTitle = document.getElementById("newsModalLabel");
  modalTitle.innerText = newsDetail.author.name
    ? newsDetail.author.name
    : "No data found";
  const newsDetailPart = document.getElementById("news-details");
  newsDetailPart.innerHTML = `
  <p>Published Date :${
    newsDetail.author.published_date
      ? newsDetail.author.published_date
      : "No data found"
  }</p>
  <img style = 'width :20rem' src ='${newsDetail.author.img}'>
  <p class = 'py-4'>total Views :${
    newsDetail.total_view ? newsDetail.total_view : "No views Found"
  }</p>`;
};

loadNewsCategory();
