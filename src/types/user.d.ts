export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: "STUDENT" | "EDUCATOR" | "INSTITUTION";
    token?: string;
}