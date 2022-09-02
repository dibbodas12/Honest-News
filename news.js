const loadNewsCategory = () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsCatogory(data.data.news_category));
};
const displayNewsCatogory = (newsCategory) => {
  console.log(newsCategory);
  const newsCategoryContainer = document.getElementById(
    "news-category-container"
  );
  newsCategory.forEach((news) => {
    // console.log(news);
    const newsDiv = document.createElement("div");
    newsDiv.class;
    newsDiv.innerHTML = `
    <ul class="nav justify-content-center fs-5">
       <li class="nav-item">
          <a  class="nav-link" href="#">${news.category_name} 
          </a>
       </li>
    </ul>
    
        `;
    newsCategoryContainer.appendChild(newsDiv);
  });
};
loadNewsCategory();
