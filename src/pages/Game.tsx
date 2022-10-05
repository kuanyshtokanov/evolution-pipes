import React from 'react';

import { Wrapper } from './Game.styled';
import LevelMap from '../components/LevelMap';

const GamePage: React.FC = () => {
  
  return (
    <Wrapper>
      <LevelMap />
    </Wrapper>
  )
}

export default GamePage;
