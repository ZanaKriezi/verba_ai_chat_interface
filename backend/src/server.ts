import express, {type Request, type Response} from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

interface ChatRequest {
    message: string;
}

interface ChatResponse {
    response: string;
    timestamp: string;
}

const generateMockResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (message.includes('hello') || message.includes('hi')) {
        return "Hello there! How can I help you today?";
    } else if(message.includes('help')) {
        return "Sure! What do you need help with?";
    } else if(message.includes('price')) {
        return "Our pricing varies by plan. Please visit our pricing page for more details.";
    } else if(message.includes('thank you') || message.includes('thanks')) {
        return "You're welcome! If you have any more questions, feel free to ask.";
    } else if(message.includes('bye')){
        return "Goodbye! Have a great day!";
    } else{
        return "I'm sorry, I didn't understand that. Could you please rephrase?";
    }
};

app.post('/api/chat', (req: Request<{}, {}, ChatRequest>, res: Response<ChatResponse>) => {
    const {message}=req.body;

    if(!message || message.trim()===''){
        return res.status(400).json({
            error: 'Message is required'
         } as any);
    }

    const delay=Math.random() * 1000 + 500;

    setTimeout(() => {
        const aiResponse=generateMockResponse(message);

        res.json({
            response: aiResponse,
            timestamp: new Date().toISOString()
        });
    }, delay);
});

app.get('/api/health', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        message: 'Server is running'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
