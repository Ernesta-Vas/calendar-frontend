import { TodoType } from "../../types/Todo";

export interface TodoContextType {
  todos: { [date: string]: TodoType[] };
  addTodo: (todo: TodoType) => void;
  updateTodo: (todo: TodoType) => void;
  deleteTodo: (id: number) => void;
  setTodos: (todos: { [date: string]: TodoType[] }) => void;
}
