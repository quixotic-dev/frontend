import styled from "styled-components";

export const Container = styled.div`
  max-width: ${(props) => props.theme.max_width};
  margin: 0 auto;
  padding: 20px 20px 40px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 40px;
  }
`;
