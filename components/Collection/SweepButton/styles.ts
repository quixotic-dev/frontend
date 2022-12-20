import styled from "styled-components";

export const SweepBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 40px;
  height: 40px;
  font-size: 18px;
  border-radius: 12px;
  transition: all 0.2s;
  background: ${(props) => props.theme.colors.lightGray};
  color: ${(props) => props.theme.colors.primary};


  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.gray};
  }
`;

export const ButtonText = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 8px;
  width: fit-content;
  margin: auto;
`;
