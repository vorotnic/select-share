import axios from 'axios'

const form = document.querySelector("form")!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'AIzaSyCxAXd7cCeVvJdR6fPujUdJ2X0SOt5gzFY';

// declare var google: any;
type GoogleGeocodingResponse = {
    results: {geometry: {location: {lat: number, lng: number}}}[]
    status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    axios
    .get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI
    (enteredAddress)}&key=${GOOGLE_API_KEY}`)
    .then(response => {
        if(response.data.status !=='OK'){
            throw new Error('Could not find location!');
        }
        const coordinates = response.data.results[0].geometry.location;

        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: coordinates,
            zoom: 8,
          });

        new google.maps.Marker({
            map: map,
            position: coordinates,
          });

        console.log(response)
    })
    .catch(err => {
        alert(err.message)
        console.log(err);})
// send this to G API
}

form.addEventListener('submit',searchAddressHandler);