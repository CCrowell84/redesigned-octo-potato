const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = '';
    messageTwo.textContent = 'Loading weather data.'

    fetch("http://localhost:3000/weather?address="+encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error;
            messageTwo.textContent = '';
        } else {
            messageOne.textContent = 'Weather for ' + data.location;
            messageTwo.textContent = 'Current temp: ' + data.forecast.temp + '. Chance of rain: ' + data.forecast.precipProb+ '. Forecast: '+ data.forecast.summary;
        }
    })
})
})