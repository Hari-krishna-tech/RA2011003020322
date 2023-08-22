import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  Typography, TableContainer, Table, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import { getTrains } from "../api/api.js";

const ShowTrain = () => {
    const { id } = useParams();
    const [train, setTrain] = useState({});
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    }

    useEffect(() => {
        const fetchTrain = async () => {
            const data = await getTrains();
            console.log(data)
            if(!data) {
                setTrain({})
            } else {
                const train = data.find((train) => train.trainNumber === id);
                setTrain(train)
            }
            console.log(train)
        }
        fetchTrain();
    }, []);
    return (
        <div>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Train Details
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Train Name:</TableCell>
                <TableCell>{train.trainName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Train Number:</TableCell>
                <TableCell>{train.trainNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Train Price</TableCell>
                <TableCell>{`AC: ${train.price?.AC}rs || Sleeper: ${train.price?.sleeper}rs`}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Train Seats Available</TableCell>
                <TableCell>{`AC: ${train.seatsAvailable?.AC} || Sleeper: ${train.seatsAvailable?.sleeper}`}</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell>Departure Time</TableCell>
                <TableCell>{`${train.departureTime?.Hours}:${train.departureTime?.Minutes}:${train.departureTime?.Seconds}`}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Delayed By</TableCell>
                <TableCell>{`${train.delayedBy}mins`}</TableCell>
              </TableRow>
            
            </TableBody>
          </Table>
        </TableContainer>

        <Button onClick={handleBack}>Back</Button>
      </div>
    )
}

export default ShowTrain;