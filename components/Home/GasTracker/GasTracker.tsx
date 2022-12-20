import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { siteConfig } from "../../../shared/config";
import {
  ContainerBackground,
  ContainerExtended,
  GasContainer,
  GasSubtitle,
  GasTitle,
} from "./styles";

export const GasTracker = () => {
  const today = new Date();
  const prevDate = new Date("09-28-2022");
  const daysDiff = (today.getTime() - prevDate.getTime()) / (1000 * 3600 * 24);
  const numTransactions = 147446 + daysDiff * 1750;
  const osFee = 0.014;
  const quixFee = 0.0005;
  const avgEthPrice = 2128;
  const total = (osFee - quixFee) * numTransactions * avgEthPrice;

  return (
    <ContainerBackground>
      <ContainerExtended>
        <GasContainer>
          <VisibilitySensor partialVisibility>
            {({ isVisible }) => (
              <GasTitle>
                {isVisible ? (
                  <CountUp
                    start={1000000}
                    end={total}
                    prefix="$"
                    suffix="+"
                    separator=","
                  />
                ) : (
                  "$500,000+"
                )}
              </GasTitle>
            )}
          </VisibilitySensor>

          <GasSubtitle>⛽️ gas fee savings</GasSubtitle>
        </GasContainer>
      </ContainerExtended>
    </ContainerBackground>
  );
};
