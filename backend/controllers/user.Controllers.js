import { response } from "express";
import uploadOnCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import User from "../models/user.model.js";
import moment from "moment";

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return res.status(500).json({ message: "Get current user error", error: error.message });
  }
};

// Update assistant (name and image)
export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;

    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    } else {
      assistantImage = imageUrl;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "Update assistant error" });
  }
};

// Ask Assistant
export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ response: "User not found" });
    }

    const assistantName = user.assistantName;
    const userName = user.name; //  FIXED: define userName

    const result = await geminiResponse(command, userName, assistantName);

    const jsonMatch = result.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      return res.status(400).json({
        response: "Sorry, I didn't understand your command. Please re-enter.",
      });
    }

    const gemResult = JSON.parse(jsonMatch[0]);
    const type = gemResult.type;

    switch (type) {
      case 'get-date':
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Current date is ${moment().format("YYYY-MM-DD")}`,
        });

      case 'get-time':
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Current time is ${moment().format("hh:mm A")}`,
        });

      case 'get-day':
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Today is ${moment().format("dddd")}`,
        });

      case 'get-month':
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Today is ${moment().format("MMMM")}`,
        });

      case 'google_search':
      case 'youtube_search':
      case 'youtube_play':
      case 'general':
      case 'calculator_open':
      case 'instagram_open':
      case 'facebook_open':
      case 'weather_show':
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: gemResult.response,
        });

      default:
        return res.status(400).json({
          response: "I didn't understand that command.",
        });
    }
  } catch (error) {
    console.error("askToAssistant error:", error); // log full error
    return res.status(500).json({ response: "Ask assistant error", error: error.message });
  }
};
