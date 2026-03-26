import contacts from "../Model/Contact.js";
import express from 'express';

const contactRouter = express.Router();

contactRouter.post('/contact', async(req,res) =>
{
   try {
    
    const {firstName, lastName, email, message} = req.body;

    const inquery = new contacts({firstName, lastName, email, message});
    await inquery.save();
    res.json({message: "Message Received!"});
   } catch (error) {
    res.status(400).json({message: error.message});
   }
})

export default contactRouter;
