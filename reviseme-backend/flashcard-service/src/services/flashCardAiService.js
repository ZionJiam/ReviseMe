const OpenAI = require("openai");

exports.flashCardAi = functions.https.onCall(async (data, context) => {
    const { prompt } = data;
    const openai = new OpenAI(process.env.OPENAI_API_KEY);
    const aiModel = "gpt-3.5-turbo"; 

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
        });

        const aiResponse = completion.choices[0].message.content;

        return {
            aiResponse: aiResponse, // This is the response from the AI
        };
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        throw new functions.https.HttpsError('internal', 'Unable to generate flashcards');
    }
});

module.exports = new flashCardAiService();