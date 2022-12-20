import styled from "styled-components";

export const CollectionGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
`;

export const CollectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 20px;
`;

export const CollectionInfo = styled.div`
  display: flex;
  grid-gap: 12px;
  align-items: center;
`;

export const CollectionImageContainer = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.lightGray};
`;

export const CollectionText = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 3px;
`;

export const CollectionName = styled.div`
  font-weight: 800;
  color: ${(props) => props.theme.colors.primary};
`;

export const CollectionFloor = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.accent};
  font-size: 14px;
`;

export const CollectionThreshold = styled.div``;
