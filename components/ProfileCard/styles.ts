import styled from "styled-components";

export const ProfilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 12px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 20px;
  }

  .infinite-scroll-component__outerdiv {
    display: contents;
  }
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 20px;
  padding: 12px 15px 12px 12px;
  height: 100%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015), 5px 5px 15px rgba(0, 0, 0, 0.05),
    -5px -5px 15px rgba(0, 0, 0, 0.05);
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.2s;
  color: ${(props) => props.theme.colors.primary};

  @media (min-width: ${(props) => props.theme.small_width}) {
    min-width: 280px;

    &:hover {
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.015),
        5px 5px 20px rgba(0, 0, 0, 0.1), -5px -5px 20px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 15px;
`;

export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 5px;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  background: ${(props) => props.theme.colors.lightGray};
  width: 60px;
  height: 60px;
  border-radius: 52px;
  overflow: hidden;
  flex-shrink: 0;
`;

export const Name = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

export const SmallName = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.colors.accent};
`;

export const FollowIcon = styled.div`
  display: flex;
  font-size: 20px;
  padding: 10px;
  margin: -10px;
`;
