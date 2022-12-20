import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { State } from "../../store";
import { deployLaunchpadContract } from "../../utils/launchpad/launchpad";
import { switchNetwork } from "../../utils/wallet";
import { Button } from "../Asset/AssetButtons/styles";
import {
  EditorInput,
  EditorRow,
  EditorRowDescription,
  EditorRowLabel,
} from "../Common/Settings/styles";
import {
  ContainerExtended,
  Editor,
  EditorDescription,
  EditorTitle,
  EditorTitleContainer,
  GuideButton,
  LoadingRing,
  Toggle,
} from "./styles";

export const LaunchpadDeploy = () => {
  const router = useRouter();
  const address = useSelector((state: State) => state.address);

  const [deployPending, setDeployPending] = useState(false);

  const [premintEnabled, setPremintEnabled] = useState(true);
  const [freeMint, setFreeMint] = useState(true);

  const [name, setName] = useState(null);
  const [symbol, setSymbol] = useState(null);
  const [supply, setSupply] = useState(null);
  const [premintPrice, setPremintPrice] = useState(null);
  const [mintPrice, setMintPrice] = useState(null);
  const [premintMax, setPremintMax] = useState(null);
  const [mintMax, setMintMax] = useState(null);
  const [reserveTokens, setReserveTokens] = useState(null);

  const handleChangeName = (event) => {
    setName(event.target.value.replace(/[^a-zA-Z0-9 ]/g, ""));
  };

  const handleChangeSymbol = (event) => {
    setSymbol(event.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10));
  };

  const handleChangeInteger = (set) => (event) => {
    if (event.target.value == "") {
      set(event.target.value);
    } else if (!isNaN(event.target.value) && event.target.value > 0) {
      set(parseInt(event.target.value));
    }
  };

  const handleChangePrice = (set) => (event) => {
    if (!isNaN(event.target.value)) {
      set(event.target.value);
    }
  };

  const handleClickSave = async () => {
    if (!name) {
      return toast.error("Please enter a collection name");
    } else if (!symbol) {
      return toast.error("Please enter a collection symbol");
    } else if (!supply) {
      return toast.error("Please enter the total supply");
    } else if (!freeMint && !mintPrice) {
      return toast.error("Please enter a mint price");
    } else if (!mintMax) {
      return toast.error("Please enter the max tokens allowed per address");
    } else if (premintEnabled && !premintMax) {
      return toast.error("Please enter the max tokens allowed per address");
    } else if (supply > 10000) {
      return toast.error("Max supply is 10,000 tokens");
    }

    setDeployPending(true);

    await switchNetwork();

    const contract = await deployLaunchpadContract({
      name: name,
      symbol: symbol,
      supply: supply,
      premintPrice: premintEnabled ? (freeMint ? "0" : premintPrice) : null,
      premintMax: premintEnabled ? premintMax : null,
      mintPrice: freeMint ? "0" : mintPrice,
      mintMax: mintMax,
      reserveTokens: reserveTokens ? reserveTokens : null,
    });

    if (contract) {
      await contract.deployTransaction.wait();
      await new Promise((r) => setTimeout(r, 5000)); // Sleep to help fix race conditions
      router.push(`/collection/${contract.address}/settings`);
    } else {
      setDeployPending(false);
    }
  };

  return (
    <ContainerExtended>
      <Editor>
        <EditorTitleContainer>
          <EditorTitle>Quix Launchpad</EditorTitle>
          <EditorDescription>
            Deploy your own ERC-721 smart contract and manage collection
            settings, minting, metadata, and allowlist on Quix.
            <br />
            <br />
            Launchpad collections must use completely original artwork.
            Derivative collections will be delisted even after mint.
            <a
              href="https://help.qx.app/en/articles/6382199-how-does-the-launchpad-work"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GuideButton>Launchpad Guide</GuideButton>
            </a>
          </EditorDescription>
        </EditorTitleContainer>

        <EditorRow>
          <EditorRowLabel>Name</EditorRowLabel>
          <EditorInput
            type="text"
            value={name}
            placeholder="Enter a name for the collection"
            onChange={handleChangeName}
            disabled={deployPending}
          />
        </EditorRow>
        <EditorRow>
          <EditorRowLabel>Symbol</EditorRowLabel>
          <EditorInput
            type="text"
            value={symbol}
            placeholder="Enter a symbol for the collection, e.g. OPNFT"
            onChange={handleChangeSymbol}
            disabled={deployPending}
          />
        </EditorRow>
        <EditorRow>
          <EditorRowLabel>Supply</EditorRowLabel>
          <EditorInput
            type="text"
            value={supply}
            placeholder="Set the max tokens for the collection"
            onChange={handleChangeInteger(setSupply)}
            disabled={deployPending}
          />
        </EditorRow>

        <EditorRow>
          <EditorRowLabel>
            Allowlist mint
            {/* <Toggle
              className={premintEnabled ? "checked" : ""}
              onClick={() => {
                setPremintEnabled(!premintEnabled);
              }}
            /> */}
          </EditorRowLabel>
          {premintEnabled && (
            <EditorInput
              type="text"
              value={premintMax}
              placeholder="Set the max tokens allowed per wallet"
              onChange={handleChangeInteger(setPremintMax)}
              disabled={deployPending}
            />
          )}
        </EditorRow>

        <EditorRow>
          <EditorRowLabel>Public mint</EditorRowLabel>
          <EditorInput
            type="text"
            value={mintMax}
            placeholder="Set the max tokens allowed per wallet"
            onChange={handleChangeInteger(setMintMax)}
            disabled={deployPending}
          />
        </EditorRow>

        <EditorRow>
          <EditorRowLabel>
            Free mint
            <Toggle
              className={freeMint ? "checked" : ""}
              // onClick={() => {
              //   deployPending ? null : setFreeMint(!freeMint);
              // }}
            />
          </EditorRowLabel>
          <EditorRowDescription>
            Quix Launchpad currently only supports free-to-mint projects
          </EditorRowDescription>

          {!freeMint && (
            <>
              <EditorRowDescription>
                Enter the mint price per token
              </EditorRowDescription>
              <EditorInput
                type="text"
                value={mintPrice}
                onChange={handleChangePrice(setMintPrice)}
                disabled={deployPending}
              />
            </>
          )}
        </EditorRow>

        <EditorRow>
          <EditorRowLabel>
            Reserve tokens
            <Toggle
              className={reserveTokens ? "checked" : ""}
              disabled={deployPending}
              onClick={() => {
                deployPending ? null : setReserveTokens(!reserveTokens);
              }}
            />
          </EditorRowLabel>
          <EditorRowDescription>
            Allow the contract owner to mint a token reserve seperate from the
            allowlist mint
          </EditorRowDescription>
        </EditorRow>

        <Button
          className={deployPending ? "muted" : null}
          onClick={!deployPending ? handleClickSave : null}
        >
          {deployPending && <LoadingRing className="small" />}
          Deploy Contract
        </Button>
      </Editor>
    </ContainerExtended>
  );
};
