import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

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
    let assistanceImage;
    if(req.file){
      assistanceImage=await uploadOnCloudinary(req.file.path)
    }else{
      assistanceImage=imageUrl
    }
     const user=await User.findByIdAndUpdate(req.userId,{
     assistantName,assistanceImage
     },{new:true}).select("-password")
     return res.status(200).json(user)

  } catch (error) {
    return res.status(400).json({message:"update assistant error"})
  }
}