import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider } from "styled-react-modal";
import { fetchSiteBanner } from "../../api/banner";
import { siteConfig } from "../../shared/config";
import { State } from "../../store";
import { updateBanner } from "../../store/banner";
import { updateGridLayout } from "../../store/gridLayout";
import { updateShowUSD } from "../../store/showUSD";
import { ModalBackground } from "../Common/StyledModal/styles";
import { LoginModal } from "../LoginModal/LoginModal";
import { OnboardModal } from "../OnboardModal/OnboardModal";
import { AccountButton } from "./AccountButton/AccountButton";
import { Banner } from "./Banner/Banner";
import { Notifications } from "./Notifications/Notifications";
import { Search } from "./Search/Search";
import {
  CartCount,
  CenterNav,
  ContainerBackground,
  ContainerExtended,
  Logo,
  LogoBadge,
  MobileNavSection,
  Nav,
  NavElement,
  NavIcon,
  RightNav,
} from "./styles";

export const Header = ({ theme, toggleTheme }) => {
  const dispatch = useDispatch();

  const address = useSelector((state: State) => state.address);

  const router = useRouter();
  const currentPage = router.pathname.split("/")[1];

  const [scrolled, setScrolled] = useState(currentPage == "" ? false : true);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCartCount(
        JSON.parse(
          localStorage.getItem(`${siteConfig.CHAIN_ID}_cart_token_ids`) || "[]"
        ).length
      );

      window.addEventListener("cart", () => {
        setCartCount(
          JSON.parse(
            localStorage.getItem(`${siteConfig.CHAIN_ID}_cart_token_ids`) ||
              "[]"
          ).length
        );
      });
    }
  }, []);

  const toggleShowUSD = (mode) => {
    window.localStorage.setItem("showUSD", String(mode));
    updateShowUSD(mode, dispatch);
  };

  useEffect(() => {
    setScrolled(currentPage == "" ? false : true);

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setScrolled(window.pageYOffset > 35 || currentPage != "")
      );
    }
  }, [currentPage]);

  useEffect(() => {
    async function fetchBanner() {
      const banner = await fetchSiteBanner();

      if (banner) {
        setBannerVisible(banner.active);
        setBannerMessage(banner.message);
        updateBanner(banner.active, dispatch);
      }
    }

    fetchBanner();

    const localShowUSD = window.localStorage.getItem("showUSD");
    if (localShowUSD && localShowUSD === "true") {
      updateShowUSD(true, dispatch);
    }

    const localGridLayout = window.localStorage.getItem("gridLayout");
    if (localGridLayout && Number(localGridLayout) != 1) {
      updateGridLayout(Number(localGridLayout), dispatch);
    }
  }, []);

  return (
    <>
      <ModalProvider backgroundComponent={ModalBackground}>
        <OnboardModal />
        <LoginModal />
        <ContainerBackground className={scrolled ? "scrolled" : null}>
          {bannerVisible && (
            <Banner scrolled={scrolled} message={bannerMessage} />
          )}
          <ContainerExtended>
            <Nav>
              <Link href="/" passHref>
                <a>
                  <Logo className={siteConfig.LOGO_BADGE ? "badge" : null}>
                    {theme == "light" ? (
                      <Image
                        src={`/logos/opt_full.png`}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                        priority
                      />
                    ) : (
                      <Image
                        src={`/logos/opt_full_dark.png`}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                        priority
                      />
                    )}
                    {siteConfig.LOGO_BADGE && (
                      <LogoBadge className="opt">
                        {siteConfig.LOGO_BADGE}
                      </LogoBadge>
                    )}
                  </Logo>
                </a>
              </Link>
              <CenterNav>
                <Search isMobile={false} scrolled={scrolled} />
              </CenterNav>
              <RightNav>
                <NavElement
                  className={currentPage == "explore" ? "active" : null}
                >
                  <Link href="/explore">
                    <a>Explore</a>
                  </Link>
                </NavElement>
                <NavElement
                  className={currentPage == "stats" ? "active" : null}
                >
                  <Link href="/stats">
                    <a>Stats</a>
                  </Link>
                </NavElement>
                <NavElement
                  className={currentPage == "bridge" ? "active" : null}
                >
                  <Link href="/bridge">
                    <a>Bridge</a>
                  </Link>
                </NavElement>
                <NavElement
                  className={
                    currentPage == "launch" || currentPage == "launchpad"
                      ? "active launchpad"
                      : "launchpad"
                  }
                >
                  <Link href="/launch">
                    <a>Launch</a>
                  </Link>
                </NavElement>

                <NavElement className="cart">
                  <Link href="/cart">
                    <a>
                      <NavIcon>
                        <MdShoppingCart />
                      </NavIcon>
                      {cartCount > 0 && (
                        <CartCount
                          className={
                            cartCount > 99
                              ? "three"
                              : cartCount > 9
                              ? "two"
                              : null
                          }
                        >
                          {cartCount > 99 ? "99+" : cartCount}
                        </CartCount>
                      )}
                    </a>
                  </Link>
                </NavElement>

                {address && (
                  <NavElement>
                    <Notifications />
                  </NavElement>
                )}
                <NavElement>
                  <AccountButton
                    theme={theme}
                    toggleTheme={toggleTheme}
                    toggleShowUSD={toggleShowUSD}
                  />
                </NavElement>
              </RightNav>
              <MobileNavSection>
                <NavElement>
                  <Search isMobile={true} scrolled={scrolled} />
                </NavElement>

                <NavElement className="cart">
                  <Link href="/cart">
                    <a>
                      <NavIcon>
                        <MdShoppingCart />
                      </NavIcon>
                      {cartCount > 0 && (
                        <CartCount
                          className={
                            cartCount > 99
                              ? "three"
                              : cartCount > 9
                              ? "two"
                              : null
                          }
                        >
                          {cartCount > 99 ? "99+" : cartCount}
                        </CartCount>
                      )}
                    </a>
                  </Link>
                </NavElement>

                {address && (
                  <NavElement>
                    <Notifications />
                  </NavElement>
                )}
                <NavElement>
                  <AccountButton
                    theme={theme}
                    toggleTheme={toggleTheme}
                    toggleShowUSD={toggleShowUSD}
                  />
                </NavElement>
              </MobileNavSection>
            </Nav>
          </ContainerExtended>
        </ContainerBackground>
      </ModalProvider>
    </>
  );
};
