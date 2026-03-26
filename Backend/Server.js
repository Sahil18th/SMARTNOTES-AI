import express from 'express';
import router from './Routes/authRoutes.js';
import contactRouter from './Routes/contactRoutes.js';
import passport from 'passport';
import mongoose from 'mongoose';
import './Middleware/authPassport.js';
import session from 'express-session';
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();

// import summarizeRouter from './Routes/summarizeRoutes.js';
console.log("TEST - API KEY LOADED:", process.env.GOOGLE_API_KEY ? "YES" : "NO");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ["http://localhost:5173","https://smartnotes-frontend-d42o.onrender.com" ],                     
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(contactRouter);


console.log("API KEY:", process.env.GOOGLE_API_KEY);

await mongoose.connect(process.env.MONGO_DB_API);


app.listen(PORT, ()=>
{
    console.log(`Server is Up! and Running successfully at PORT:${PORT}`);
});