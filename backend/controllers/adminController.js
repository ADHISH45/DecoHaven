import validator from "validator"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from "cloudinary"
import designerModel from "../models/designerModel.js"
import jwt from 'jsonwebtoken'

// API for adding Designer
const addDesigner = async (req, res) => {
  try {
    const { name, email, password, speciality, experience, about } = req.body;
    const imageFile = req.file;

    // Checking for all required fields
    if (!name || !email || !password || !speciality || !experience || !about) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Validate name (check if it's a string and has a length greater than 2 characters)
    if (!validator.isLength(name, { min: 3 })) {
      return res.status(400).json({ success: false, message: "Name must be at least 3 characters long" });
    }

    // Validate email using the validator package
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Validate password (ensure it's at least 6 characters long)
    if (!validator.isLength(password, { min: 6 })) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    // Validate experience (must be a positive integer)
    if (!validator.isInt(experience, { min: 0 })) {
      return res.status(400).json({ success: false, message: "Experience must be a positive number" });
    }

    // Optionally, validate the about field (e.g., ensure it's a non-empty string)
    if (!validator.isLength(about, { min: 10 })) {
      return res.status(400).json({ success: false, message: "About section must be at least 10 characters long" });
    }

    // Optionally, you can validate the image file if required (e.g., check if a file is uploaded)
    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    // Hash the password using bcrypt
    const saltRounds = 10; // Number of salt rounds (10 is a common value)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
    const imageUrl = imageUpload.secure_url

    const designerData = {
        name,
        email,
        image:imageUrl,
        password:hashedPassword,
        speciality,
        experience,
        about
    }

    const newDesigner = new designerModel(designerData)
    await newDesigner.save()
    res.json({success:true,message:"Designer added"})

    // All validations passed - proceed with adding the designer to the database
    // Example of saving to database (pseudo code):
    // const newDesigner = new Designer({ name, email, password: hashedPassword, speciality, experience, about, image: imageFile });
    // await newDesigner.save();

    return res.status(201).json({ success: true, message: "Designer added successfully" });

  } catch (error) {
    // Handle errors and send a meaningful response
    console.log(error)
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

//API for admin Login
const loginAdmin = async(req,res) => {
    try{
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success: true,token})
        }else{
            res.json({success: false, message: "Invalid Credentials"})
        }
    } catch (error){
        console.log(error)
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }

    }

    const allDesigners = async (req,res) => {
      try{
        const designers = await  designerModel.find({}).select('-password')
        res.json({success:true,designers})
      }
      catch (error)
      {
        console.log(error)
        res.json({succes:false,message:error.message})
      }
    }


export { addDesigner,loginAdmin,allDesigners };
