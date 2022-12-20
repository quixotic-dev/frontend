import styled from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div`
  background: ${(props) => props.theme.colors.footer};
`;

export const ContainerExtended = styled(Container)`
  color: white;

  a {
    color: white;
  }

  a:hover {
    color: white;
  }
`;

export const FooterGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 25px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 30px;
  }
`;

export const FooterRow = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 25px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    flex-direction: row;
    justify-content: space-between;
    grid-gap: 10px;
  }

  &.copyright {
    font-size: 13px;
    grid-gap: 15px;
  }
`;

export const FooterSectionGrid = styled.div`
  display: flex;
  grid-gap: 12px;
  font-size: 12px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    grid-gap: 18px;
    font-size: 13px;
  }

  &.vertical {
    flex-direction: column;
    grid-gap: 10px;

    @media (min-width: ${(props) => props.theme.small_width}) {
      grid-gap: 15px;
    }
  }

  &.socials {
    grid-gap: 10px;

    @media (min-width: ${(props) => props.theme.small_width}) {
      justify-content: right;
      grid-gap: 15px;
    }
  }
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 600;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 18px;
  }
`;

export const Description = styled.div`
  line-height: 22px;
  font-size: 14px;

  br {
    display: none;
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;

    br {
      display: block;
    }
  }
`;

export const FooterIcon = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 12px;
  background: #333333;
  font-size: 15px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 18px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Divider = styled.div`
  border: 1px solid #333333;
`;
