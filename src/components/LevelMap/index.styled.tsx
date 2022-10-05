import styled from 'styled-components';

import pipesImg from '../../assets/pipes2.webp';

export const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row-reverse;
    margin: auto;

    @media screen and (max-width: 700px) {
        flex-direction: column;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* width: fit-content; */
    margin: 2rem 0;
    padding: 1rem;
    border-radius: 2rem;
    background: ${(p) => p.theme.background2};

    * {
        user-select: none;
    }
`;

export const LevelHead = styled.h2`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  font-family: 'Rubik Regular';
  /* font-size: large; */
`;

export const Row = styled.div`
  display: flex;
`;

export const Button = styled.button`
  cursor: pointer;
  background: ${(p) => p.theme.secondary};
  color: ${(p) => p.theme.text};
  font-family: 'Rubik Regular';
  font-size: 18px;
  border: none;
  padding: 15px;
  border-radius: 15px;
  margin-top: 20px;
  &:disabled {
      pointer-events: none;
  }
`;

export const Pipe = styled.div`
  position: relative;
  cursor: pointer;
  width: 43px;
  height: 43px;
  &:hover {
    background: ${(p) => p.theme.secondary};
  }
  &:after {
    position: absolute;
    content: '';
    width: 43px;
    height: 43px;
    left: 0;
    background: url(${pipesImg});
  }
  //small
  &[data-tile='╸']:after {
    background-position: 43px -43px;
  }
  &[data-tile='╹']:after {
    background-position: 43px -43px;
    transform: rotate(90deg);
  }
  &[data-tile='╺']:after {
    background-position: -2px -87px;
  }
  &[data-tile='╻']:after {
    background-position: -131px -134px;
  }
  //lines
  &[data-tile='━']:after {
    background-position: 130px 150px;
  }
  &[data-tile='┃']:after {
    background-position: 43px 106px;
  }
  //turns
  &[data-tile='┓']:after {
    background-position: -43px -217px;
  }
  &[data-tile='┛']:after {
    background-position: 173px -43px;
  }
  &[data-tile='┗']:after {
    background-position: 88px 65px;
    transform: rotate(90deg);
  }
  &[data-tile='┏']:after {
    background-position: 88px 64px;
    transform: rotate(180deg);
  }

  //three connections
  &[data-tile='┣']:after {
    background-position: -44px -88px;
  }
  &[data-tile='┳']:after {
    background-position: -87px -173.5px;
  }
  &[data-tile='┫']:after {
    background-position: 261px -43px;
    transform: rotate(-90deg);
  }
  &[data-tile='┻']:after {
    background-position: -87px -43px;
  }
  //cross
  &[data-tile='╋']:after {
    background-position: -130.5px 0px;
  }
`;