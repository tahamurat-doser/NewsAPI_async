const getNews = async () => {
  //!önce async yapısı için fonksiyon oluşturdum ve arrow fonk önüne async yazdım.

  /*   https://newsapi.org/v2/top-headlines?country=tr&apiKey=7e7b9502c269442392fe60381fb81bad */
  const BASE_URL = `https://newsapi.org/v2/`; //& kullanacağım url i parçalayıp değişkenlere atıyorum bu bana değişikliklerde kolaylık sağlaycak
  const API_KEY = `7e7b9502c269442392fe60381fb81bad`;
  const queryString = `top-headlines?country=us`;
  const URL = `${BASE_URL}${queryString}&apiKey=${API_KEY}`; //!yukarıda değişkenlerle ayırdığımız url burada birleştiriyoruz.
  /*  console.log(URL); */

  try {
    const res = await fetch(URL); //! fetch yapısının önüne await koyarak istek atıyorum.
    if (!res.ok) {
      throw new Error(`${res.status}`); //? fetch deki hata fırlatmayı buradada kullanarak bu hatalarıda catch ile yakalmış oldum. Error handling deniyor buna
    }
    const data = await res.json(); //& istek attığımızda gelen veriyi json formatına getiriyorum
    /*  console.log(data.articles);  */ //! haberlere ulaşacağım kısmı clg ye yazdırdım bundan sonra try catch yapısı kurarak hata yakalamam gerekiyor.
    displayNews(data.articles); //? veriyi basmak için bu fonsiyonu kullanıyorum. aşağıda da bu fonksiyonu yazacağım.
  } catch (error) {
    console.log(error); 
    const newsArticle = document.getElementById("news");
    newsArticle.innerHTML += ``
    //& try catch hataları yakalmada yetersiz kalıyor çünkü fetch in optimislik yapısından dolayı base_url de delki adres hatasını yakalıyor ama apikey deki hatayı yakalamıyor undefined dönüyor.
  }
};

const displayNews = (news) => {
  const newsArticle = document.getElementById("news");
 /*  news.forEach((item) => {
    console.log(item);

    newsArticle.innerHTML += `<div class="card" style="width: 18rem;">
    <img src="${item.urlToImage}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">${item.content}</p>
      <a href="${item.url}" target="blank" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`
  }); */
  news.forEach(item => {
    const {urlToImage, url, title, content} = item //! yukarıda yaptığım aynı işlemi destraction yöntemi ile açtım ve her seferinde item yazmaktan kurtuldum ve havada destraction yapada bilir dim => news.forEach({urlToImage, url, title, content})=> {

    newsArticle.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3" >
      <div class="card" >
        <img src="${urlToImage}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${content}</p>
        <a href="${url}" target="blank" class="btn btn-primary">Go somewhere</a>
       </div>
      </div>
    </div> ` 

  });
};

getNews();
