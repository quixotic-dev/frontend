import styled from "styled-components";

export const DetailsGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
`;

export const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 20px;
  font-size: 14px;

  overflow: hidden;
  word-break: break-all;
`;

export const DetailLabel = styled.div`
  flex-shrink: 0;
  font-weight: 500;
`;

export const DetailText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${(props) => props.theme.colors.accent};
  font-weight: 500;

  a {
    color: ${(props) => props.theme.colors.network};
  }
`;
