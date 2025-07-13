const express = require('express');
const cors = require('cors');
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


app.get('/', (req, res) => {
    res.send('Hello from your Express backend!');
});

app.get('/api', (req, res) => {
    res.json({ message: 'This is your API endpoint!' });
});

app.post('/auto-reply', async (req, res) => {
    const incomingMessage = req.body.message;
    const aiResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are an assistant who replies to emails." },
            { role: "user", content: incomingMessage }
        ]
    });
    res.json({ reply: aiResponse.choices[0].message.content });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});


