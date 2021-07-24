const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-nav');
const closeBtn = document.getElementById('close-btn');


const displayCity = document.getElementById("city");
const displayCountry = document.getElementById('country');
const icon = document.querySelector('.forecast-icon');
const temperature = document.getElementById('temp');
const weatherText = document.getElementById('weather-text');
const date = document.getElementById('date');
const unit = document.getElementById('unit')

const updateUI = (data)=> {
    const cityDets = data.cityDets;
    const weather = data.weather;

    // update details console
    displayCity.innerHTML = cityDets.AdministrativeArea.EnglishName;
    date.innerHTML = weather.LocalObservationDateTime
    displayCountry.innerHTML = cityDets.Country.EnglishName;
    temperature.innerHTML = weather.Temperature.Metric.Value;
    temperature.innerHTML = weather.Temperature.Metric.Unit;
    weatherText.innerHTML = weather.WeatherText;
    icon.innerHTML = weather.WeatherIcon;
    
}

menuBtn.addEventListener('click', () => {
    sideMenu.classList.add('slide');
})

closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('slide');
})


const cityForm = document.getElementById('form')

const updateCity = async (city)=> {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return{
        cityDets: cityDets,
        weather: weather
    };
}

cityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get city value
    const city = cityForm.input.value.trim();
    cityForm.reset(); 

    //update city
    updateCity(city)
    .then(data =>  updateUI(data))
    .catch(err => console.log(err));

})