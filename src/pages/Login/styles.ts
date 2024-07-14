import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FormContainer = styled.div`
  background: #fff;
  padding: 60px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-in-out;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 32px;
  color: #2c3e50;
  text-align: center;
  font-weight: 500;
`;

export const Error = styled.p`
  color: #dc3545;
  font-size: 14px;
  text-align: left;
`;

export const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  margin-top: 40px;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonWrapper = styled.div`
`;

export const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;