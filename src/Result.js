import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f7;
`;

const Card = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  max-width: 480px;
  width: 90%;
  text-align: center;
`;

const Button = styled.button`
  margin-top: 20px;
  font-size: 1.2rem;
  background: #007aff;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
`;

function Result() {
  const history = useHistory();
  const aiResponse = localStorage.getItem('aiResponse');

  return (
    <Container>
      <Card>
        <h2>AI Meditation Suggestions</h2>
        <p>{aiResponse}</p>
        <Button onClick={() => history.push('/')}>Go Back</Button>
      </Card>
    </Container>
  );
}

export default Result;
