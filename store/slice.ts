import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
};

const taskSlice = createSlice({
  name: 'taskmanager',
  initialState: {
    tasks: [
        { id: 1, title: "Complete the task manager application", description: "Complete all the functionalities of the task manager app", status: "in-progress", dueDate: "2024-10-20" },
        { id: 2, title: "Fix bugs in user authentication module", description: "Resolve login and registration issues reported by users", status: "in-progress", dueDate: "2024-10-20" },
        { id: 3, title: "Design the homepage layout", description: "Create a user-friendly and visually appealing homepage for the application", status: "todo", dueDate: "2024-10-20" },
        { id: 4, title: "Optimize database queries", description: "Improve performance by optimizing SQL queries for faster load times", status: "in-progress", dueDate: "2024-10-20" },
        { id: 5, title: "Implement user profile features", description: "Allow users to create and edit their profiles", status: "Completed", dueDate: "2024-10-22" },
        { id: 6, title: "Conduct user testing", description: "Test the application with real users and gather feedback", status: "in-progress", dueDate: "2024-10-25" },
        { id: 7, title: "Create a marketing plan", description: "Develop a strategy to promote the task manager application", status: "todo", dueDate: "2024-10-30" },
        { id: 8, title: "Deploy the application", description: "Make the application live on a production server", status: "in-progress", dueDate: "2024-11-01" },
        { id: 9, title: "Set up analytics tracking", description: "Implement tracking to monitor user engagement and application performance", status: "in-progress", dueDate: "2024-10-28" },
        { id: 10, title: "Prepare documentation", description: "Create user manuals and technical documentation for the application", status: "todo", dueDate: "2024-11-05" },
      ]
  },
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      task.title = task.title.trim();
      task.description = task.description.trim();
      task.status = task.status.trim();
      task.dueDate = task.dueDate.trim();
      state.tasks.push(task);
    },
    editTask: (state, action: PayloadAction<{ id: number; task: Task }>) => {
      const { id, task } = action.payload;
      state.tasks = state.tasks.map(t => (t.id === id ? { ...t, ...task } : t));
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    }
  },
});

export const { addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
