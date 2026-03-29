import express from 'express';
import users from '../Model/Users.js';
import passport from 'passport';
import { generateSummary } from '../Utils/Groq.js';
import { generateQuestions } from '../Utils/GroqQuestions.js';
const router = express.Router();

const isAuth = (req, res, next) =>
{
   if(req.isAuthenticated())
    return next();
   res.status(401).json({error: "Unauthorized!"});
}

router.post('/login', passport.authenticate('local'), (req,res) =>
{
    try {
        res.json({message: "Logged in successfully!"});
    } catch (error) {
        res.status(401).json({error: "Invalid Email or Password"});
    }  
});

router.get('/logout', (req,res) =>
{
    req.logout(() =>
    {
        res.json({message: "Logged Out!"});
    })
})


router.get('/home', isAuth, (req,res) =>
{
    res.send("Welcome to SmartNotes AI API");
});


router.post('/summarize', isAuth, async (req, res) => {
  try {

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const questions = await generateQuestions(text);
    const summary = await generateSummary(text);

    res.json({ summary, questions });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/signup', async(req,res) =>
{
    const {name, email, password} = req.body;
    
    const exists = await users.findOne({email})
    if(exists)
        return res.status(400).json({error: "User already exists!"});

    const user = new users({name, email, password});
    await user.save();
    res.json({message: "Registered Successfully!"});
});



export default router;