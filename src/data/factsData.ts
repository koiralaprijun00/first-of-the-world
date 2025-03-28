// src/data/factsData.ts
export interface Fact {
  id: number;
  question: string;
  answer: string;
  description: string;
  category: string;
  country: string;
  year: number;
  timeperiod: string;
  source: string;
  likes: number;
  bookmarks: number;
}