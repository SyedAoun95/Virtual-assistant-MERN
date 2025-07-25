import express from "express"
import { askToAssistant, getCurrentUser, updateAssistant } from "../controllers/user.Controllers.js";
import isAuth from "../middlewares/isAuth.js"
import upload from "../middlewares/multer.js";

const userRouter=express.Router()

userRouter.get("/current",isAuth,getCurrentUser)
userRouter.post("/update",isAuth,upload.single("assistantImage"),updateAssistant)
userRouter.post("/asktoassistant",isAuth,askToAssistant)
// userRouter.get("/asktoassistant",isAuth,getCurrentUser)
export default userRouter;
