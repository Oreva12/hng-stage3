import { Agent } from "@mastra/core";
import { addTask, listTasks } from "./store.js";

export const taskAgent = new Agent({
  name: "taskmate_agent",
  instructions: `
    You are TaskMate — a smart task assistant that helps users plan and manage their tasks.
    - You can create, list, and remind users about tasks.
    - Always confirm when a task is added.
    - Keep responses short, clear, and friendly.
    - If no task is specified, ask for one.
  `,
  model: {
    provider: "google",          // Using Gemini
    name: "gemini-2.5-flash",    // or "gemini-pro"
  },
  tools: [
    {
      name: "addTask",
      description: "Add a task with optional deadline.",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string" },
          deadline: { type: "string" }
        },
        required: ["title"]
      },
      execute: async ({ title, deadline }) => {
        const task = addTask(title, deadline);
        return `✅ Task '${task.title}' saved${task.deadline ? ` (due ${task.deadline})` : ""}.`;
      }
    },
    {
      name: "listTasks",
      description: "Show all user tasks.",
      parameters: {},
      execute: async () => {
        const tasks = listTasks();
        if (tasks.length === 0) return "You have no tasks yet. 🎯 Try adding one!";
        return "📋 Here are your tasks:\n" + tasks.map(
          (t, i) => `${i + 1}. ${t.title}${t.deadline ? ` — due ${t.deadline}` : ""}`
        ).join("\n");
      }
    }
  ]
});
