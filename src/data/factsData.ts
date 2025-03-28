export interface Fact {
  id: number;
  question: string;
  answer: string;
  description: string;
  category: string;
  country: string;
  year: number | null;
  timeperiod: string;
  source: string;
  likes: number;
  bookmarks: number;
}