# ai-text-to-image-video-generation

<p>
<img src="https://img.shields.io/badge/ReactJS-blue?logo=react">
<img src="https://img.shields.io/badge/Mobile App-React Native-61dafb?logo=android">
<img src="https://img.shields.io/badge/Backend-NodeJS-green?logo=node.js">
<img src="https://img.shields.io/badge/DataBase-MongoDB-lightgreen?logo=mongoDB">

</p>

**Hosted on** 
 **Frontend-> Varcel**
**& Backend-> APIs**

Click here for Live-[Demo](https://ai-text-to-image-video-generation.vercel.app/)

Welcome to our **AI Media Generator App**, built using **Vite + React** on the frontend and **Node.js + Express** on the backend. This project uses powerful AI models via **Hugging Face** for image generation and **Replicate** for video generation. Just enter a prompt and get high-quality media in seconds!

---

## 🚀 Features

- ✨ Text-to-Image Generation (Hugging Face)
- 🎞️ Text-to-Video Generation (Replicate)
- 📥 Download AI-generated content
- 🌐 Fast, modern Vite + Tailwind frontend
- 🔐 Secure API handling with `.env` secrets
- 🧪 Backend proxy for API security

---

## 🛠️ Tech Stack

**Frontend (Vite + React)**  
- React 18  
- Vite  
- Tailwind CSS  
- Axios  
- React Router  

**Backend (Node.js + Express)**  
- Express  
- dotenv  
- cors  
- body-parser  
- Hugging Face API  
- Replicate API  

---

## 📁 Project Structure

ai-media-generator/
├── client/ # Vite + React frontend
├── server/ # Express backend
├── .env # Contains API keys (not committed)
└── README.md

yaml
Copy
Edit
2. Create .env file inside server/
env
Copy
Edit
# server/.env
HUGGINGFACE_TOKEN=your-huggingface-token
REPLICATE_API_TOKEN=your-replicate-token
PORT=5000
❗️ Do NOT commit .env to GitHub. Use .gitignore to keep it private.

3. Install & Run
Frontend (Vite)
bash
Copy
Edit
cd client
npm install
npm run dev
Backend (Express)
bash
Copy
Edit
cd server
npm install
npm run dev
🔗 API Endpoints
Method	Endpoint	Description
POST	/api/text-to-image	Generate image from prompt
POST	/api/text-to-video	Generate video from prompt

📌 Notes
Frontend runs on http://localhost:3000

Backend runs on http://localhost:5000

All .env keys are required for media generation to work

API requests are handled via secure backend routes

📄 License
MIT License © 2025
Made with ❤️ by [Shubham Tiwari]




