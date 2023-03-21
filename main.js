const wrapper = document.querySelector('.wrapper');
inputPart = wrapper.querySelector('.input-part');
infoTxt = inputPart.querySelector('.info-txt');
inputField = inputPart.querySelector('input');
locationBtn = inputPart.querySelector('button');

wIcon = document.querySelector(".weather-part img");
arrowBack = document.querySelector("header i");


let apiKey = "f5877aa0629932caf48701900c338594";



inputField.addEventListener("keyup", e => {
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value)
    }
})

locationBtn.addEventListener('click', e =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else{
       console.log("Tarayıcınız geolocation'ı desteklemiyor..") 
    }
})


function onSuccess(position){
 var lat = "position.coord.lat";
 var lon = "position.coord.lon"
    api=(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
   fetchData()
  
}


function onError(error){
    infoTxt.innerText= error.message;
    infoTxt.classList.add('error')
    
}




function requestApi(city){
  api=(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

 fetchData()
}

function fetchData(){
 infoTxt.innerText = "Sonuçlar Getiriliyor...";
 infoTxt.classList.add("pending");
fetch(api).then (response => response.json()).then (info =>{


    
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} şehri bulunamadı...`
    } else{
        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");


      wrapper.querySelector(".temp .numb" ).innerText = Math.floor(`${info.main.temp}`);
      wrapper.querySelector(".weather").innerText=`${info.weather[0].description}`;
      wrapper.querySelector(".location").innerText=`${info.name} , ${info.sys.country}`;
      wrapper.querySelector(".temp .numb-2").innerText=Math.floor(`${info.main.feels_like}`);
      wrapper.querySelector(".columnhumidity span").innerText=`${info.main.humidity}`
     
      switch (info.weather[0].main) {
        case 'Clear':
            wIcon.src = 'icons/clear.svg';
            break;

        case 'Rain':
            wIcon.src = 'icons/rain.svg';
            break;

        case 'Snow':
            wIcon.src = 'icons/snow.svg';
            break;

        case 'Clouds':
            wIcon.src = 'icons/cloud.svg';
            break;

        case 'Haze':
            wIcon.src = 'icons/haze.svg';
            break;

        default:
            wIcon.src = '';
    }
 
console.log(info)

}} )
}

arrowBack.addEventListener ("click", ()=>{

    wrapper.classList.remove("active")
}
)
 
 