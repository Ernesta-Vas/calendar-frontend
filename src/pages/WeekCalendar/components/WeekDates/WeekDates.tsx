import { AnimatePresence } from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import { isDayOffService } from '../../../../api/isDayOffService';
import { Modal } from '../../../../components/Modal/Modal';
import { daysOfWeek } from '../../../../constant/dates';
import { formatDateString } from '../../../../helpers/formatDateString';
import { useModal } from '../../../../hooks/useModal';
import { TodoType } from '../../../../types/Todo';
import { CreateTodoForm } from '../CreateTodoForm/CreateTodoForm';

import {
  DaysContainer, 
  DayBlock, 
  DayHeader, 
  DayName, 
  DayNumber, 
  TodosContainer,
  TodoItem, 
  TodoTitle, 
  TodoContent,
  Tooltip
} from "./style"
import { MemoizedTodoItemComponent } from './TodoItem';

interface WeekDatesProps {
  weekDates: Date[];
  todos?: { [date: string]: TodoType[] };
  addTodo: (newTodo: TodoType) => void;
  updateTodo: (updatedTodo: TodoType) => void;
  deleteTodo: (id: number) => void;
  onDragEnd: (result: DropResult) => void;
}

export const WeekDates: React.FC<WeekDatesProps> = ({ weekDates, todos = {}, addTodo, updateTodo, deleteTodo }) => {
  const { modalState, openModal, closeModal } = useModal();
  const [localTodos, setLocalTodos] = useState<{ [date: string]: TodoType[] }>({});
  const [holidays, setHolidays] = useState<{ [date: string]: boolean }>({});

  const handleDayClick = useCallback((date: Date) => {
    openModal(<CreateTodoForm initialDate={date} closeModal={closeModal} addTodo={addTodo} updateTodo={updateTodo} />, 'create');
  }, [openModal, closeModal, addTodo, updateTodo]);

  const handleEditClick = useCallback((todo: TodoType) => {
    openModal(<CreateTodoForm initialDate={new Date(+todo.todoDate)} closeModal={closeModal} addTodo={addTodo} updateTodo={updateTodo} todo={todo} />, 'update');
  }, [openModal, closeModal, addTodo, updateTodo]);

  useEffect(() => {
    if (todos) {
      setLocalTodos(todos);
    }
  }, [todos]);

  useEffect(() => {
    const fetchHolidays = async () => {
      const holidayStatus: { [date: string]: boolean } = {};
      for (const date of weekDates) {
        const dateString = formatDateString(date);
        const res = await isDayOffService.isHoliday(dateString);
        holidayStatus[dateString] = res;
      }
      setHolidays(holidayStatus);
    };
  
    fetchHolidays();
  }, [weekDates]);

  const memoizedWeekDates = useMemo(() => weekDates, [weekDates]);
  const memoizedLocalTodos = useMemo(() => localTodos, [localTodos]);

  return (
    <>
      <DaysContainer>
        {memoizedWeekDates.map((date) => {
          const dateString = date.toISOString().split('T')[0];
          const dayTodos = memoizedLocalTodos[dateString] || [];
          const isHoliday = holidays[dateString.replace(/-/g, '')] || false;

          return (
            <Droppable key={dateString} droppableId={dateString}>
              {(provided) => (
                <DayBlock
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  onClick={() => handleDayClick(date)}
                  isHoliday={isHoliday}
                >
                  <DayHeader>
                    <DayName>{daysOfWeek[date.getDay()]}</DayName>
                    <DayNumber isHoliday={isHoliday}>{date.getDate()}</DayNumber>
                  </DayHeader>
                  {isHoliday && <Tooltip>В данный день официальный выходной</Tooltip>}
                  <TodosContainer>
                    {dayTodos.length > 0 ? (
                      dayTodos.map((todo, todoIndex) => (
                        <Draggable key={todo.id} draggableId={todo.id.toString()} index={todoIndex}>
                          {(provided) => (
                            <MemoizedTodoItemComponent
                              todo={todo}
                              provided={provided}
                              handleEditClick={handleEditClick}
                              deleteTodo={deleteTodo}
                            />
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <TodoItem>
                        <TodoContent>
                          <TodoTitle>Нет задач</TodoTitle>
                        </TodoContent>
                      </TodoItem>
                    )}
                    {provided.placeholder}
                  </TodosContainer>
                </DayBlock>
              )}
            </Droppable>
          );
        })}
      </DaysContainer>

      <AnimatePresence initial={false}>
        {modalState.isOpen && (
          <Modal show={modalState.isOpen} closeModal={closeModal} template={modalState.template} />
        )}
      </AnimatePresence>
    </>
  );
};