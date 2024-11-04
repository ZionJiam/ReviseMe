// flashcard-ai-service/services/flashCardAiService.js
const OpenAI = require('openai');

const flashCardAiService = {
    flashCardAi: async (data) => {
        const { prompt } = data;
        const openai = new OpenAI(process.env.OPENAI_API_KEY);
        const aiModel = "gpt-3.5-turbo";

        const messages = [
            { 
                role: "system", 
                content: "You are a helpful assistant that generates flashcards with a clear 'Front' (Question) and 'Back' (Answer). Each flashcard should be structured like this:\nFront: [Question]\nBack: [Answer]."
            },
            { role: "user", content: prompt },
        ];

        try {
            const completion = await openai.chat.completions.create({
                model: aiModel,
                messages: messages,
                max_tokens: 2000, // Allow for a larger response if needed
                temperature: 0.7,
                frequency_penalty: 0.5
            });

            // Parse the response to extract the front and back
            const response = completion.choices[0].message.content;
            
            console.log('AI response: ', completion);

            // Log the entire response content
            console.log('Full response content: ', response);

            // Split the response into front and back sections based on the structure
            const flashcards = response.split('\n\n').map(flashcardText => {
                const [front, back] = flashcardText.split('Back:');
                
                if (!front) {
                    throw new Error('Invalid flashcard format');
                }

                return {
                    question: front.replace('Front:', '').trim(), // Map 'front' to 'question'
                    answer: back ? back.trim() : ''               // Map 'back' to 'answer'
                };
            });

            // Return structured flashcards
            return { flashcards };

        } catch (error) {
            console.error("Error with OpenAI API:", error);
            throw new Error('Unable to generate flashcards');
        }
    }
};

module.exports = flashCardAiService;
