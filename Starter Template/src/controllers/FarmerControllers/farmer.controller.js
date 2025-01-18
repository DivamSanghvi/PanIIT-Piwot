import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Farmer from "../../models/Farmer.model.js";
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs/promises'; 

const gemini_api_key = process.env.GEMINI_API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);

const geminiConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
  };
  
  const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-pro", // Model to use (can be 'gemini-pro' or other available models)
    geminiConfig,
});

export const signup = async (req, res) => {
    try {
      const { fullname, phoneNumber, aadharCard, email, address, landDetails, farmingExperience, password } = req.body;
  
      // Check if farmer already exists
      const existingFarmer = await Farmer.findOne({ phoneNumber });
      if (existingFarmer) {
        return res.status(400).json({ message: "Farmer already exists with this phone number." });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create and save new farmer
      const newFarmer = new Farmer({
        fullname,
        phoneNumber,
        aadharCard,
        email,
        address,
        landDetails,
        farmingExperience,
        password: hashedPassword,
      });
  
      await newFarmer.save();
  
      res.status(201).json({ message: "Farmer registered successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error during signup", error: error.message });
    }
  };

export const login = async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
  
      // Find the farmer by phone number
      const farmer = await Farmer.findOne({ phoneNumber });
      if (!farmer) {
        return res.status(404).json({ message: "Farmer not found." });
      }
  
      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, farmer.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      // Generate tokens
      const accessToken = jwt.sign(
        { id: farmer._id, phoneNumber: farmer.phoneNumber },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
      );
  
      const refreshToken = jwt.sign(
        { id: farmer._id, phoneNumber: farmer.phoneNumber },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
      );
  
      // Store the tokens in cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
  
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      });
  
      res.status(200).json({ message: "Logged in successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error during login", error: error.message });
    }
  };


  export const askGemini = async (req, res) => {
    const { question } = req.body;
  
    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }
  
    try {
      // Generate content from the Gemini model
      const result = await geminiModel.generateContent(question);
      const response = result.response;
  
      // Send back the response to the client
      return res.json({
        success: true,
        data: response.text(), // Assuming the response contains text
      });
    } catch (error) {
      console.error('Error with Gemini API:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to get a response from Gemini API',
      });
    }
  };


  const geminiModelVision = googleAI.getGenerativeModel({
    model: "gemini-1.5-flash", // Model to use (can be 'gemini-pro' or other available models)
    geminiConfig,
});

export const analyzePlantDisease = async (req, res) => {
    console.log(req.files);  // Log the entire req.files object to inspect

    // Check if the image file exists in req.files
    const imageLocalPath = req.files?.photo && req.files.photo.length > 0 
        ? req.files.photo[0].path 
        : null;

    if (!imageLocalPath) {
        return res.status(400).json({ message: 'No image file uploaded' });
    }

    try {
        // Read the uploaded image file and convert it to base64 using fs.promises.readFile
        const imageFile = await fs.readFile(imageLocalPath);  // Using fs.promises.readFile
        const imageBase64 = imageFile.toString("base64");

        // Prepare the prompt for the Gemini model
        const promptConfig = [
            { text: "Analyze the plant disease in this image. Describe the disease, its probable cause, how to solve it, and future precautions." },
            {
                inlineData: {
                    mimeType: "image/jpeg",  // Assuming the image is in JPEG format
                    data: imageBase64, // Base64 encoded image data
                },
            },
        ];

        // Send the image to Gemini for analysis
        const result = await geminiModelVision.generateContent({
            contents: [{ role: "user", parts: promptConfig }],
        });

        // Get the response from Gemini
        const response = await result.response;

        // Send back the analysis response
        return res.json({
            success: true,
            data: response.text(), // Assuming the response contains text
        });
    } catch (error) {
        console.error('Error analyzing plant disease:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to analyze the plant disease',
        });
    }
};