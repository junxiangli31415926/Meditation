import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Select = styled.select`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 1rem;
`;

function TimerBtn({ onClick, duration }) {
  const times = [
    { duration: 60, text: '1 min' },
    { duration: 120, text: '2 min' },
    { duration: 180, text: '3 min' },
    { duration: 240, text: '4 min' },
    { duration: 300, text: '5 min' },
    { duration: 600, text: '10 min' },
    { duration: 900, text: '15 min' },
    { duration: 1200, text: '20 min' },
    { duration: 1500, text: '25 min' },
    { duration: 1800, text: '30 min' },
  ];

  return (
    <Select onChange={e => onClick(+e.target.value)} value={duration}>
      {times.map((t, i) => (
        <option value={t.duration} key={i}>
          {t.text}
        </option>
      ))}
    </Select>
  );
}

TimerBtn.propTypes = {
  onClick: PropTypes.func,
  duration: PropTypes.number,
};

export default TimerBtn;
