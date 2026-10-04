export const defaultQuestions = [
    {
        id: 1,
        question: "What is the default scope of a Spring Bean?",
        type: "single",
        answers: [
            {
                id: "A",
                text: "Prototype",
                correct: false,
            },
            {
                id: "B",
                text: "Singleton",
                correct: true,
            },
            {
                id: "C",
                text: "Request",
                correct: false,
            },
            {
                id: "D",
                text: "Session",
                correct: false,
            },
        ],
        explanation: "The default scope of a Spring Bean is Singleton.",
    },

    {
        id: 2,
        question: "Which of the following are Java keywords?",
        type: "multiple",
        answers: [
            {
                id: "A",
                text: "class",
                correct: true,
            },
            {
                id: "B",
                text: "interface",
                correct: true,
            },
            {
                id: "C",
                text: "function",
                correct: false,
            },
            {
                id: "D",
                text: "define",
                correct: false,
            },
        ],
        explanation: "class and interface are Java keywords.",
    },

    {
        id: 3,
        question: "Which one is a JavaScript library?",
        type: "single",
        answers: [
            {
                id: "A",
                text: "React",
                correct: true,
            },
            {
                id: "B",
                text: "PostgreSQL",
                correct: false,
            },
            {
                id: "C",
                text: "Docker",
                correct: false,
            },
            {
                id: "D",
                text: "Linux",
                correct: false,
            },
        ],
        explanation:
            "React is a JavaScript library for building user interfaces.",
    },

    {
        id: 4,
        question: "Java is an object-oriented programming language.",
        type: "true_false",
        answers: [
            {
                id: "TRUE",
                text: "True",
                correct: true,
            },
            {
                id: "FALSE",
                text: "False",
                correct: false,
            },
        ],
        explanation:
            "Java is a class-based, object-oriented programming language.",
    },
];
