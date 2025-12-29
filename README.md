# verba_ai_chat_interface
Full-stack AI chat interface with TypeScript, React, Node.js - Verba AI Task 

## Tech Stack

### Frontend
- **React** with TypeScript
- **Axios** for API requests
- **CSS3** with animations and responsive design

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **CORS** enabled for cross-origin requests

## Features
 Real-time chat interface
 Message history with timestamps
 Typing indicator animation
 Error handling
 Mobile-responsive design
 Rule-based mock AI responses

 ## How to Run

 ### Prerequisites
 - Node.js (v16 or higher)
 - npm

 ### Backend Setup

 1. Navigate to backend folder:
 ```bash
 cd backend
 ```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm run dev
```
Backend runs on: `http://localhost:5000`

### Frontend Setup

1.Open a new terminal and navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

Frontend runs on: `http://localhost:3000`

## Integration with real AI Agent

To integrate with a real AI service (OpenAI, Claude, Gemini):

1. **Replace mock function**: Swap `generateMockResponse()` with an API call to the AI service
2. **Add API key**: Store the AI service API key securely in `.env` file  
3. **Update endpoint**: Modify `/api/chat` to call the AI API and handle responses
4. **Handle async calls**: Use async/await for API requests (structure already supports this).

The current architecture is already designed to support this - only the response generation logic needs to change.

## Project Structure
```
Verba AI/
├── backend/
│   ├── src/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```