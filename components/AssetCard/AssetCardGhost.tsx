import {
  AssetName,
  Card,
  CardContent,
  CardSection,
  CollectionName,
  TokenImageContainer,
} from "./styles";

export const AssetCardGhost = () => {
  return (
    <Card className="ghost">
      <TokenImageContainer className="ghost"></TokenImageContainer>
      <CardContent>
        <CardSection className="ghost">
          <CollectionName className="ghost"> </CollectionName>
          <AssetName className="ghost"> </AssetName>
        </CardSection>
      </CardContent>
    </Card>
  );
};
