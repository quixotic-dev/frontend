import styled from "styled-components";

export const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 20px;
  margin-bottom: 20px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-bottom: 25px;
  }
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 22px;
    font-weight: 700;
  }
`;

export const Subtitle = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;
  font-size: 14px;
  font-weight: 400;
  width: fit-content;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 16px;
  }
`;
