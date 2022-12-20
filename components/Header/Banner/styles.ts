import styled from "styled-components";

export const ContainerBackground = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.networkLight};
  transition: all 0.2s;
  height: 50px;
  z-index: 9999;  
`;

export const Container = styled.div`
  display: flex;
  max-width: ${(props) => props.theme.max_width};
  margin: auto;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  padding: 0 40px;
`;

export const BannerText = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.network};

  a {
    color: ${(props) => props.theme.colors.network};
    text-decoration: underline;
  }

  a:hover {
    color: ${(props) => props.theme.colors.network};
  }

  @media (min-width: ${(props) => props.theme.small_width}) {
    font-size: 15px;

    br {
      display: none;
    }
  }
`;
