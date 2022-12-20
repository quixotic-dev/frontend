import Link from "next/link";
import { TbBuildingBridge } from "react-icons/tb";
import { Button, ButtonText } from "./styles";

export const BridgeButton = ({ token }) => {
  return (
    <div>
      <Link
        href={`/bridge?address=${token.contract_address}&token_id=${
          token.token_id
        }${token.bridged ? "&network=optimism" : ""}`}
      >
        <Button>
          <ButtonText>
            <TbBuildingBridge />
            {token.pending_owner &&
            token.owner &&
            (token.owner.address ==
              "0x8DD330DdE8D9898d43b4dc840Da27A07dF91b3c9" ||
              token.owner.address ==
                "0x5a7749f83b81B301cAb5f48EB8516B986DAef23D")
              ? "Finalize Withdrawal"
              : token.bridged
              ? "Withdraw NFT"
              : "Bridge NFT"}
          </ButtonText>
        </Button>
      </Link>
    </div>
  );
};
