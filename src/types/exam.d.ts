export interface Exam {
    id: number;
    title: string;
    questions: [{
        id: number;
        question: string;
        options: string[];
        answer: string;
    }];
    description: string;
    instructions: string;
    duration: number;
}