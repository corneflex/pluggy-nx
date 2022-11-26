import styled from 'styled-components';

/* eslint-disable-next-line */
export interface CoreProps {}

const StyledCore = styled.div`
  color: pink;
`;

export function Core(props: CoreProps) {
  return (
    <StyledCore>
      <h1>Welcome to Core!</h1>
    </StyledCore>
  );
}

export default Core;
