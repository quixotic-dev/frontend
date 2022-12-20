import styled from "styled-components";

export const TextTruncater = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
`;

export const NoItems = styled.div`
  padding-bottom: 150px;

  h1 {
    font-size: 18px;

    @media (min-width: ${(props) => props.theme.small_width}) {
      font-size: 20px;
    }
  }

  p {
    font-size: 15px;
  }
`;

export const PriceIcon = styled.div`
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-top: 1px;

  &.small {
    width: 10px;
    height: 10px;
  }

  &.large {
    width: 24px;
    height: 24px;
  }

  &.margin-right {
    margin-right: 3px;
  }
`;
