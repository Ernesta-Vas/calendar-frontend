import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

    @media (max-width: 576px) {
    width: 90%;
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
  text-align: center;
`;

export const TextArea = styled.textarea`
  padding: 12px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
  resize: vertical;

  &:focus {
    border-color: #2c3e50;
    box-shadow: 0 0 5px rgba(44, 62, 80, 0.2);
    outline: none;
  }

  &:hover {
    border-color: #2c3e50;
  }
`;


export const DateDisplay = styled.div`
  font-size: 18px;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
`;

export const ErrorMessage = styled.p`
  color: #ff1493;
  font-size: 14px;
  margin-top: -10px;
`;