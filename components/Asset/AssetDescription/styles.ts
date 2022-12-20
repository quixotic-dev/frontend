import styled from "styled-components";

export const DescriptionGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
`;

export const DescriptionText = styled.div`
  white-space: pre-line;
  word-break: break-word;
  font-size: 14px;
  color: ${(props) => props.theme.colors.accent};

  a {
    color: ${(props) => props.theme.colors.network};
  }

  a:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const CollectionLinksGrid = styled.div`
  display: flex;
  grid-gap: 15px;
`;

export const CollectionLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 17px;

  &.etherscan {
    display: block;
    width: 15px;
    height: 15px;
  }
`;
