import { TodoType } from "../../types/Todo";

export const addTodo = (todos: { [date: string]: TodoType[] }, todo: TodoType) => {
  const dateString = new Date(+todo.todoDate).toISOString().split('T')[0];
  return {
    ...todos,
    [dateString]: [...(todos[dateString] || []), todo],
  };
};

export const updateTodo = (todos: { [date: string]: TodoType[] }, updatedTodo: TodoType) => {
  const dateString = new Date(+updatedTodo.todoDate).toISOString().split('T')[0];
  const updatedTodos = { ...todos };
  if (updatedTodos[dateString]) {
    const index = updatedTodos[dateString].findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      updatedTodos[dateString][index] = updatedTodo;
    }
  }
  return updatedTodos;
};

export const deleteTodo = (todos: { [date: string]: TodoType[] }, id: number) => {
  const updatedTodos = { ...todos };
  for (const date in updatedTodos) {
    updatedTodos[date] = updatedTodos[date].filter(todo => todo.id !== id);
  }
  return updatedTodos;
};