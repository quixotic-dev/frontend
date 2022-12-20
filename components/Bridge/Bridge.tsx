import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { MdInfo } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { ModalProvider } from "styled-react-modal";
import Web3 from "web3";
import {
  fetchL1Token,
  fetchL2Token,
  fetchTokenMetadata,
  initiateL1Contract,
} from "../../api/bridge";
import { siteConfig } from "../../shared/config";
import { State } from "../../store";
import { updateLogin } from "../../store/login";
import { AssetCardBridge } from "../AssetCard/AssetCardBridge";
import { AssetCardGhost } from "../AssetCard/AssetCardGhost";
import { LoadingRing } from "../Common/Settings/styles";
import { ModalBackground } from "../Common/StyledModal/styles";
import { TextTruncater } from "../Common/styles";
import { DepositModal } from "./DepositModal";
import {
  Arrow,
  AssetCardContainer,
  BridgeButton,
  BridgeButtonContainer,
  BridgeButtonContentGrid,
  BridgeContainer,
  BridgeGrid,
  ContainerBackground,
  ContainerExtended,
  ContractRequest,
  InfoIcon,
  Network,
  NetworkContainer,
  NetworkDropdown,
  NetworkDropdownRow,
  NetworkImage,
  NetworkLabel,
  NetworkName,
  TextInput,
  TextInputContainer,
  TextInputGrid,
  Title,
  TokenInfo,
  TokenInfoGrid,
  TokenInfoRow,
  TokenSection,
  TokenSectionBackground,
} from "./styles";
import { WithdrawModal } from "./WithdrawModal";

export const Bridge = ({ network, collection, token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const address = useSelector((state: State) => state.address);

  const [inputtedAddress, setInputtedAddress] = useState(
    collection ? collection : ""
  );
  const [fetchedAddress, setFetchedAddress] = useState(null);

  const [validContractAddress, setValidContractAddress] = useState(false);
  const [tokenId, setTokenId] = useState(token ? token : "");
  const [tokenMetadata, setTokenMetadata] = useState(null);

  // 0 = Default state
  // 1 = Invalid token
  // 2 = Not the owner
  // 3 = Already bridged
  // 4 = Withdraw started
  const [tokenState, setTokenState] = useState(0);

  const [fromL1, setFromL1] = useState(network == "optimism" ? false : true);
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);

  // 0 = Default state
  // 1 = Deploy pending
  // 2 = Error deploying
  const [deployState, setDeployState] = useState(0);
  const enableBridging = async () => {
    if (deployState == 0) {
      try {
        Web3.utils.toChecksumAddress(inputtedAddress);
      } catch (e) {
        return toast.error("Invaliid contract address");
      }

      if (
        ["0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85"].includes(
          Web3.utils.toChecksumAddress(inputtedAddress)
        )
      ) {
        setDeployState(2);
        return;
      }

      setDeployState(1);
      const status = await initiateL1Contract(inputtedAddress);

      if (status == 200) {
        setDeployState(0);
        fetchAltAddress();
      } else {
        setDeployState(2);
      }
    }
  };

  //Update url path
  useEffect(() => {
    try {
      Web3.utils.toChecksumAddress(inputtedAddress);
      router.query.address = inputtedAddress;
      router.query.token_id = tokenId;
      fromL1
        ? (router.query.network = "ethereum")
        : (router.query.network = "optimism");
      router.push(router, undefined, { shallow: true, scroll: false });
    } catch (e) {}
  }, [fromL1, inputtedAddress, tokenId]);

  // Fetch token metadata
  useEffect(() => {
    const fetchMetadata = async () => {
      const res = await fetchTokenMetadata(
        inputtedAddress,
        tokenId,
        fromL1 ? "l1" : "l2"
      );

      if (res) {
        setTokenMetadata(res);
        if (
          (!fromL1 &&
            res.bridge_txn &&
            res.token_owner == "0x0000000000000000000000000000000000000000") ||
          (fromL1 &&
            res.bridge_txn &&
            (res.token_owner == "0x8DD330DdE8D9898d43b4dc840Da27A07dF91b3c9" ||
              res.token_owner == "0x5a7749f83b81B301cAb5f48EB8516B986DAef23D"))
        ) {
          setTokenState(4);
        } else if (
          (fromL1 &&
            (res.token_owner == "0x8DD330DdE8D9898d43b4dc840Da27A07dF91b3c9" ||
              res.token_owner ==
                "0x5a7749f83b81B301cAb5f48EB8516B986DAef23D")) ||
          (!fromL1 &&
            res.token_owner == "0x0000000000000000000000000000000000000000")
        ) {
          setTokenState(3);
        } else if (address && res.token_owner != address) {
          setTokenState(2);
        }
      } else {
        setTokenState(1);
      }
    };

    setTokenState(0);
    setTokenMetadata(null);

    try {
      Web3.utils.toChecksumAddress(inputtedAddress);
      if (tokenId) {
        fetchMetadata();
      }
    } catch (e) {}
  }, [fromL1, address, inputtedAddress, tokenId]);

  const fetchAltAddress = async () => {
    let addressRes;
    if (fromL1) {
      addressRes = await fetchL2Token(inputtedAddress);
    } else {
      addressRes = await fetchL1Token(inputtedAddress);
    }

    if (addressRes) {
      setFetchedAddress(addressRes.address);
    }
  };

  // Fetch bridged address
  useEffect(() => {
    try {
      Web3.utils.toChecksumAddress(inputtedAddress);
      setValidContractAddress(true);
      setFetchedAddress(null);
      fetchAltAddress();
    } catch (e) {
      setValidContractAddress(false);
    }
  }, [inputtedAddress]);

  return (
    <ModalProvider backgroundComponent={ModalBackground}>
      <ContainerBackground>
        <ContainerExtended>
          <BridgeContainer>
            <Title>Optimism NFT Bridge</Title>
            <BridgeGrid>
              <TokenSection>
                <NetworkContainer
                  onMouseLeave={() => setShowNetworkDropdown(false)}
                >
                  <NetworkLabel>From</NetworkLabel>
                  <Network
                    className="dropdown"
                    onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                  >
                    <NetworkImage>
                      <Image
                        src={
                          fromL1
                            ? "/bridge/network_eth.png"
                            : "/bridge/network_op.png"
                        }
                        layout="responsive"
                        objectFit="contain"
                        objectPosition="center"
                        width={50}
                        height={50}
                      />
                    </NetworkImage>
                    <NetworkName>
                      <TextTruncater>
                        {fromL1 ? "Ethereum" : "Optimism"}
                        {siteConfig.NETWORK == "opt-goerli" && " Goerli"}
                      </TextTruncater>
                    </NetworkName>
                    <FiChevronDown />
                  </Network>

                  <NetworkDropdown
                    className={showNetworkDropdown ? "visible" : "hidden"}
                    onClick={() => setShowNetworkDropdown(false)}
                  >
                    <NetworkDropdownRow
                      className={fromL1 ? "selected" : null}
                      onClick={() => {
                        setFromL1(true);
                      }}
                    >
                      <NetworkImage>
                        <Image
                          src={"/bridge/network_eth.png"}
                          layout="responsive"
                          objectFit="contain"
                          objectPosition="center"
                          width={50}
                          height={50}
                        />
                      </NetworkImage>
                      <NetworkName>
                        Ethereum
                        {siteConfig.NETWORK == "opt-goerli" && " Goerli"}
                      </NetworkName>
                    </NetworkDropdownRow>
                    <NetworkDropdownRow
                      className={!fromL1 ? "selected" : null}
                      onClick={() => {
                        setFromL1(false);
                      }}
                    >
                      <NetworkImage>
                        <Image
                          src={"/bridge/network_op.png"}
                          layout="responsive"
                          objectFit="contain"
                          objectPosition="center"
                          width={50}
                          height={50}
                        />
                      </NetworkImage>
                      <NetworkName>
                        Optimism
                        {siteConfig.NETWORK == "opt-goerli" && " Goerli"}
                      </NetworkName>
                    </NetworkDropdownRow>
                  </NetworkDropdown>
                </NetworkContainer>
                <TextInputGrid>
                  <TextInputContainer>
                    Contract Address
                    <TextInput
                      id="inputtedAddress"
                      name="inputtedAddress"
                      value={inputtedAddress}
                      onChange={(e) => {
                        setInputtedAddress(e.target.value);
                      }}
                    />
                  </TextInputContainer>
                  <TextInputContainer>
                    Token ID
                    <DebounceInput
                      element={TextInput}
                      minLength={1}
                      debounceTimeout={300}
                      value={tokenId}
                      onChange={(e) => {
                        setTokenId(e.target.value);
                      }}
                    />
                  </TextInputContainer>
                </TextInputGrid>
                {tokenMetadata && (
                  <TokenInfoGrid>
                    {tokenMetadata.contract_name && (
                      <TokenInfoRow>
                        <TokenInfo className="title">Contract Name</TokenInfo>
                        <TokenInfo>{tokenMetadata.contract_name}</TokenInfo>
                      </TokenInfoRow>
                    )}

                    <TokenInfoRow>
                      <TokenInfo className="title">
                        {fromL1 ? "Ethereum" : "Optimism"} Address
                      </TokenInfo>
                      <TokenInfo>
                        <a
                          href={`${
                            fromL1
                              ? siteConfig.L1_BLOCK_EXPLORER_URL
                              : siteConfig.L2_BLOCK_EXPLORER_URL
                          }/address/${inputtedAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {inputtedAddress.slice(0, 6)}...
                          {inputtedAddress.slice(-6)}
                        </a>
                      </TokenInfo>
                    </TokenInfoRow>

                    <TokenInfoRow>
                      <TokenInfo className="title">Token ID</TokenInfo>
                      <TokenInfo>
                        <a
                          href={`${
                            fromL1
                              ? siteConfig.L1_BLOCK_EXPLORER_URL
                              : siteConfig.L2_BLOCK_EXPLORER_URL
                          }/address/${inputtedAddress}?a=${tokenId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {tokenId}
                        </a>
                      </TokenInfo>
                    </TokenInfoRow>

                    {fetchedAddress && (
                      <TokenInfoRow>
                        <TokenInfo className="title">
                          {fromL1 ? "Optimism" : "Ethereum"} Address
                        </TokenInfo>
                        <TokenInfo>
                          <a
                            href={`${
                              fromL1
                                ? siteConfig.L2_BLOCK_EXPLORER_URL
                                : siteConfig.L1_BLOCK_EXPLORER_URL
                            }/address/${fetchedAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {fetchedAddress.slice(0, 6)}...
                            {fetchedAddress.slice(-6)}
                          </a>
                        </TokenInfo>
                      </TokenInfoRow>
                    )}

                    {fromL1 && (
                      <TokenInfoRow>
                        <TokenInfo className="title">Bridge Time</TokenInfo>
                        <TokenInfo>
                          est.{" "}
                          {siteConfig.NETWORK == "opt-goerli"
                            ? "5 minutes"
                            : "15 minutes"}{" "}
                        </TokenInfo>
                      </TokenInfoRow>
                    )}
                    <TokenInfoRow>
                      <TokenInfo className="title">Withdrawal Time</TokenInfo>
                      <TokenInfo className="withdrawal">
                        {siteConfig.NETWORK == "opt-goerli"
                          ? "5 minutes"
                          : "7 days"}{" "}
                        <InfoIcon data-tip data-for="bridge-time">
                          <MdInfo />
                        </InfoIcon>
                        <ReactTooltip
                          id="bridge-time"
                          type="info"
                          effect="solid"
                          className="tooltip"
                          backgroundColor="#1C1C1D"
                        >
                          Bridged assets take{" "}
                          {siteConfig.NETWORK == "opt-goerli"
                            ? "5 minutes"
                            : "7 days"}{" "}
                          to withdraw back to Ethereum
                        </ReactTooltip>
                      </TokenInfo>
                    </TokenInfoRow>
                  </TokenInfoGrid>
                )}
              </TokenSection>

              <Arrow className="down">
                <FaArrowDown />
              </Arrow>

              <Arrow className="right">
                <FaArrowRight />
              </Arrow>

              <TokenSection className="bg">
                {tokenMetadata && tokenMetadata.token_image && (
                  <TokenSectionBackground src={tokenMetadata.token_image} />
                )}
                {(!fromL1 || tokenState != 4) && (
                  <>
                    <NetworkContainer className="to">
                      <NetworkLabel>To</NetworkLabel>
                      <Network>
                        <NetworkImage>
                          <Image
                            src={
                              fromL1
                                ? "/bridge/network_op.png"
                                : "/bridge/network_eth.png"
                            }
                            layout="responsive"
                            objectFit="contain"
                            objectPosition="center"
                            width={50}
                            height={50}
                          />
                        </NetworkImage>
                        <NetworkName>
                          {fromL1 ? "Optimism" : "Ethereum"}
                          {siteConfig.NETWORK == "opt-goerli" && " Goerli"}
                        </NetworkName>
                      </Network>
                    </NetworkContainer>
                  </>
                )}
                {tokenMetadata ? (
                  <AssetCardContainer>
                    <AssetCardBridge token={tokenMetadata} />
                  </AssetCardContainer>
                ) : (
                  <AssetCardContainer>
                    <AssetCardGhost />
                  </AssetCardContainer>
                )}
              </TokenSection>
            </BridgeGrid>
            <BridgeButtonContainer>
              {!address ? (
                <BridgeButton
                  onClick={() => {
                    updateLogin(true, dispatch);
                  }}
                >
                  Connect Wallet
                </BridgeButton>
              ) : tokenState == 1 ? (
                <BridgeButton className="disabled">
                  Token not found
                </BridgeButton>
              ) : tokenState == 3 ? (
                <BridgeButton className="disabled">
                  Token already bridged
                </BridgeButton>
              ) : tokenState == 4 ? (
                <WithdrawModal
                  l1Address={fromL1 ? inputtedAddress : fetchedAddress}
                  l2Address={fromL1 ? fetchedAddress : inputtedAddress}
                  tokenId={tokenId}
                  bridgeTxn={tokenMetadata.bridge_txn}
                  timestamp={tokenMetadata.bridge_txn_timestamp}
                />
              ) : tokenState == 2 ? (
                <BridgeButton className="disabled">Not your token</BridgeButton>
              ) : !validContractAddress ? (
                <BridgeButton className="disabled">
                  Enter a valid contract address
                </BridgeButton>
              ) : !tokenId ? (
                <BridgeButton className="disabled">
                  Enter the token ID
                </BridgeButton>
              ) : !tokenMetadata ? (
                <BridgeButton className="disabled">Loading...</BridgeButton>
              ) : !fetchedAddress ? (
                fromL1 ? (
                  deployState == 0 ? (
                    <BridgeButton className="dark" onClick={enableBridging}>
                      <BridgeButtonContentGrid>
                        Enable Collection for Bridging
                      </BridgeButtonContentGrid>
                    </BridgeButton>
                  ) : deployState == 1 ? (
                    <BridgeButton className="muted disabled">
                      <BridgeButtonContentGrid>
                        <LoadingRing className="small" />
                        Enabling Collection for Bridging
                      </BridgeButtonContentGrid>
                    </BridgeButton>
                  ) : (
                    deployState == 2 && (
                      <>
                        <BridgeButton className="muted disabled">
                          <BridgeButtonContentGrid>
                            Error Enabling Collection for Bridging
                          </BridgeButtonContentGrid>
                        </BridgeButton>
                        <ContractRequest>
                          <a
                            href="https://forms.gle/qqosWk8T34vUMGV1A"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Manually Request Collection
                          </a>
                        </ContractRequest>
                      </>
                    )
                  )
                ) : (
                  <BridgeButton className="disabled">
                    Collection Not Eligible
                  </BridgeButton>
                )
              ) : fromL1 ? (
                <DepositModal
                  l1Address={fromL1 ? inputtedAddress : fetchedAddress}
                  l2Address={fromL1 ? fetchedAddress : inputtedAddress}
                  tokenId={tokenId}
                />
              ) : (
                <WithdrawModal
                  l1Address={fromL1 ? inputtedAddress : fetchedAddress}
                  l2Address={fromL1 ? fetchedAddress : inputtedAddress}
                  tokenId={tokenId}
                />
              )}
            </BridgeButtonContainer>
          </BridgeContainer>
        </ContainerExtended>
      </ContainerBackground>
    </ModalProvider>
  );
};
