import React, { useCallback, useMemo } from 'react';
import { useForm, SubmitHandler, Controller, FieldValues } from 'react-hook-form';

import todoService from '../../../../api/todoService';
import { useToast } from '../../../../context/ToastContext/ToastContext';
import { TodoType } from '../../../../types/Todo';
import { Button } from '../../../../ui/Button';
import { Input } from '../../../../ui/Input';

import {FormContainer, Title, DateDisplay, TextArea, ErrorMessage} from "./style"

interface CreateTodoFormInputs {
  title: string;
  description: string;
}

interface CreateTodoFormProps {
  initialDate: Date;
  closeModal: () => void;
  addTodo: (todo: TodoType) => void;
  updateTodo: (updatedTodo: TodoType) => void;
  todo?: TodoType; 
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ initialDate, closeModal, addTodo, updateTodo, todo }) => {
  const { handleSubmit, formState: { errors }, control, clearErrors } = useForm<CreateTodoFormInputs>({
    defaultValues: useMemo(() => todo ? { title: todo.title, description: todo.description } : {}, [todo])
  });

  const { showToast } = useToast();

  const onSubmit: SubmitHandler<CreateTodoFormInputs> = useCallback(async (data) => {
    try {
      if (todo) {
        // Update existing todo
        const updatedTodo = await todoService.updateTodo(todo.id, data.title, data.description, todo.completed);
        showToast('Задача успешно обновлена', 'success');
        updateTodo(updatedTodo);
      } else {
        // Create new todo
        const newTodo = await todoService.createTodo({
          title: data.title,
          description: data.description,
          todoDate: initialDate.getTime()
        });
        showToast('Задача успешно создана', 'success');
        addTodo(newTodo);
      }
      closeModal();
    } catch (error) {
      showToast('Ошибка при сохранении задачи', 'error');
      console.error('Ошибка при сохранении задачи', error);
    }
  }, [todo, initialDate, addTodo, updateTodo, showToast, closeModal]);

  const renderTitleInput = useCallback(({ field }: { field: FieldValues }) => (
    <Input
      inputSize="medium"
      color="base"
      placeholder="Заголовок"
      {...field}
      onClear={() => clearErrors('title')}
      onChange={(e) => {
        field.onChange(e);
        clearErrors('title');
      }}
    />
  ), [clearErrors]);

  const renderDescriptionInput = useCallback(({ field }: { field: FieldValues }) => (
    <TextArea
      placeholder="Описание"
      {...field}
      onChange={(e) => {
        field.onChange(e);
        clearErrors('description');
      }}
    />
  ), [clearErrors]);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Title>{todo ? 'Редактировать задачу' : 'Создать задачу'}</Title>
      <DateDisplay>Дата: {initialDate.toLocaleDateString()}</DateDisplay>
  
      <Controller
        name="title"
        control={control}
        rules={{ required: 'Заголовок обязателен' }}
        render={renderTitleInput}
      />
      {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
  
      <Controller
        name="description"
        control={control}
        rules={{ required: 'Описание обязательно' }}
        render={renderDescriptionInput}
      />
      {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
  
      <Button
        size="medium"
        color="base"
        backgroundColor="base"
        type="submit"
      >
        {todo ? 'Обновить' : 'Создать'}
      </Button>
    </FormContainer>
  );
};