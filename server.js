'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const superagent = require('superagent');

// let locationObject;
const port = process.env.PORT || 3000;
app.use(cors());


function Location (query, res){
  this.search_query = query;
  this.formatted_query = res.results[0].formatted_address;
  this.latitude = res.results[0].geometry.location.lat;
  this.longitude = res.results[0].geometry.location.lng;
}
function Weather (weatherRes, time){
  this.forecast = weatherRes;
  this.time = new Date(time * 1000).toDateString();
} 

function Event(eventRes) {
  this.link = eventRes.url;
  this.name = eventRes.name.text;
  this.event_date = eventRes.start.local;
  this.summary = eventRes.summary;
}

app.get('/location', (request, response) => {
  try{
    const queryData = request.query.data;
    let dataFile = `https://maps.googleapis.com/maps/api/geocode/json?address=${queryData}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    superagent.get(dataFile)
      .end( (err,googleMapsApiResponse) =>{
        const locationObject = new Location(queryData, googleMapsApiResponse.body);
        response.status(200).send(locationObject);
      });
  } catch(error){
    console.log(error);
    response.status(500).send('There is an error on our end sorry');
  }

});

app.get('/weather', (request, response) => {
  try {
    const queryData = request.query.data;
    let dataFile = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${queryData.latitude},${queryData.longitude}`;
    superagent.get(dataFile)
      .end((err, weatherApiResponse) => {
        let weatherForecastMap = weatherApiResponse.body.daily.data.map(element=>{
          return new Weather(element.summary,element.time);
        });
        response.status(200).send(weatherForecastMap);
      });
  } catch(error){
    console.log(error);
    response.status(500).send('There is an error on our end sorry');
  }
});

app.get('/events', (request, response) => {
  try {
    const queryData = request.query.data;
    let dataFile = `https://www.eventbriteapi.com/v3/events/search?location.longitude=${queryData.longitude}&location.latitude=${queryData.latitude}`;
    console.log(dataFile);
    superagent.get(dataFile)
      .set({Authorization: `Bearer ${process.env.EVENTBRITE_KEY}`})
      .end((err, eventBriteApiResponse) => {
        console.log(eventBriteApiResponse.body.events);
        let eventMap = eventBriteApiResponse.body.events.map(element =>
          new Event(element));
        console.log(eventMap);
        response.status(200).send(eventMap);


      });

  } catch(error){
    console.log(error);
    response.status(500).send('There is an error on our end sorry');
  }
});
app.use('*', (request, response) => response.send('Sorry, that route does not exist.'));

app.listen(port,() => console.log(`Listening on port ${port}`));