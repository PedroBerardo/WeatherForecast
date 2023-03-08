document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');
    const error404 = document.querySelector('.not-found');
    const search = document.querySelector('.search-box .fa-solid.fa-magnifying-glass');
    
    search.addEventListener('click', () => {
      const APIKey = '421b4c5aa53972c1ac204f86065487a5'
      const city = document.querySelector('.search-box input').value;
  
      if (city === '') {
        return;
      }
  
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
        .then(Response => Response.json())
        .then(json => {
          if (json.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
          }
  
          error404.style.display = 'none';
          error404.classList.remove('fadeIn');
  
          const image = document.querySelector('.weather-box img')
          const temperature = document.querySelector('.weather-box .temperature');
          const description = document.querySelector('.weather-box .description');
          const humidity = document.querySelector('.weather-details .humidity span')
          const wind = document.querySelector('.weather-details .wind span')
  
          if (json.weather && json.weather.length > 0) {
            switch (json.weather[0].main) {
              case 'Clear':
                image.src = 'images/Clear.png';
                break;
              case 'Rain':
                image.src = 'images/Rain.png';
                break;
              case 'Snow':
                image.src = 'images/Snow.png';
                break;
              case 'Clouds':
                image.src = 'images/Clouds.png';
                break;
              case 'Haze':
                image.src = 'images/Haze.png';
                break;
              default:
                image.src = ''; 
            }
          }
  
          temperature.innerHTML = `${parseInt(json.main.temp - 273.15)}<span>°C</span>`;
          description.innerHTML = `${json.weather[0].description}`;
          humidity.innerHTML = `${json.main
.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn')
            container.style.height = '590px';

});
});
});