import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';

import { authService } from '../../api/authService';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

import { FormContainer, Title, Error, StyledLink, ButtonWrapper, Form, StrengthBar, StrengthBarContainer } from './styles';

interface RegisterFormInputs {
  username: string;
  password: string;
  confirmPassword: string;
}

const PasswordStrengthIndicator: React.FC<{ password: string }> = ({ password }) => {
  const result = zxcvbn(password);
  const strength = Math.min(3, result.score + 1); 

  return (
    <StrengthBarContainer>
      {[...Array(3)].map((_, index) => (
        <StrengthBar key={index} strength={strength} index={index} />
      ))}
    </StrengthBarContainer>
  );
};

export const Register: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, setError, clearErrors, watch } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await authService.register(data.username, data.password);
      navigate('./calendar-frontend/login');
    } catch (error) {
      console.error('Registration failed', error);
      setError('username', { type: 'manual', message: 'Username already taken' });
    }
  };

  useEffect(() => {
    setPassword(watch('password') || '');
  }, [watch('password')]);

  return (
    <FormContainer>
      <Title>Регистрация</Title>
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
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            render={({ field }) => (
              <>
                <Input
                  inputSize="small"
                  color="base"
                  placeholder="Password"
                  type="password"
                  {...field}
                  onClear={() => {
                    clearErrors('password');
                    field.onChange('');
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors('password');
                  }}
                />
              </>
            )}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>

        <div>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match',
            }}
            render={({ field }) => (
              <Input
                inputSize="small"
                color="base"
                placeholder="Confirm Password"
                type="password"
                {...field}
                onClear={() => clearErrors('confirmPassword')}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors('confirmPassword');
                }}
              />
            )}
          />
          {errors.confirmPassword && <Error>{errors.confirmPassword.message}</Error>}
        </div>
        {password && <PasswordStrengthIndicator password={password} />}

        <ButtonWrapper>
          <Button
            size="small"
            color="base"
            backgroundColor="base"
            type="submit"
          >
            Зарегистрироваться
          </Button>
        </ButtonWrapper>
      </Form>
      <StyledLink to="/calendar-frontend/login">Уже есть аккаунт? Войти</StyledLink>
    </FormContainer>
  );
};