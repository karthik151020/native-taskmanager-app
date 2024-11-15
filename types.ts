export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
};

export type Posts = {
  user_id: number,
  id: number,
  title: string,
  body: string
}