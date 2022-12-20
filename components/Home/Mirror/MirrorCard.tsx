import Link from "next/link";
import { CollectionImage } from "../../Common/Images/CollectionImage";
import { Card } from "./styles";

export const MirrorCard = ({ collection }) => {
  return (
    <Link
      href={`/collection/${
        collection.slug ? collection.slug : collection.address
      }`}
      passHref
    >
      <a>
        <Card>
          <CollectionImage collection={collection} />
        </Card>
      </a>
    </Link>
  );
};
