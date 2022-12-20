import styled from "styled-components";
import { Container } from "../Common/Container/styles";

export const ContainerBackground = styled.div`
  overflow: hidden;

  .tooltip {
    display: none;

    @media (min-width: ${(props) => props.theme.small_width}) {
      display: block;
    }
  }
`;

export const ContainerExtended = styled(Container)`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
  max-width: 650px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    max-width: 690px;
  }

  @media (min-width: ${(props) => props.theme.medium_width}) {
    max-width: ${(props) => props.theme.max_width};
    grid-gap: 20px;
    padding-bottom: 60px;
  }

  .tooltip {
    max-width: 250px;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
  }
`;

export const TwoColGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 15px;
  align-items: start;
  position: relative;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-template-columns: 1fr 1.3fr;
    grid-gap: 40px;
  }
`;

export const Divider = styled.div`
  border-left: 0.5px solid rgba(0, 0, 0, 0.15);
  height: auto;
  margin: 0 2rem;
`;

export const AssetDetailsGrid = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
  font-size: 15px;

  @media (min-width: ${(props) => props.theme.medium_width}) {
    grid-gap: 20px;
  }
`;

export const Section = styled.div`
  border: 1px solid ${(props) => props.theme.colors.gray}99;
  border-radius: 12px;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  padding: 15px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 20px;
    font-size: 16px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const SectionTitleText = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
`;

export const SectionContent = styled.div`
  padding: 0 15px 15px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 0 20px 20px;
  }

  &.asset-activity {
    max-height: 250px;
    overflow: auto;
    padding: 0;
  }

  &.offers {
    max-width: calc(100vw - 40px);
    max-height: 165px;
    overflow: auto;

    @media (min-width: ${(props) => props.theme.small_width}) {
      max-width: auto;
    }
  }
`;

export const SectionNoData = styled.div`
  text-align: center;
  padding: 30px;

  @media (min-width: ${(props) => props.theme.small_width}) {
    padding: 40px;
  }
`;
