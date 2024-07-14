import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';

import todoService from '../../api/todoService';
import { useDateContext } from '../../context/DateContext/DateContext';
import { useToast } from '../../context/ToastContext/ToastContext';
import { TodoType } from '../../types/Todo';

import { WeekDates } from './components/WeekDates/WeekDates';

const getWeekDates = (year: number, month: number, week: number) => {
  const dates: Date[] = [];
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const firstDateOfMonth = new Date(year, month - 1, 1);
  const startOfWeek = new Date(firstDateOfMonth.setDate(firstDateOfMonth.getDate() + (week - 1) * 7 - (firstDayOfMonth - 1)));

  for (let i = 0; i < 7; i++) {
    dates.push(new Date(startOfWeek));
    startOfWeek.setDate(startOfWeek.getDate() + 1);
  }
  return dates;
};

export const WeekCalendar: React.FC = () => {
  const { selectedYear, selectedMonth, selectedWeek } = useDateContext();
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [todos, setTodos] = useState<{ [date: string]: TodoType[] }>({});
  const { showToast } = useToast();
  console.log("test")
  useEffect(() => {
    setWeekDates(getWeekDates(selectedYear, selectedMonth, selectedWeek));
  }, [selectedYear, selectedMonth, selectedWeek]);

  const addTodo = useCallback((newTodo: TodoType) => {
    const dateString = new Date(+newTodo.todoDate).toISOString().split('T')[0];
    setTodos((prevTodos) => ({
      ...prevTodos,
      [dateString]: [...(prevTodos[dateString] || []), newTodo],
    }));
  }, []);

  const updateTodo = useCallback((updatedTodo: TodoType) => {
    const dateString = new Date(+updatedTodo.todoDate).toISOString().split('T')[0];
    setTodos(prevTodos => {
      const updatedTodos = { ...prevTodos };
      if (updatedTodos[dateString]) {
        const index = updatedTodos[dateString].findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
          updatedTodos[dateString][index] = updatedTodo;
        }
      }
      return updatedTodos;
    });
  }, []);

  const updateTodoDate = useCallback(async (id: number, newDate: number) => {
    try {
      await todoService.updateTodoDate(id, newDate);
      showToast('Дата задачи успешно обновлена', 'success');
    } catch (error) {
      console.error('Ошибка при обновлении даты задачи:', error);
      showToast('Ошибка при обновлении даты задачи', 'error');
    }
  }, [showToast]);

  const fetchTodos = useCallback(async () => {
    if (weekDates.length > 0) {
      const weekStartDate = weekDates[0].getTime();
      const weekEndDate = weekDates[weekDates.length - 1].getTime();

      const todosForWeek = await todoService.getTodosForWeek(weekStartDate, weekEndDate);
      const todosByDate: { [date: string]: TodoType[] } = {};
      todosForWeek.forEach((todo) => {
        const dateString = new Date(+todo.todoDate).toISOString().split('T')[0];
        if (!todosByDate[dateString]) {
          todosByDate[dateString] = [];
        }
        todosByDate[dateString].push(todo);
      });
      setTodos(todosByDate);
    }
  }, [weekDates]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const deleteTodo = useCallback(async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(prevTodos => {
        const updatedTodos = { ...prevTodos };
        for (const date in updatedTodos) {
          updatedTodos[date] = updatedTodos[date].filter(todo => todo.id !== id);
        }
        return updatedTodos;
      });
      showToast('Задача успешно удалена', 'success');
    } catch (error) {
      console.error('Error deleting todo:', error);
      showToast('Ошибка при удалении задачи', 'error');
    }
  }, [showToast]);

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(todos?.[source.droppableId] || []);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setTodos((prev) => ({
        ...prev,
        [source.droppableId]: items,
      }));
    } else {
      const sourceItems = Array.from(todos?.[source.droppableId] || []);
      const destinationItems = Array.from(todos?.[destination.droppableId] || []);

      const [movedItem] = sourceItems.splice(source.index, 1);
      movedItem.todoDate = new Date(destination.droppableId).getTime();

      destinationItems.splice(destination.index, 0, movedItem);

      setTodos((prev) => ({
        ...prev,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems,
      }));

      updateTodoDate(movedItem.id, movedItem.todoDate);
    }
  }, [todos, updateTodoDate]);

  const memoizedWeekDates = useMemo(() => weekDates, [weekDates]);
  const memoizedTodos = useMemo(() => todos, [todos]);

  return (
    <CalendarContainer>
      <h2>Еженедельный Календарь</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <WeekDates 
        weekDates={memoizedWeekDates} 
        todos={memoizedTodos} 
        addTodo={addTodo} 
        updateTodo={updateTodo} 
        deleteTodo={deleteTodo} 
        onDragEnd={onDragEnd}
        />
      </DragDropContext>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 100px;

   @media (max-width: 768px) {
    width: 100%;
  }
`;