import styled from "styled-components";

export const Menu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  margin-bottom: 20px;
  grid-gap: 25px;
  overflow-x: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    justify-content: start;
    grid-gap: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-gap: 30px;
  }

  &.collection {
    margin: 25px 0 0;

    @media (min-width: ${(props) => props.theme.small_width}) {
      margin: 30px 0;
    }
  }

  &.profile {
    margin: 20px 0;

    @media (min-width: ${(props) => props.theme.small_width}) {
      margin: 30px 0;
    }
  }
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.accent};
  padding-bottom: 8px;
  transition: color 0.2s;
  flex-shrink: 0;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;
  }

  &.selected {
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};
    padding-bottom: 6px;
  }

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary};
  }

  &.edit {
    margin-left: auto;
  }
`;

export const MenuIcon = styled.div`
  display: flex;
  font-size: 15px;
  font-weight: 400;
`;
