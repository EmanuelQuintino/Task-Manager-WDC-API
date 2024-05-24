import { UserTasksPagination } from "../services/taskServices";
import { CreateTaskDataTypes, UpdateTaskDataTypes } from "./taskRepository";

const tasks = [
  {
    id: "1",
    title: "task1",
    description: "description",
    date: "2024-05-22T16:00:00Z",
    status: "pending",
    user_id: "1",
  },

  {
    id: "2",
    title: "task2",
    description: "description",
    date: "2024-05-22T16:00:00Z",
    status: "completed",
    user_id: "1",
  },

  {
    id: "3",
    title: "task3",
    description: "description",
    date: "2024-05-22T16:00:00Z",
    status: "pending",
    user_id: "1",
  },
];

export const taskRepositoryInMemory = {
  async createTask(data: CreateTaskDataTypes) {
    try {
      const { id, title, description, date, status, user_id } = data;

      const task = {
        id,
        title,
        description,
        date,
        status,
        user_id,
      };

      tasks.push(task);

      return task;
    } catch (error) {
      throw error;
    }
  },

  async getTask(id: string) {
    try {
      const task = tasks.find((task) => task.id == id);
      return task;
    } catch (error) {
      throw error;
    }
  },

  async getTasks(data: UserTasksPagination) {
    try {
      const { userID, limit, offset, filter } = data;

      const filteredTasks = tasks.filter((task) => task.user_id === userID);

      if (filter !== "all") {
        return filteredTasks;
      } else {
        const paginatedTasks = filteredTasks.filter((task) => {
          return task.status === filter;
        });

        return paginatedTasks;
      }
    } catch (error) {
      throw error;
    }
  },

  async updateTask(data: UpdateTaskDataTypes) {
    try {
      const { id, title, description, date, status, user_id, updated_at } = data;

      const task = {
        id,
        title,
        description,
        date,
        status,
        user_id,
        updated_at,
      };

      tasks.push(task);

      return tasks[tasks.length - 1];
    } catch (error) {
      throw error;
    }
  },

  async deleteTaskByID(id: string) {
    try {
      const task = tasks.find((task) => task.id == id);
      return task;
    } catch (error) {
      throw error;
    }
  },
};
