const weatherAddressForm = document.querySelector('form');
const address = document.getElementById('address-input');
const locationMessage = document.getElementById('location');
const descriptionMessage = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');

weatherAddressForm.addEventListener('submit',(e)=>{
    locationMessage.innerHTML = 'Loading...';
    descriptionMessage.innerHTML = '';
    weatherIcon.src = '';
    e.preventDefault();
    fetch(`http://localhost:3000/weather?address=${address.value}`)
    .then((response)=>{
        // get data from the response
        response.json().then((data)=>{
            if(data.error){
                locationMessage.innerHTML = data.error;
                return;
            }
            address.value = '';
            locationMessage.innerHTML = data.location;
            descriptionMessage.innerHTML = `${data.description}. It is currently ${data.current}\xB0 F out. It feels like ${data.feelslike}\xB0 F.`;
            weatherIcon.src = data.icon;
        });
    });
});