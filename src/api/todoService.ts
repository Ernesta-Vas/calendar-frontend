import {axiosInstance} from "../../axiosInstance.ts"
import { API_URL } from "../constant/url.ts";
import { TodoType } from "../types/Todo";


export const todoService = {
  async createTodo({ title, description, todoDate }: { title: string; description: string; todoDate: number }): Promise<TodoType> {
    const response = await axiosInstance.post<TodoType>(`/todos`, { title, description, todoDate });
    return response.data;
  },

  async getTodos(): Promise<TodoType[]> {
    const response = await axiosInstance.get<TodoType[]>(`/todos`);
    return response.data;
  },

  async getTodoById(id: number): Promise<TodoType> {
    const response = await axiosInstance.get<TodoType>(`/todos/${id}`);
    return response.data;
  },

  async updateTodo(id: number, title: string, description: string, completed: boolean): Promise<TodoType> {
    const response = await axiosInstance.put<TodoType>(`/todos/${id}`, { title, description, completed });
    return response.data;
  },

  async deleteTodo(id: number): Promise<void> {
    await axiosInstance.delete(`/todos/${id}`);
  },

    async getTodosForWeek(startDate: number, endDate: number): Promise<TodoType[]> {
    const response = await axiosInstance.get<TodoType[]>(`/todos/week`, {
      params: { startDate, endDate }
    });
    return response.data;
  },

  async updateTodoDate(id: number, newDate: number): Promise<TodoType> {
    const response = await axiosInstance.put<TodoType>(`${API_URL}/todos/${id}/updateDate`, { newDate });
    return response.data;
  }
};

export default todoService;
