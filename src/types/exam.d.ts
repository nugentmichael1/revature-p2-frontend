export interface Exam {
    id: number;
    title: string;
    questions?: Question[]
    description: string;
    instructions: string;
    duration: number;
}