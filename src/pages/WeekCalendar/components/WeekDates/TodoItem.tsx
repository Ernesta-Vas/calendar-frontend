import React, { memo } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import { TodoType } from '../../../../types/Todo.ts';

import {
  TodoItem,
  TodoContent,
  TodoTitle,
  TodoDescription,
  EditButton,
  DeleteButton
} from './style.ts';

interface TodoItemComponentProps {
  todo: TodoType;
  provided: DraggableProvided;
  handleEditClick: (todo: TodoType) => void;
  deleteTodo: (id: number) => void;
}

const TodoItemComponent: React.FC<TodoItemComponentProps> = ({ todo, provided, handleEditClick, deleteTodo }) => {
  return (
    <TodoItem
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onDoubleClick={(e) => { e.stopPropagation(); handleEditClick(todo); }}
    >
      <TodoContent>
        <TodoTitle>{todo.title}</TodoTitle>
        <TodoDescription>{todo.description}</TodoDescription>
      </TodoContent>
      <EditButton onClick={(e) => { e.stopPropagation(); handleEditClick(todo); }}>
        <FaEdit />
      </EditButton>
      <DeleteButton onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}>
        <FaTrashAlt />
      </DeleteButton>
    </TodoItem>
  );
};

export const MemoizedTodoItemComponent = memo(TodoItemComponent);