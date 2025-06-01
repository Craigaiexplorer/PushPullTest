export interface Todo {
  id: string;
  text: string;
  createdAt: Date;
  completed: boolean;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
}