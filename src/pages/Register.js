import React, { useState } from 'react';
import styled from 'styled-components';

import { MediumTitle } from 'style/style';
import Button from 'components/Button/Button';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 92vh;
  width: 100vw;
  top: 0;
  left: 0;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  font-size: 2.5rem;
  text-align: center;
  border-bottom: 3px solid black;
  margin-bottom: 5rem;

  @media (max-width: 900px) {
    margin-bottom: 0;
  }

  @media (max-width: 576px) {
    width: 80%;
    font-size: 1.6rem;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 50px;
  font-size: 2.5rem;
  text-align: center;
  border-bottom: 3px solid black;
  margin-bottom: 5rem;

  @media (max-width: 900px) {
    margin-bottom: 0;
  }

  @media (max-width: 576px) {
    width: 80%;
    font-size: 1.6rem;
  }
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Register(props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [meditationDuration, setMeditationDuration] = useState('');
  const [meditationType, setMeditationType] = useState('guided'); // Default to 'guided'
  const [step, setStep] = useState(1); // Track whether user is entering name, age, meditation duration, or meditation type

  const validateInput = input => {
    if (!input) {
      alert(`Please enter your ${step === 1 ? 'name' : step === 2 ? 'age' : step === 3 ? 'meditation duration' : 'meditation type'}.`);
      return false;
    }

    // Add age validation for step 2
    if (step === 2) {
      const ageValue = parseInt(input, 10);
      if (isNaN(ageValue) || ageValue <= 0 || ageValue >= 120) {
        alert('Please enter a valid age between 1 and 119.');
        return false;
      }
    }

    // Add meditation duration validation for step 3
    if (step === 3) {
      const durationValue = parseInt(input, 10);
      if (isNaN(durationValue) || durationValue < 2 || durationValue > 30) {
        alert('Please enter a valid meditation duration between 2 and 30 minutes.');
        return false;
      }
    }

    // Add meditation type validation for step 4
    if (step === 4 && !input) {
      alert('Please select whether you would like a guided or unguided meditation.');
      return false;
    }

    return true;
  };

  const handleNameChange = e => setName(e.target.value);
  const handleAgeChange = e => setAge(e.target.value);
  const handleMeditationDurationChange = e => setMeditationDuration(e.target.value);
  const handleMeditationTypeChange = e => setMeditationType(e.target.value);

  const handleClick = () => {
    if (step === 1) {
      if (validateInput(name)) {
        localStorage.setItem('name', name);
        setStep(2); // Move to the next step
      }
    } else if (step === 2) {
      if (validateInput(age)) {
        localStorage.setItem('age', age);
        setStep(3); // Move to the next step
      }
    } else if (step === 3) {
      if (validateInput(meditationDuration)) {
        localStorage.setItem('meditationDuration', meditationDuration);
        setStep(4); // Move to the next step
      }
    } else if (step === 4) {
      if (validateInput(meditationType)) {
        localStorage.setItem('meditationType', meditationType);
        props.history.push('/'); // Navigate to the next page
      }
    }
  };

  return (
    <div>
      <Container>
        <QuestionContainer>
          {step === 1 ? (
            <>
              <MediumTitle>What is your name?</MediumTitle>
              <Input onChange={handleNameChange} value={name} />
            </>
          ) : step === 2 ? (
            <>
              <MediumTitle>What is your age?</MediumTitle>
              <Input onChange={handleAgeChange} value={age} type="number" />
            </>
          ) : step === 3 ? (
            <>
              <MediumTitle>How long would you like to meditate today?</MediumTitle>
              <Input onChange={handleMeditationDurationChange} value={meditationDuration} type="number" />
            </>
          ) : (
            <>
              <MediumTitle>Would you like to have guided or unguided meditation?</MediumTitle>
              <Select onChange={handleMeditationTypeChange} value={meditationType}>
                <option value="guided">Guided</option>
                <option value="unguided">Unguided</option>
              </Select>
            </>
          )}
          <Button onClick={handleClick} />
        </QuestionContainer>
      </Container>
    </div>
  );
}

export default React.memo(Register);