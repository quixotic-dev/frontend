import styled, { keyframes } from "styled-components";

export const NotificationsContainer = styled.div`
  padding: 18px;
  margin: -18px;

  &:hover {
    cursor: pointer;
  }
`;

export const NotificationsButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const UnreadIconKeyframes = keyframes`
  from { background: rgb(242, 17, 17, 1); }
  to { background: rgb(242, 17, 17, 0.25); }
`;

export const UnreadIcon = styled.div`
  position: absolute;
  right: 1px;
  bottom: -1px;

  &:before {
    display: block;
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.network};
    animation: ${UnreadIconKeyframes} 2s ease-in infinite alternate;
  }
`;

export const DropdownContainer = styled.div`
  position: fixed;
  width: 275px;
  margin-top: 14px;
  margin-left: -250px;
  z-index: 9999;
  background: ${(props) => props.theme.colors.secondary};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.1),
    -5px -5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: opacity 0.2s;
  opacity: 0;
  pointer-events: none;

  @media (min-width: ${(props) => props.theme.small_width}) {
    margin-top: 18px;
    margin-left: -260px;
  }

  &.visible {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const DropdownGrid = styled.div`
  display: flex;
  flex-direction: column;

  a {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const DropdownRow = styled.span`
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-gap: 10px;
  transition: all 0.2s;
  font-size: 12px;
  font-weight: 400;
  padding: 8px;

  &:hover {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
      -5px -5px 15px rgba(0, 0, 0, 0.05);
  }

  &.centered {
    display: flex;
    justify-content: space-around;
    padding: 30px 0;

    &:hover {
      box-shadow: none;
    }
  }
`;

export const TokenImageContainer = styled.div`
  display: block;
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 6px;
  overflow: hidden;
  background: ${(props) => props.theme.colors.gray};

  img {
    border-radius: 4px;
  }
`;

export const ActivityText = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 3px;
  font-weight: 500;

  b {
    font-weight: 800;
  }
`;

export const ActivityTime = styled.div`
  font-size: 11px;
  color: ${(props) => props.theme.colors.accent};
  font-weight: 400;
`;
