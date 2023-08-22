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

});



app.listen(process.env.PORT|| 3000, () => {
    console.log(`Server is running on port ${process.env.PORT||3000}`);
});
