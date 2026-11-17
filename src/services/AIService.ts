import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const aiService = {
    async chat(message: string, context: string = '') {
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [
                { role: 'system', content: `You are a helpful travel assistant for Gontobbo. Context: ${context}` },
                { role: 'user', content: message },
            ],
            temperature: 0.7,
        });
        return response.choices[0].message.content;
    },

    async generateItinerary(destination: string, days: number, interests: string[]) {
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [
                { role: 'system', content: 'You are an expert travel planner.' },
                { role: 'user', content: `Create a ${days}-day itinerary for ${destination}. Interests: ${interests.join(', ')}.` },
            ],
            temperature: 0.7,
        });
        return response.choices[0].message.content;
    },
};