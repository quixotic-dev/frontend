import Link from "next/link";
import { useEffect, useState } from "react";
import { BsCollectionFill } from "react-icons/bs";
import {
  FaChartLine,
  FaCog,
  FaCompass,
  FaHeart,
  FaMoneyCheckAlt,
  FaMoon,
  FaPencilRuler,
  FaUser,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoMdPricetags } from "react-icons/io";
import { MdAccountBalanceWallet, MdPriceChange } from "react-icons/md";
import { TbBuildingBridge } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileBalance } from "../../../api/profile";
import { siteConfig } from "../../../shared/config";
import { State } from "../../../store";
import { updateBalance } from "../../../store/balance";
import { updateLogin } from "../../../store/login";
import { updateOnboard } from "../../../store/onboard";
import { disconnectWallet } from "../../../utils/wallet";
import { ProfileImage } from "../../Common/Images/ProfileImage";
import {
  AccountDropdownButton,
  AccountSignInButton,
  DropdownContainer,
  DropdownGrid,
  DropdownRow,
  MobileButton,
  MobileNav,
  MobileNavButtonBar,
  RowContent,
  RowIcon,
  Toggle,
  ToggleContainer,
  WalletAddress,
  WalletBalance,
  WalletInfo,
  WebButton,
} from "./styles";

export const AccountButton = ({ theme, toggleTheme, toggleShowUSD }) => {
  const dispatch = useDispatch();

  const profile = useSelector((state: State) => state.profile);
  const address = useSelector((state: State) => state.address);
  const balances = useSelector((state: State) => state.balance);
  const showUSD = useSelector((state: State) => state.showUSD);

  const [displayDropdown, setDisplayDropdown] = useState(false);

  const handleClickLogout = async () => {
    await disconnectWallet(dispatch);
    updateLogin(false, dispatch);
    setDisplayDropdown(false);
  };

  useEffect(() => {
    const fetchWalletBalance = async () => {
      const balances = await fetchProfileBalance(address);
      updateBalance(balances, dispatch);
    };

    if (address && displayDropdown) {
      fetchWalletBalance();
    }
  }, [displayDropdown, address]);

  return (
    <div onMouseLeave={() => setDisplayDropdown(address && false)}>
      <WebButton onMouseOver={() => setDisplayDropdown(address && true)}>
        {address ? (
          <Link href="/profile">
            <AccountDropdownButton>
              {profile && <ProfileImage profile={profile} />}
            </AccountDropdownButton>
          </Link>
        ) : (
          <AccountSignInButton
            onClick={() => {
              updateLogin(true, dispatch);
            }}
          >
            Connect
          </AccountSignInButton>
        )}
      </WebButton>

      <MobileButton
        onClick={() => {
          setDisplayDropdown(!displayDropdown);
        }}
      >
        {address ? (
          <AccountDropdownButton>
            {profile && <ProfileImage profile={profile} />}
          </AccountDropdownButton>
        ) : (
          <div>
            <MobileNavButtonBar className={displayDropdown ? "bar1" : null} />
            <MobileNavButtonBar className={displayDropdown ? "bar2" : null} />
            <MobileNavButtonBar className={displayDropdown ? "bar3" : null} />
          </div>
        )}
      </MobileButton>

      <DropdownContainer className={displayDropdown ? "visible" : null}>
        <DropdownGrid>
          <MobileNav>
            <Link href="/explore" passHref>
              <a onClick={() => setDisplayDropdown(false)}>
                <DropdownRow className="link">
                  <RowContent className="link">
                    <RowIcon>
                      <FaCompass />
                    </RowIcon>
                    Explore
                  </RowContent>
                </DropdownRow>
              </a>
            </Link>

            <Link href="/stats" passHref>
              <a onClick={() => setDisplayDropdown(false)}>
                <DropdownRow className="link">
                  <RowContent className="link">
                    <RowIcon>
                      <FaChartLine />
                    </RowIcon>
                    Stats
                  </RowContent>
                </DropdownRow>
              </a>
            </Link>

            <Link href="/bridge" passHref>
              <a onClick={() => setDisplayDropdown(false)}>
                <DropdownRow className="link">
                  <RowContent className="link">
                    <RowIcon>
                      <TbBuildingBridge />
                    </RowIcon>
                    Bridge
                  </RowContent>
                </DropdownRow>
              </a>
            </Link>

            <Link href="/launch" passHref>
              <a onClick={() => setDisplayDropdown(false)}>
                <DropdownRow className="link">
                  <RowContent className="link">
                    <RowIcon>
                      <FaPencilRuler />
                    </RowIcon>
                    Launch
                  </RowContent>
                </DropdownRow>
              </a>
            </Link>
          </MobileNav>

          {address && (
            <>
              <Link href="/profile" passHref>
                <a onClick={() => setDisplayDropdown(false)}>
                  <DropdownRow className="link mobile-border">
                    <RowContent>
                      <RowIcon>
                        <FaUser />
                      </RowIcon>
                      My NFTs
                    </RowContent>
                  </DropdownRow>
                </a>
              </Link>
              <Link href="/profile?tab=1" passHref>
                <a onClick={() => setDisplayDropdown(false)}>
                  <DropdownRow className="link">
                    <RowContent>
                      <RowIcon>
                        <FaHeart />
                      </RowIcon>
                      Favorites
                    </RowContent>
                  </DropdownRow>
                </a>
              </Link>
              <Link href="/collections" passHref>
                <a onClick={() => setDisplayDropdown(false)}>
                  <DropdownRow className="link">
                    <RowContent>
                      <RowIcon>
                        <BsCollectionFill />
                      </RowIcon>
                      Collections
                    </RowContent>
                  </DropdownRow>
                </a>
              </Link>
              <Link href="/listings" passHref>
                <a onClick={() => setDisplayDropdown(false)}>
                  <DropdownRow className="link">
                    <RowContent>
                      <RowIcon>
                        <IoMdPricetags />
                      </RowIcon>
                      Listings
                    </RowContent>
                  </DropdownRow>
                </a>
              </Link>
              <Link href="/offers" passHref>
                <a onClick={() => setDisplayDropdown(false)}>
                  <DropdownRow className="link">
                    <RowContent>
                      <RowIcon>
                        <MdPriceChange />
                      </RowIcon>
                      Offers
                    </RowContent>
                  </DropdownRow>
                </a>
              </Link>
              <Link href="/settings" passHref>
                <a onClick={() => setDisplayDropdown(false)}>
                  <DropdownRow className="link">
                    <RowContent>
                      <RowIcon>
                        <FaCog />
                      </RowIcon>
                      Settings
                    </RowContent>
                  </DropdownRow>
                </a>
              </Link>
            </>
          )}
          <DropdownRow>
            <ToggleContainer>
              <RowContent>
                <RowIcon>
                  <FaMoon />
                </RowIcon>
                Dark Mode
              </RowContent>
              <Toggle
                className={theme == "dark" ? "checked" : ""}
                onClick={toggleTheme}
              />
            </ToggleContainer>
          </DropdownRow>
          <DropdownRow>
            <ToggleContainer>
              <RowContent>
                <RowIcon>
                  <FaMoneyCheckAlt />
                </RowIcon>
                Show USD
              </RowContent>
              <Toggle
                className={showUSD ? "checked" : ""}
                onClick={() => toggleShowUSD(!showUSD)}
              />
            </ToggleContainer>
          </DropdownRow>

          {address && (
            <DropdownRow className="link">
              <RowContent
                onClick={() => {
                  handleClickLogout();
                }}
              >
                <RowIcon>
                  <FiLogOut />
                </RowIcon>
                Log Out
              </RowContent>
            </DropdownRow>
          )}

          {!address && (
            <DropdownRow className="connect-button">
              <AccountSignInButton
                onClick={() => {
                  updateLogin(true, dispatch);
                }}
              >
                Connect
              </AccountSignInButton>
            </DropdownRow>
          )}

          {address && (
            <>
              <Link href="/profile" passHref>
                <a onClick={() => setDisplayDropdown(false)}>
                  <WalletInfo>
                    <RowContent>
                      <RowIcon>
                        <MdAccountBalanceWallet />
                      </RowIcon>
                      <div>
                        <WalletAddress>
                          {address.slice(0, 5)}
                          {"..."}
                          {address.slice(-5)}
                        </WalletAddress>
                        {balances && (
                          <WalletBalance>
                            {Number(balances.ETH).toFixed(2)} ETH |{" "}
                            {Number(balances.WETH).toFixed(2)} WETH
                          </WalletBalance>
                        )}
                      </div>
                    </RowContent>
                  </WalletInfo>
                </a>
              </Link>
              <WalletInfo
                className="fund"
                onClick={() => {
                  setDisplayDropdown(false);
                  updateOnboard(true, dispatch);
                }}
              >
                Add Funds
              </WalletInfo>
            </>
          )}
        </DropdownGrid>
      </DropdownContainer>
    </div>
  );
};
