// Bu JavaScript kodu, hava durumu bilgilerine ulaşmak için kullanılan OpenWeatherMap API'sinin adresini belirleyen bir değişken ("url") tanımlar. "https://api.openweathermap.org/data/2.5/" adresi, API'nin temel adresidir ve hava durumu bilgilerinin bulunduğu verileri çekmek için kullanılır.
const url = "https://api.openweathermap.org/data/2.5/";
// Bu JavaScript kodu, OpenWeatherMap API'sini kullanmak için gerekli olan API anahtarını ("key") tanımlar. Bu anahtar, kullanıcının API'ye erişim izni sağlar ve hava durumu verilerinin çekilmesi için kullanılır. 
const key = "d2482f2659789a342ec57ee117787647";
// Bu JavaScript kodu, klavyeden bir tuşa basıldığında "setQuery" fonksiyonunu çağırır. Eğer kullanıcı "Enter" tuşuna basarsa, "getResult" fonksiyonunu "searchBar" değişkeninin değeriyle çağırır. Burada "13" kodu, Enter tuşunun klavyedeki keyCode değeridir.
const setQuery = (e) => {
  if (e.keyCode == "13") getResult(searchBar.value);
};
// Bu JavaScript kodu, "getResult" adlı bir fonksiyon oluşturur. Bu fonksiyon, bir parametre alır ("cityName" adlı bir dize) ve bu dizeyi kullanarak hava durumu verilerini çeker. "query" adlı bir değişkende, "fetch" yöntemi kullanılarak API'ye yapılan isteği belirtir ve "weather" adlı bir sonuç döndürür. Daha sonra "weather" nesnesini JSON formatına dönüştürür ve "displayResult" adlı bir fonksiyonu çağırır. Bu fonksiyon, sonuçları ekranda gösterir.
const getResult = (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
  fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
};
// Bu JavaScript kodu, API'den aldığımız hava durumu verilerini HTML'de görüntülemek için kullanılır.

// displayResult fonksiyonu, API'den alınan verileri kullanarak, HTML içindeki .city, .temp, .desc, .minmax sınıflarına sahip öğelerin içeriğini günceller. Bu işlev, getResult fonksiyonu tarafından çağrılır. getResult fonksiyonu, kullanıcının arama çubuğuna girilen şehir adına göre API sorgusunu oluşturur ve fetch işlevi kullanarak API'den veri alır. Sonuç, displayResult fonksiyonuna geçirilir ve HTML içeriği güncellenir.
const displayResult = (result) => {
  let city = document.querySelector(".city");
  city.innerHTML = `${result.name}, ${result.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(result.main.temp)} °C`;

  let desc = document.querySelector(".desc");
  desc.innerHTML = result.weather[0].description;

  let minmax = document.querySelector(".minmax");
  minmax.innerHTML = `${Math.round(result.main.temp_min)}°C / ${Math.round(
    result.main.temp_max
  )} °C`;
};

// Bu kod, arama çubuğuna bir tuş vurulduğunda (keypress) çalışacak olan setQuery() fonksiyonunu tetiklemek için bir olay dinleyicisi (event listener) ekler. setQuery() fonksiyonu, arama çubuğuna girilen şehir adını alacak ve getResult() fonksiyonuna geçirecek.
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery);
