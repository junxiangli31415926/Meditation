import React from 'react';
import styled from 'styled-components';

import Theme from 'containers/Theme/Theme';
import Card from 'components/Card/Card';
import { CardsContainer } from 'components/Card/Card';
import { NavLink, MediumTitle, SmallTitle } from 'style/style';

import Ocean from 'assets/ocean.svg';
import Mountain from 'assets/mountain.svg';
import Rain from 'assets/rain.svg';
import OceanImg from 'assets/ocean.jpg';
import MountainImg from 'assets/mountain.jpg';
import RainImg from 'assets/rainy.jpg';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  text-align: center;

  @media (max-width: 768px) {
    top: 8vh;
    transform: translateY(0);
  }

  @media (max-width: 576px) {
    top: 10vh;
  }
`;

const RestartButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #ff6f61;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff3b2f;
  }
`;

export const OceanWave = () => (
  <Theme url="/assets/ocean.mp3" theme="ocean" bgImg={OceanImg} />
);
export const MountainView = () => (
  <Theme url="/assets/mountain.mp3" theme="mountain" bgImg={MountainImg} />
);
export const RainyBeach = () => (
  <Theme url="/assets/rain.mp3" theme="rain" bgImg={RainImg} />
);

function Themes({ history }) {
  const name = localStorage.getItem('name');
  const meditationDuration = localStorage.getItem('meditationDuration'); // Retrieve the meditation duration from localStorage

  const themeObj = [
    { img: Ocean, title: `Ocean Waves [${meditationDuration} minutes]`, link: '/ocean' },
    { img: Mountain, title: `Mountain View [${meditationDuration} minutes]`, link: '/mountain' },
    { img: Rain, title: `Rainy Beach [${meditationDuration} minutes]`, link: '/rainy' },
  ];

  const themes = themeObj.map((theme, i) => (
    <NavLink to={theme.link} key={i}>
      <Card img={theme.img} title={theme.title} />
    </NavLink>
  ));

  const handleRestart = () => {
    localStorage.clear(); // Clear all localStorage data
    history.push('/'); // Redirect to the initial page
  };

  return (
    <Container>
      <MediumTitle style={{ marginTop: '-10px' }}>
        Welcome, <strong>{name}</strong> 🫶
      </MediumTitle>
      <SmallTitle>Choose your favorite theme</SmallTitle>
      <CardsContainer style={{ marginTop: '-30px' }}>{themes}</CardsContainer>
      <RestartButton onClick={handleRestart} style={{ marginTop: '+50px', fontSize: '20px'}}>Restart</RestartButton>
    </Container>
  );
}

export default React.memo(Themes);