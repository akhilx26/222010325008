import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}))

const apiUrl = 'http://20.244.56.144/train/auth';
const dataToSend = {
    "companyName": "Central Rail",
    "clientID": "88016b35-eb13-46c6-b9ee-be535193a905",
    "clientSecret": "YuRKWsmZnOYgSLPS",
    "ownerName": "Akhil",
    "ownerEmail": "athomas1@gitam.in",
    "rollNo": "12"
};

let bearerToken = "";

try {
    const response = await axios.post(apiUrl, dataToSend);
    bearerToken = response.data["access_token"];
} catch (error) {
    console.error('Error making POST request:', error);
}
// const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTE1NTkxMjYsImNvbXBhbnlOYW1lIjoiQ2VudHJhbCBSYWlsIiwiY2xpZW50SUQiOiI4ODAxNmIzNS1lYjEzLTQ2YzYtYjllZS1iZTUzNTE5M2E5MDUiLCJvd25lck5hbWUiOiIiLCJvd25lckVtYWlsIjoiIiwicm9sbE5vIjoiMTIifQ.o7puT3AUGr8K_h3Dd2lG_z7xIBuGbbUkyxSRkc3KU2Q"

const time = new Date();
const next12Hours = new Date(time.getTime() + 12 * 60 * 60 * 1000);
// next12Hours.setHours(time.getHours() + 12);

app.get("/",async(req,res) => {
    try{
        const headers = {
            Authorization: `Bearer ${bearerToken}`,
        };
        const response = await axios.get("http://20.244.56.144/train/trains",{headers});
    
        const trains = response.data;

        const upcomingTrains = trains.filter(train => {
            const departureTime = new Date(
              time.getFullYear(),
              time.getMonth(),
              time.getDate(),
              train.departureTime.Hours,
              train.departureTime.Minutes,
              train.departureTime.Seconds
            );
          
            return departureTime <= next12Hours;
        });

        const trainsByAscendingPrice = [...trains].sort((a, b) => a.price.sleeper - b.price.sleeper);
        res.json(trainsByAscendingPrice);
    } catch(err){
        console.error("Error in making API Request: ",err);
    }
});

app.get("/",function(req,res){
    postData();
});

app.listen(port,() => {
    console.log("Listening to server"+port);
});