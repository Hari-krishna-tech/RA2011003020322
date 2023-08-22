import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

import authMiddleware from './authMiddleware.js';

// create app
const app = express();
const API_URL = "http://20.244.56.144/train/trains"

app.use(express.json());


app.get('/train',authMiddleware ,async (req, res) => {
    console.log(req.token)
    const {data} = await axios.get(API_URL, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${req.token}`
        } 
    });


const currentTime = new Date();

// filter trains that are have departure time less than 30 minutes from now
const filteredTrains = data.filter(train => {
  const departureDateTime = new Date();
  departureDateTime.setHours(train.departureTime.Hours);
  departureDateTime.setMinutes(train.departureTime.Minutes);
  departureDateTime.setSeconds(train.departureTime.Seconds);
  departureDateTime.setMinutes(departureDateTime.getMinutes() + train.delayedBy);

  const timeDifference = departureDateTime - currentTime;
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  
  return minutesDifference > 30;
});

// sort trains by price, availability and departure time (in that order)
const sortedTrains = filteredTrains.sort((a, b) => {
  const aTotalPrice = a.price.sleeper + a.price.AC;
  const bTotalPrice = b.price.sleeper + b.price.AC;
  const aTotalAvailability = a.seatsAvailable.sleeper + a.seatsAvailable.AC;
  const bTotalAvailability = b.seatsAvailable.sleeper + b.seatsAvailable.AC;
  
  if (aTotalPrice !== bTotalPrice) {
    return aTotalPrice - bTotalPrice;
  } else if (aTotalAvailability !== bTotalAvailability) {
    return bTotalAvailability - aTotalAvailability;
  } else {
    const aDepartureTime = new Date();
    aDepartureTime.setHours(a.departureTime.Hours);
    aDepartureTime.setMinutes(a.departureTime.Minutes);
    aDepartureTime.setSeconds(a.departureTime.Seconds);
    aDepartureTime.setMinutes(aDepartureTime.getMinutes() + a.delayedBy);

    const bDepartureTime = new Date();
    bDepartureTime.setHours(b.departureTime.Hours);
    bDepartureTime.setMinutes(b.departureTime.Minutes);
    bDepartureTime.setSeconds(b.departureTime.Seconds);
    bDepartureTime.setMinutes(bDepartureTime.getMinutes() + b.delayedBy);

    return bDepartureTime - aDepartureTime;
  }
});

    // console.log(sortedTrains);
    res.send(sortedTrains);

});



app.listen(process.env.PORT|| 3000, () => {
    console.log(`Server is running on port ${process.env.PORT||3000}`);
});


