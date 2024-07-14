import styled from 'styled-components';

export const SelectorsContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
  flex-direction: column;

  & div {
  width: 100%;
  }
  }
`;