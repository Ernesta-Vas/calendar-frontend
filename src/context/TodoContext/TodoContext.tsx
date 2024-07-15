import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

import { TodoType } from '../../types/Todo';

import { addTodo as addTodoUtil, updateTodo as updateTodoUtil, deleteTodo as deleteTodoUtil } from './actionCreators';
import { TodoContextType } from './todoTypes';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodosState] = useState<{ [date: string]: TodoType[] }>({});

  const addTodo = useCallback((newTodo: TodoType) => {
    setTodosState((prevTodos) => addTodoUtil(prevTodos, newTodo));
  }, []);

  const updateTodo = useCallback((updatedTodo: TodoType) => {
    setTodosState((prevTodos) => updateTodoUtil(prevTodos, updatedTodo));
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodosState((prevTodos) => deleteTodoUtil(prevTodos, id));
  }, []);

  const setTodos = useCallback((newTodos: { [date: string]: TodoType[] }) => {
    setTodosState(newTodos);
  }, []);

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};