const OpenAI = require('openai');

// Initialize OpenAI with your API key
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const aiModel = "gpt-3.5-turbo"; 

// Function to generate flashcards
const flashCardAi = async (req, res) => {
    const { prompt } = req.body;

    // Validate prompt input
    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
    }

    const messages = [
        {
            role: "system",
            content: "You are studying flashcards.",
        },
        {
            role: "user",
            content: prompt,
        },
    ];

    try {
        const completion = await openai.chat.completions.create({
            model: aiModel,
            messages: messages,
            max_tokens: 100, // Limit the response to a maximum of 100 tokens
        });

        const aiResponse = completion.choices[0].message.content;

        // Send the AI response back to the client
        return res.status(200).json({ aiResponse: aiResponse });
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        return res.status(500).json({ message: 'Unable to generate flashcards' });
    }
};

module.exports = { flashCardAi };
