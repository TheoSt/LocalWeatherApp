var dateHeader = document.getElementById("date");
var weatherText = document.getElementById("weather");
var tempText = document.getElementById("temp");
var humidText = document.getElementById("humidity");
var windText = document.getElementById("wind");

var fahrSpan = document.getElementById("fahr");
var celsiusSpan = document.getElementById("celsius");
var tempSymbol = document.getElementById("tempSymbol");

var celsiusBool = true; //to not click a celsius to celsius conversion for example
var fahrBool = false;

var imgs = {
  rain: "https://www.itl.cat/pngfile/big/15-151310_glass-drop-rain-moisture-wallpaper-background-4k-rain.jpg",
  clouds:   "https://i.ytimg.com/vi/rRL_9WxBJBc/maxresdefault.jpg",
  clouds_night:"https://images.wallpaperscraft.com/image/moon_full_moon_clouds_135837_2560x1080.jpg",
  broken_clouds :"https://res.cloudinary.com/detqxj5bf/image/upload/v1504015796/WWWeather/scattered-clouds.png",
  broken_clouds_night:"https://i.pinimg.com/originals/a0/69/cd/a069cd43d3ff6ca8481a345c2a446bfe.jpg",
  clear_sky: "https://i.pinimg.com/originals/35/92/5d/35925d88bed4126096ea6fc1cd48c840.jpg",
  clear_sky_night:"https://wallpaperaccess.com/full/941791.jpg",
  thunderstorm:"https://i.pinimg.com/originals/48/5f/77/485f778f1d4c83f7b2a9a74582c58b10.jpg",
  snow:"https://wallpaperaccess.com/full/559819.jpg",
  snow_morning:"https://nuwallpaperhd.info/wp-content/uploads/2018/01/Winter-morning-background-wallpaper.jpg"
}
var date = new Date();

fetch('https://api.openweathermap.org/data/2.5/weather?q=athens&units=metric&appid=28ba3c4fd515a70413e08a16f1aaec57')
  .then(response => {
    return response.json()
  })
  .then(data=> {
    var data_id = data.weather[0].id;
    setData(data);
    chooseBackgroundImage(data_id);

    fahrSpan.addEventListener("click", function() {
      if(!fahrBool) {
        tempText.innerHTML = ((data.main.temp*(9/5))+32).toFixed(1);
        tempSymbol.innerHTML = "°F";
        fahrBool = true;
        celsiusBool = false;
      }

    });

    celsiusSpan.addEventListener("click", function() {
      if(!celsiusBool) {
        var temp = tempText.innerHTML;
        tempText.innerHTML = (temp-32)*(5/9).toFixed(1);
        tempSymbol.innerHTML = "°C";
        celsiusBool = true;
        fahrBool = false;
      }
    });
  })
  .catch(err => {
    //
  })

dateHeader.innerHTML = chooseDate(date);


function chooseBackgroundImage(data_id) {
  if(data_id>=200 && data_id<=232) {
    document.body.style.backgroundImage = "url("+imgs.thunderstorm+")";
  }
  else if((data_id>=300 && data_id<=321) || (data_id>=500 && data_id<=521))  {
    document.body.style.backgroundImage = "url("+imgs.rain+")";
  }
  else if(data_id>=600 && data_id<=622) {
    if(date.getHours()>=8 && date.getHours()<=19) { //mornings
      document.body.style.backgroundImage = "url("+imgs.snow_morning+")";
    }
    else { //night
      document.body.style.backgroundImage = "url("+imgs.snow_night+")";
    }
  }
  else if(data_id===800) {
    if(date.getHours()>=8 && date.getHours()<=19) { //mornings
      document.body.style.backgroundImage = "url("+imgs.clear_sky+")";
    }
    else { //night
      document.body.style.backgroundImage = "url("+imgs.clear_sky_night+")";
    }
  }
  else if(data_id>=801 && data_id<=803) {
    if(date.getHours()>=8 && date.getHours()<=19) { //mornings
      document.body.style.backgroundImage = "url("+imgs.broken_clouds+")";
    }
    else { //night
      document.body.style.backgroundImage = "url("+imgs.broken_clouds_night+")";
    }
  }
  else if(data_id===804) {
    if(date.getHours()>=8 && date.getHours()<=19) { //mornings
      document.body.style.backgroundImage = "url("+imgs.clouds+")";
    }
    else { //night
      document.body.style.backgroundImage = "url("+imgs.clouds_night+")";
    }
  }
  else {
    document.body.style.background = "#3c403e";
  }
}

function setData(data) {
  weatherText.innerHTML = data.weather[0].main+" - "+data.weather[0].description;
  tempText.innerHTML = data.main.temp.toFixed(1);
  tempSymbol.innerHTML = "°C";
  humidText.innerHTML = data.main.humidity+"%";
  windText.innerHTML = (Math.round(data.wind.speed*3.76))+" km/h";
}

function chooseDate(date) {
  var day = "";
  switch(date.getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1 :
      day = "Monday";
      break;
    case 2 :
      day = "Tuesday";
      break;
    case 3 :
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
  }

  if(date.getHours()>=0 && date.getHours()<=9) {
    if(date.getMinutes()>=0 && date.getMinutes()<=9) {
      day += " 0"+date.getHours()+":0"+date.getMinutes();
    }
    day += " 0"+date.getHours()+":"+date.getMinutes();
  }
  else {
    day += " "+date.getHours()+":"+date.getMinutes();
  }
  return day;
}
