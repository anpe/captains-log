import { Content } from "./content.model";

export interface Entry {
  id: string;
  createdOn: string;
  updatedOn: string;
  title: string;
  content: string;
}
