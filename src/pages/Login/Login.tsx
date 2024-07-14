import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { authService } from '../../api/authService';
import { login } from '../../context/AuthContext/actionCreators';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { useToast } from '../../context/ToastContext/ToastContext';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

import { FormContainer, Title, Error, Link, ButtonWrapper, Form } from './styles';

interface LoginFormInputs {
  username: string;
  password: string;
}


export const Login: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext)
  const { showToast } = useToast();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const { username, id } = await authService.login(data.username, data.password);
      dispatch(login({ username, id }));
      showToast('Login successful', 'success');
      navigate('/week-calendar');
    } catch (error) {
      console.error('Login failed', error);
      showToast('Login failed: Invalid username or password', 'error');
      setError('username', { type: 'manual', message: 'Неверный логин или пароль' });
      setError('password', { type: 'manual', message: 'Неверный логин или пароль' });
    }
  };

  return (
    <FormContainer>
      <Title>Вход в аккаунт</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Username is required' }}
            render={({ field }) => (
              <Input
                inputSize="small"
                color="base"
                placeholder="Username"
                {...field}
                onClear={() => clearErrors('username')}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors('username');
                }}
              />
            )}
          />
          {errors.username && <Error>{errors.username.message}</Error>}
        </div>

        <div>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <Input
                inputSize="small"
                color="base"
                placeholder="Password"
                type="password"
                {...field}
                onClear={() => clearErrors('password')}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors('password');
                }}
              />
            )}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>

        <ButtonWrapper>
          <Button
            size="small"
            color="base"
            backgroundColor="base"
            type="submit"
          >
            Войти
          </Button>
        </ButtonWrapper>
      </Form>
      <Link href="/calendar-frontend/register">Нет аккаунта? Зарегистрироваться</Link>
    </FormContainer>
  );
};
