import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropType from 'prop-types';

import { fade } from 'style/animation';
import { SmallTitle } from 'style/style';

const Text = styled(SmallTitle)`
  color: white;
  z-index: 3;
  opacity: 0;
  animation: ${props =>
    props.playing &&
    css`
      ${fade} 4s ease-in infinite
    `};
`;

function DynamicText({ playing }) {
  const [textIdx, setTextIdx] = useState(0);
  const savedMeditationType = localStorage.getItem('meditationType');
  const age = parseInt(localStorage.getItem('age'), 10) || 0;

  const textArr = savedMeditationType === 'Unguided' ? [] : [
    "Inhale calmness",
    "Exhale stress",
    "Be present in this moment",
    "Feel the rhythm of your breath",
    "Let go of tension",
    "Your mind is at ease",
    "One breath at a time",
    "You are in control",
    "Breathe. Relax. Repeat.",
    "Find your inner balance",
  ];

  const time = 4000 + age * 20;
  const textThatChanges = textArr.length > 0 ? textArr[textIdx % textArr.length] : "";

  useEffect(() => {
    if (playing && textArr.length > 0) {
      const interval = setInterval(() => {
        setTextIdx((index) => index + 1);
      }, time);
      return () => {
        clearInterval(interval);
      };
    }
  }, [playing, textArr, time]);

  return <Text playing={playing}>{textThatChanges || "No messages available"}</Text>;
}

DynamicText.propType = {
  playing: PropType.bool,
};

export default DynamicText;