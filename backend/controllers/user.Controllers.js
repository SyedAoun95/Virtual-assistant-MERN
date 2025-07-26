import { response } from "express";
import uploadOnCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import User from "../models/user.model.js";
import moment from "moment";
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user); // ✅ Return the user
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return res.status(500).json({ message: "Get current user error", error: error.message });
  }
}
//in this we are reciving the file and that user select or upload like the image and shows it
export const updateAssistant=async (req,res)=>{
  try {
    const {assistantName,imageUrl}=req.body
    let assistantImage;
    if(req.file){
      assistantImage=await uploadOnCloudinary(req.file.path)
    }else{
       assistantImage=imageUrl
    }
     const user=await User.findByIdAndUpdate(req.userId,{
     assistantName, assistantImage
     },{new:true}).select("-password")
     return res.status(200).json(user)

  } catch (error) {
    return res.status(400).json({message:"update assistant error"})
  }
}
//controllerr for gemin api setup 
export const askToAssistant=async (req,res)=>{
  try {
    const {command}=req.body
    const user=await User.findById(req.userId);
    const assistantName=user.assistantName
    const result=await geminiResponse(command,userName,assistantName)
    const jsonMatch=result.match(/{[\s\S]*}/)
    if(!jsonMatch){
      return res.status(400).json({response:"Sorry,I didn't understand your command please re-enter",})
    }
    const gemResult=JSON.parse(jsonMatch[0])
    const type=gemResult.type
   //for date time day month finding
    switch(type){
      case 'get-date' :
        return res.json({
          type,
          userInput:gemResult.userInput,
          response:`current date is ${moment().format("YYY-MM-DD")}`
           
        });
        case 'get-time':
           return res.json({
          type,
          userInput:gemResult.userInput,
          response:`current time is ${moment().format("hh:mm A")}`
           
        });
         case 'get-day':
           return res.json({
          type,
          userInput:gemResult.userInput,
          response:` today is ${moment().format("dddd")}`
           
        });
         case 'get-month':
           return res.json({
          type,
          userInput:gemResult.userInput,
          response:` Today is ${moment().format("MMMM")}`
           
        });
    }

  } catch (error) {
    
  }
}
 