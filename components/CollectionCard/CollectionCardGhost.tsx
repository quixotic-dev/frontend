import {
  Card,
  CardContent,
  CardDetails,
  CollectionDescription,
  CollectionImageContainer,
  CollectionName,
  CollectionStats,
  Stat,
  StatText,
} from "./styles";

export const CollectionCardGhost = () => {
  return (
    <Card>
      <CardContent>
        <CollectionImageContainer className="ghost" />
        <CardDetails>
          <CollectionName className="ghost" />
          <CollectionDescription className="ghost" />
          <CollectionStats>
            <Stat>
              <StatText className="ghost" />
              <StatText className="ghost mini" />
            </Stat>
            <Stat className="web-only">
              <StatText className="ghost" />
              <StatText className="ghost mini" />
            </Stat>
            <Stat>
              <StatText className="ghost" />
              <StatText className="ghost mini" />
            </Stat>
            <Stat>
              <StatText className="ghost" />
              <StatText className="ghost mini" />
            </Stat>
          </CollectionStats>
        </CardDetails>
      </CardContent>
    </Card>
  );
};
