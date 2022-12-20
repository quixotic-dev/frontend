import styled from "styled-components";

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  grid-gap: 20px;
  grid-template-rows: 1fr;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 25px;
  }

  div:nth-child(4) {
    @media (min-width: ${(props) => props.theme.medium_width}) {
      display: none;
    }

    @media (min-width: 1097px) {
      display: flex;
    }
  }
`;
