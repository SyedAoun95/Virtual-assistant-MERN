🤖 Virtual Assistant AI

Welcome to Virtual Assistant AI, a smart, customizable, and voice-powered AI built with the MERN stack. This assistant remembers users, speaks naturally, and looks however you want.

🚀 Features

🔊 Real-Time Voice Assistant  
Powered by the Web Speech API to speak like a real human with natural interaction

🧠 Smarter with Gemini AI  
Integrated with Gemini AI to deliver intelligent and conversational responses

🧍 Authentication with JWT and bcrypt  
Secure login and session memory using JSON Web Tokens and password hashing

🖼️ Fully Customizable Visuals  
Upload custom avatars and images using Cloudinary and Multer

🎨 Brand-Ready UI  
Change assistant's name, branding, theme, and voice

🧰 Tech Stack

💻 Frontend uses React with Vite  
🧠 Gemini API for AI brain  
🗣️ Web Speech API for speech  
🔐 JWT and bcrypt for secure auth  
📦 Express and Node.js for backend  
🗃️ MongoDB with Mongoose for database  
🌩️ Cloudinary and Multer for image uploads  
🌍 CORS enabled for full-stack communication

🧪 Run Locally

Backend Setup

1. Navigate to the backend directory  
2. Create a file named .env with the following content

PORT=5000  
MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_jwt_secret  
CLOUDINARY_CLOUD_NAME=your_cloud_name  
CLOUDINARY_API_KEY=your_api_key  
CLOUDINARY_API_SECRET=your_api_secret

3. Run the following commands

npm install  
npm run dev

Frontend Setup

1. Navigate to the frontend directory  
2. Run the following commands

npm install  
npm run dev

3. Open your browser at http colon slash slash localhost colon 5173

🛡️ Security

All passwords are hashed using bcrypt  
JWT tokens are stored securely in HTTP-only cookies  
CORS is configured to allow frontend and backend interaction

📦 Folder Structure

backend  
  routes  
  controllers  
  config  
  middleware  
  .env  
  server.js  

frontend  
  src  
    pages  
    components  
    assets  
  vite.config.js

🖼️ Customization Options

Change voice using Web Speech API  
Add branding, colors, and themes  
Personalize assistant's name and responses  
Build dashboards for analytics, chat history, etc

🤝 Contributing

Clone the repo  
Make your changes  
Submit a pull request  
Ideas and suggestions are always welcome

📄 License

This project is open-sourced under the MIT License

Built with love using MERN and Gemini AI
