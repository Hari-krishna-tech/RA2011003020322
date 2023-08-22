import axios from "axios"


const API_URL = "http://20.244.56.144/train/auth"
const authMiddleware =async (req, res, next) => {
    try {
    const {data} = await axios.post(API_URL, {
        "companyName": "Train Central",
        "clientID": process.env.CLIENT_ID,
        "clientSecret": process.env.CLIENT_SECRET,
        "ownerName": "Hari",
        "ownerEmail":"harikrishna03092@gmail.com",
        "rollNo": "RA2011003020322",
    });
    console.log(data)
    req.token = data.access_token;
    next();
} catch (error) {
    console.log(error);
    res.status(401).send("Unauthorized");
}
}

export default authMiddleware