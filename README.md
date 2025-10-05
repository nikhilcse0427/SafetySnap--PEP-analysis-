# SafetySnap - PPE Detection Application

A MERN stack application for uploading images and analyzing Personal Protective Equipment (PPE) compliance.

## Features

- 📸 Image upload functionality
- 🔍 AI-powered PPE detection
- 📊 Analysis results dashboard
- 💾 MongoDB storage for images and results
- ⚡ Real-time detection feedback

## Tech Stack

- **Frontend**: React, TailwindCSS, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **AI/ML**: TensorFlow.js with COCO-SSD model

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm run install-all
   ```

2. **Configure environment**:
   - Copy `.env.example` to `.env`
   - Update MongoDB URI if needed

3. **Start MongoDB**:
   ```bash
   mongod
   ```

4. **Run the application**:
   ```bash
   npm run dev
   ```

5. **Access the app**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

- `POST /api/upload` - Upload image for PPE analysis
- `GET /api/analyses` - Get all analysis results
- `GET /api/analyses/:id` - Get specific analysis result
- `DELETE /api/analyses/:id` - Delete analysis result

## PPE Detection

The application detects common PPE items including:
- Hard hats/helmets
- Safety vests
- Gloves
- Safety glasses
- Masks

## License

ISC
