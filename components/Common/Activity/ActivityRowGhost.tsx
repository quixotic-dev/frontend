import {
  ActivityGridMobileRow,
  ActivityGridRow,
  ActivityInfo,
  ActivityText,
  CollectionName,
  DateContainer,
  TokenImageContainer,
  TokenName,
} from "./styles";

export const ActivityRowGhost = () => {
  return (
    <ActivityGridRow className="ghost">
      <ActivityInfo className="ghost" />
      <ActivityGridMobileRow>
        <ActivityInfo className="item">
          <TokenImageContainer className="ghost" />
          <ActivityText>
            <CollectionName className="ghost" />
            <TokenName className="ghost" />
          </ActivityText>
        </ActivityInfo>
        <ActivityInfo className="ghost" />
      </ActivityGridMobileRow>
      <ActivityGridMobileRow className="bottom">
        <ActivityInfo className="ghost" />
        <ActivityInfo className="ghost" />
        <DateContainer>
          <ActivityInfo className="ghost" />
        </DateContainer>
      </ActivityGridMobileRow>
    </ActivityGridRow>
  );
};
