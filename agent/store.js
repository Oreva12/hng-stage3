let tasks = [];

export const addTask = (title, deadline) => {
  const task = { title, deadline, createdAt: new Date() };
  tasks.push(task);
  return task;
};

export const listTasks = () => tasks;