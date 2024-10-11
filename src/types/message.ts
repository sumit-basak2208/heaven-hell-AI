export interface Message {
    _id?: string;
    message: string;
    isBot: boolean;
    email?: string;
}