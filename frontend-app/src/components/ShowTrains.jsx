import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "./ShowTrains.css";
import {getTrains} from '../api/api.js'; 

const ShowTrains = () => {
    const [trainData, setTrainData ]= useState([])
    useEffect(() => {
        const fetchTrains = async () => {
            const trains = await getTrains();
            if(!trains) {
                setTrainData([])
            } else {
                setTrainData(trains)
            }
           
        }
        fetchTrains();
    },[]);


    return (
        <Container maxWidth="md" className="app">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Train Information
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Train Name</TableCell>
              <TableCell>Train Number</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Seats Available (Sleeper)</TableCell>
              <TableCell>Seats Available (AC)</TableCell>
              <TableCell>Price (Sleeper)</TableCell>
              <TableCell>Price (AC)</TableCell>
              <TableCell>Delayed By (minutes)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainData.map((train) => (
              <TableRow key={train.trainNumber}>

                <TableCell><Link to={`/${train.trainNumber}`}>{train.trainName}</Link></TableCell>
                <TableCell>{train.trainNumber}</TableCell>
                <TableCell>{train.departureTime.Hours}:{train.departureTime.Minutes}</TableCell>
                <TableCell>{train.seatsAvailable.sleeper}</TableCell>
                <TableCell>{train.seatsAvailable.AC}</TableCell>
                <TableCell>{train.price.sleeper}</TableCell>
                <TableCell>{train.price.AC}</TableCell>
                <TableCell>{train.delayedBy}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    )
}

export default ShowTrains;