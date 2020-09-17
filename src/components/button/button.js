import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Arrow from '../../assets/arrow.svg';

export const BtnContainer = styled.button`
  position: relative;
  width: 80px;
  height: 80px;
  background: black;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 3rem;
`;

const ArrowIcon = styled.img`
  width: 45%;
  height: 45%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function Button({ onClick, name }) {
  return (
    <BtnContainer onClick={() => onClick(name)}>
      <ArrowIcon src={Arrow} alt="button" />
    </BtnContainer>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string,
};

export default Button;
