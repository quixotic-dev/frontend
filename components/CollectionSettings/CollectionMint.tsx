import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchRefresehedLaunchpadCollection } from "../../api/launchpad";
import { siteConfig } from "../../shared/config";
import { State } from "../../store";
import {
  flipMintState,
  flipPremintState,
  reserveTokens,
} from "../../utils/launchpad/launchpad";
import { switchNetwork } from "../../utils/wallet";
import {
  EditorGrid,
  EditorInput,
  EditorRow,
  EditorRowDescription,
  EditorRowLabel,
  EditorRowText,
  EditorTitle,
  GenerateButton,
  LoadingRing,
  Toggle,
  ToggleContainer,
} from "../Common/Settings/styles";

export const CollectionMint = ({ collection, hostedCollection }) => {
  const address = useSelector((state: State) => state.address);

  const [reserveAmount, setReserveAmount] = useState(null);
  const [reserveAddress, setReserveAddress] = useState(null);
  const [reserveInProgress, setReserveInProgress] = useState(false);
  const [txHash, setTxHash] = useState("");

  const [updatedMintState, setUpdatedMintState] = useState(false);
  const [mintActive, setMintActive] = useState(
    hostedCollection && hostedCollection.mint_enabled ? true : false
  );
  const [premintActive, setPremintActive] = useState(
    hostedCollection && hostedCollection.premint_enabled ? true : false
  );

  const [updateInProgress, setUpdateInProgress] = useState(false);

  const handleChangeReserveAddress = (event) => {
    setReserveAddress(event.target.value.replace(/[^a-z0-9]/gi, ""));
  };

  const handleReserveMint = async () => {
    if (!reserveAmount || !reserveAddress) {
      return toast.error("Enter both a reserve amount and address");
    }

    await switchNetwork();

    const tx = await reserveTokens(
      reserveAmount,
      reserveAddress,
      collection.address
    );

    if (tx) {
      setTxHash(tx);
      setReserveInProgress(true);
    }
  };

  const handleFlipPremint = async () => {
    setUpdateInProgress(true);
    await switchNetwork();
    setPremintActive(!premintActive);

    const tx = await flipPremintState(collection.address);

    if (tx) {
      setUpdatedMintState(true);
    } else {
      setPremintActive(premintActive);
    }
    setUpdateInProgress(false);
  };

  const handleFlipMint = async () => {
    setUpdateInProgress(true);
    await switchNetwork();
    setMintActive(!mintActive);

    const tx = await flipMintState(collection.address);

    if (tx) {
      setUpdatedMintState(true);
    } else {
      setMintActive(mintActive);
    }
    setUpdateInProgress(false);
  };

  useEffect(() => {
    async function updateLaunchpadCollection(interval) {
      const updatedCollection = await fetchRefresehedLaunchpadCollection(
        collection.address
      );

      if (
        updatedCollection &&
        updatedCollection.mint_enabled == mintActive &&
        updatedCollection.premint_enabled == premintActive
      ) {
        hostedCollection.mint_enabled = updatedCollection.mint_enabled;
        hostedCollection.premint_enabled = updatedCollection.premint_enabled;
        clearInterval(interval);
        setUpdatedMintState(false);

        return toast.success("Collection mint settings updated");
      }
    }

    if (updatedMintState == true) {
      const interval = setInterval(() => {
        updateLaunchpadCollection(interval);
      }, 1000);
    }
  }, [updatedMintState]);

  return (
    <EditorGrid>
      <EditorRowText>
        <EditorTitle>Collection Minting</EditorTitle>
      </EditorRowText>

      {hostedCollection.premint && (
        <EditorRow>
          <EditorRowText>
            <EditorRowLabel>
              Allowlist Mint
              <ToggleContainer>
                {hostedCollection.premint_enabled != premintActive && (
                  <LoadingRing className="small" />
                )}
                <Toggle
                  className={hostedCollection.premint_enabled ? "checked" : ""}
                  onClick={() => {
                    !updateInProgress && handleFlipPremint();
                  }}
                />
              </ToggleContainer>
            </EditorRowLabel>
            <EditorRowDescription>
              Toggling this setting allows any wallet in the allowlist to mint
              an NFT
            </EditorRowDescription>
          </EditorRowText>
        </EditorRow>
      )}

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>
            Public Mint
            <ToggleContainer>
              {hostedCollection.mint_enabled != mintActive && (
                <LoadingRing className="small" />
              )}
              <Toggle
                className={hostedCollection.mint_enabled ? "checked" : ""}
                onClick={() => {
                  !updateInProgress && handleFlipMint();
                }}
              />
            </ToggleContainer>
          </EditorRowLabel>
          <EditorRowDescription>
            Toggling this setting allows any user to mint an NFT.{" "}
            <b>
              We strongly recommend doing an allowlist-only approach as free
              public mints are susceptible to bot minting.
            </b>
          </EditorRowDescription>
        </EditorRowText>
      </EditorRow>

      <EditorRow>
        <Link href={`/launch/${collection.address}`}>
          <a>
            <GenerateButton className="">View Mint Page</GenerateButton>
          </a>
        </Link>
      </EditorRow>

      {hostedCollection.reserve_tokens && (
        <EditorRow>
          <EditorRowText>
            <EditorRowLabel>Reserve Mint</EditorRowLabel>
            <EditorRowDescription>
              Mint reserve tokens to a specific address
            </EditorRowDescription>
          </EditorRowText>
          <EditorInput
            type="text"
            value={reserveAmount}
            placeholder="Number of tokens"
            onChange={(e) => {
              setReserveAmount(e.target.value);
            }}
          />
          <EditorInput
            type="text"
            value={reserveAddress}
            placeholder="Wallet address, e.g. 0x0977..."
            onChange={handleChangeReserveAddress}
          />
          {reserveInProgress ? (
            <a
              href={`${siteConfig.L2_BLOCK_EXPLORER_URL}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GenerateButton>View Transaction</GenerateButton>
            </a>
          ) : (
            <GenerateButton onClick={handleReserveMint}>
              Mint Tokens
            </GenerateButton>
          )}
        </EditorRow>
      )}
    </EditorGrid>
  );
};
