import React, { useRef, useEffect, useState } from 'react';

import MeditatorIcon from '../../assets/figure-2.svg';
import {
  PlayerContainer,
  FigureIcon,
  SVGIcon,
  Timer,
} from '../theme/themeStyles';

function ProgressBar({ duration, currentTime, playing }) {
  const [length, setLength] = useState();
  const circleRef = useRef();

  const progress = length - (currentTime / duration) * length;
  const elapsed = duration - currentTime;
  const sec = Math.floor(elapsed % 60);
  const min = Math.floor(elapsed / 60);

  useEffect(() => {
    const circleLength = circleRef.current.getTotalLength();
    setLength(circleLength);
  }, []);

  const svgConfig = {
    width: 453,
    height: 453,
    viewBox: '0 0 453 453',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  };

  const circleConfig = {
    cx: 226.5,
    cy: 226.5,
    r: 216.5,
    strokeWidth: 20,
  };

  return (
    <PlayerContainer>
      <FigureIcon src={MeditatorIcon} alt="meditator" />

      <SVGIcon {...svgConfig}>
        <circle {...circleConfig} stroke="#A0BDE6" />
      </SVGIcon>
      <SVGIcon {...svgConfig}>
        <circle
          {...circleConfig}
          ref={circleRef}
          stroke="#3680EA"
          transform="rotate(-90 226.5 226.5)"
          style={{
            strokeDasharray: length,
            strokeDashoffset: playing ? progress : length,
          }}
        />
      </SVGIcon>

      <Timer size="sm">{`${min}: ${sec}`}</Timer>
    </PlayerContainer>
  );
}

export default React.memo(ProgressBar);
