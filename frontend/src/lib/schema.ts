
export const QUIZ_SCHEMA = {
    type: "array",
    items: {
        type: "object",
        required: ["id", "questionText", "options", "correctAnswer", "explanation"],
        properties: {
            id: { type: "string" },
            questionText: { type: "string" },
            options: {
                type: "array",
                items: { type: "string" },
                minItems: 2
            },
            correctAnswer: { type: "string" },
            explanation: { type: "string" }
        }
    }
};

export const EXAMPLE_QUIZ = [
    {
        "id": "1",
        "questionText": "What does HTTP stand for?",
        "options": ["HyperText Transfer Protocol", "HyperText Transmission Protocol", "HyperLoop Tool Protocol"],
        "correctAnswer": "HyperText Transfer Protocol",
        "explanation": "HTTP is the foundation of data communication for the World Wide Web."
    }
];
