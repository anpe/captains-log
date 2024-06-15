import { Content } from "./Content";

export interface Entry {
    id: string;
    date: number;
    title: string;
    content: Content
}