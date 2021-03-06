import { css } from 'emotion';
import { theme } from 'core/theme';

const color = theme.palette.varColors;

export const logoContainer = css`
  grid-area: head;
  display: flex;
  flex-flow: column;
  background-color: ${color.grey1};
  background-image: url('./assets/img-back-header.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position-y: center;
  background-position-x: center;
  border-bottom: 3px solid ${color.brownLemon};

  ${theme.breakpoints.up('md')} {
    background-size: 75% auto;
  }

  ${theme.breakpoints.up('lg')} {
    background-size: 55% auto;
  }

  ${theme.breakpoints.up('xl')} {
    background-size: 45% auto;
  }
`;

export const logo = css`
  width: 100%;
  max-width: 130px;
  margin: 0 auto;
  display: block;
  padding: 2%;

  ${theme.breakpoints.down('sm')} {
    max-width: 80px;
  }

  ${theme.breakpoints.up('lg')} {
    padding: 2% 0 0;
  }
  ${theme.breakpoints.up('xl')} {
    max-width: 150px;
  }
`;

export const title = css`
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  font-weight: 500;
  padding: 1% 0 4%;
  text-align: center;
  font-size: 1rem;

  ${theme.breakpoints.up('md')} {
    font-size: 1.5rem;
  }
  ${theme.breakpoints.up('lg')} {
    font-size: 1.7rem;
  }
  ${theme.breakpoints.up('xl')} {
    font-size: 2rem;
  }

  span {
    width: 80%;
    color: #d9d900;
    font-weight: 500;
    font-family: 'Architects Daughter', cursive, Arial, Helvetica, sans-serif;
    font-size: 1.3rem;
    text-align: center;
    margin: 0 auto;
    padding: 5% 0 0;
  }
`;
