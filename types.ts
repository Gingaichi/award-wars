// types.ts
export interface Nominee {
  id: string;
  name: string;
  winner?: boolean;
}

export interface Category {
  id: string;
  name: string;
  points: number;
  nominees: Nominee[];
}