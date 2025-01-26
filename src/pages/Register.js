import React, { useState } from 'react';
import styled from 'styled-components';

import { MediumTitle } from 'style/style';
import Button from 'components/Button/Button';

const ResponseList = styled.ul`
  font-size: 1.8rem;  /* 增大字体大小 */
  width: 100%;
  max-width: 600px;   /* 限制最大宽度，防止过长 */
  word-wrap: break-word; /* 允许单词换行 */
  white-space: pre-wrap; /* 保持文本格式，防止溢出 */
  line-height: 1.6; /* 增加行距，提升可读性 */
  padding: 1rem;
  list-style: none;

  @media (max-width: 576px) {
    font-size: 1.4rem;  /* 在小屏幕上适配 */
  }
`;

const ResponseItem = styled.li`
  margin-bottom: 1rem;  /* 增加间距，避免挤在一起 */
  text-align: center;
`;

const ScrollableContainer = styled.div`
  max-height: 300px;  /* 设置最大高度 */
  overflow-y: auto;  /* 启用垂直滚动 */
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 10px;
`;

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

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Register(props) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [meditationDuration, setMeditationDuration] = useState('5');
  const [meditationType, setMeditationType] = useState('Guided');
  const [meditationPurpose, setMeditationPurpose] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateInput = (input) => {
    if (!input.trim()) {
      alert('Please fill out this field.');
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (step === 1 && validateInput(name)) {
      localStorage.setItem('name', name);
      setStep(2);
    } else if (step === 2 && validateInput(age)) {
      localStorage.setItem('age', age);
      setStep(3);
    } else if (step === 3 && validateInput(meditationDuration)) {
      localStorage.setItem('meditationDuration', meditationDuration);
      setStep(4);
    } else if (step === 4 && validateInput(meditationType)) {
      localStorage.setItem('meditationType', meditationType);
      setStep(5);
    } else if (step === 5 && validateInput(meditationPurpose)) {
      await sendToOpenAI();
    }
  };

  const sendToOpenAI = async () => {
    setLoading(true);
    const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      alert('API key is missing. Please check your environment variables.');
      setLoading(false);
      return;
    }

    console.log('Sending request with API Key:', OPENAI_API_KEY);

    const prompt = [
      {
        role: 'system',
        content: 'You are a meditation assistant providing concise guidance.',
      },
      {
        role: 'user',
        content: `Provide three short meditation guidance messages based on this meditation purpose: "${meditationPurpose}"`,
      }
    ];

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: prompt,
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error(`API response error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('API Response:', responseData);

      // 解析返回数据
      const responseText = responseData.choices[0]?.message?.content || '';
      const parsedSentences = responseText.split('. ').slice(0, 3).map(sentence => sentence.trim());

      // 存储数据
      localStorage.setItem('meditationPurpose', meditationPurpose);
      localStorage.setItem('meditationResponse', JSON.stringify(parsedSentences));

      setAiResponse(parsedSentences);
      setStep(6);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      alert('Failed to process meditation purpose. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div>
    <Container>
      <QuestionContainer>
        {step === 1 && (
          <>
            <MediumTitle>What is your name?</MediumTitle>
            <Input onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter your name" />
          </>
        )}
        {step === 2 && (
          <>
            <MediumTitle>What is your age?</MediumTitle>
            <Input onChange={(e) => setAge(e.target.value)} value={age} type="number" placeholder="Enter your age" />
          </>
        )}
        {step === 3 && (
          <>
            <MediumTitle>How long would you like to meditate today?</MediumTitle>
            <Input
              onChange={(e) => setMeditationDuration(e.target.value)}
              value={meditationDuration}
              placeholder="Enter duration (e.g. 10 mins)"
            />
          </>
        )}
        {step === 4 && (
          <>
            <MediumTitle>Would you like guided or unguided meditation?</MediumTitle>
            <Input
              onChange={(e) => setMeditationType(e.target.value)}
              value={meditationType}
              placeholder="Guided/Unguided"
            />
          </>
        )}
        {step === 5 && (
          <>
            <MediumTitle>What's the purpose for your meditation?</MediumTitle>
            <Input
              onChange={(e) => setMeditationPurpose(e.target.value)}
              value={meditationPurpose}
              placeholder="Enter your purpose..."
            />
          </>
        )}
        {step === 6 && aiResponse ? (
  <>
    <MediumTitle>Suggestions from AI:</MediumTitle>
    <ScrollableContainer>
      <ResponseList>
        {aiResponse.map((sentence, index) => (
          <ResponseItem key={index}>{sentence}</ResponseItem>
        ))}
      </ResponseList>
    </ScrollableContainer>
    <Button onClick={() => props.history.push('/')} text="Finish" />
  </>
) : (
  <Button onClick={handleNext} text={loading ? 'Processing...' : 'Next'} />
)}
      </QuestionContainer>
    </Container>
  </div>
);

}

export default React.memo(Register);
