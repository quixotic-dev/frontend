import styled from "styled-components";

export const AttributesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const Attribute = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
  font-size: 14px;
  font-weight: 700;
  padding: 15px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.03),
    -5px -5px 15px rgba(0, 0, 0, 0.03);
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
  height: 100%;
  transition: 0.2s all;

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.06),
      -5px -5px 15px rgba(0, 0, 0, 0.06);
  }
`;

export const AttributeLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.network};

  margin-bottom: auto;
`;

export const AttributeName = styled.div`
  margin-bottom: auto;
`;

export const AttributeRarity = styled.div`
  font-size: 13px;
  font-weight: 400;

  color: ${(props) => props.theme.colors.accent};
`;
