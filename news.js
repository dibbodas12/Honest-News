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
          <a onclick = 'loadNewsInCategory("${news.category_id}")' class="nav-link" href="#">${news.category_name} 
          </a>
       </li>
    </ul>
    
        `;
    newsCategoryContainer.appendChild(newsDiv);
  });
};
const loadNewsInCategory = (category_id) => {
  //   console.log(category_id);
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsInCategory(data.data));
};
const displayNewsInCategory = (newsInCategory) => {
  console.log(newsInCategory);

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
                  <button  class = 'btn btn-primary me-4'>Details</button>
               </div>
           </div>
        
    </div>`;
    newsCategoryInContainer.appendChild(newsInDiv);
  });
};
loadNewsCategory();
