import { Content } from "./Content";

export interface Entry {
    id: string;
    createdOn: string;
    updatedOn: string;
    title: string;
    content: Content
}