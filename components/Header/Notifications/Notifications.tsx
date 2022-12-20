import { ethers } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsLightningChargeFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import {
  fetchProfileNotifications,
  fetchProfileNotificationStatus,
  markNotificationsRead,
} from "../../../api/profile";
import { siteConfig } from "../../../shared/config";
import { State } from "../../../store";
import { TokenImage } from "../../Common/Images/TokenImage";
import {
  ActivityText,
  ActivityTime,
  DropdownContainer,
  DropdownGrid,
  DropdownRow,
  NotificationsButton,
  NotificationsContainer,
  TokenImageContainer,
  UnreadIcon,
} from "./styles";

export const Notifications = () => {
  const address = useSelector((state: State) => state.address);

  const [displayNotifications, setDisplayNotifications] = useState(false);

  const [notificationsList, setNotificationsList] = useState([]);
  const [notificationsRead, setNotificationsRead] = useState(true);

  const [fetchedNotifications, setFetchedNotifications] = useState(false);

  useEffect(() => {
    if (address) {
      fetchNotifications();
    }

    async function fetchNotifications() {
      const notificationStatus = await fetchProfileNotificationStatus(address);
      setNotificationsRead(notificationStatus.notifications_read);

      const notifications = await fetchProfileNotifications(address);
      if (notifications) {
        setNotificationsList(notifications.results.slice(0, 5));
      }
      setFetchedNotifications(true);
    }
  }, [address]);

  async function toggleDropdown(state) {
    if (!notificationsRead) {
      await markNotificationsRead(address);
      setNotificationsRead(true);
    }

    setDisplayNotifications(state);
  }

  return (
    <>
      {address && (
        <NotificationsContainer
          onMouseOver={() => toggleDropdown(true)}
          onMouseLeave={() => toggleDropdown(false)}
        >
          <NotificationsButton>
            <BsLightningChargeFill />
            {!notificationsRead && <UnreadIcon />}
          </NotificationsButton>

          <DropdownContainer
            onClick={() => setDisplayNotifications(false)}
            className={displayNotifications ? "visible" : null}
          >
            <DropdownGrid>
              {fetchedNotifications ? (
                <>
                  {notificationsList.length > 0 ? (
                    <>
                      {notificationsList.map((notification, index) => (
                        <NotificationRow
                          notification={notification}
                          address={address}
                          key={index}
                        />
                      ))}
                    </>
                  ) : (
                    <DropdownRow className="centered">
                      No notifications
                    </DropdownRow>
                  )}
                </>
              ) : (
                <DropdownRow className="centered">Loading...</DropdownRow>
              )}
            </DropdownGrid>
          </DropdownContainer>
        </NotificationsContainer>
      )}
    </>
  );
};

const NotificationRow = ({ notification, address }) => {
  const to_address =
    notification.onchain_activity &&
    notification.onchain_activity.to_profile &&
    notification.onchain_activity.to_profile.address;

  const from_address =
    notification.onchain_activity &&
    notification.onchain_activity.from_profile &&
    notification.onchain_activity.from_profile.address;

  const to_profile =
    notification.onchain_activity &&
    (notification.onchain_activity.to_profile.username ||
      notification.onchain_activity.to_profile.reverse_ens ||
      notification.onchain_activity.to_profile.address.slice(0, 6));

  const from_profile =
    notification.onchain_activity &&
    (notification.onchain_activity.from_profile.username ||
      notification.onchain_activity.from_profile.reverse_ens ||
      notification.onchain_activity.from_profile.address.slice(0, 6));

  const order =
    (notification.onchain_activity &&
      (notification.onchain_activity.sell_order ||
        notification.onchain_activity.buy_order ||
        notification.onchain_activity.dutch_auction)) ||
    (notification.offchain_activity &&
      (notification.offchain_activity.sell_order ||
        notification.offchain_activity.buy_order ||
        notification.offchain_activity.dutch_auction));

  return (
    <Link
      href={`/asset/${
        notification.token.network != siteConfig.NETWORK ? "eth/" : ""
      }${notification.token.contract_address}/${notification.token.token_id}`}
      passHref
    >
      <a>
        <DropdownRow>
          <TokenImageContainer>
            {notification.token && <TokenImage token={notification.token} />}
          </TokenImageContainer>
          <ActivityText>
            {notification.event_type == "Sale" && (
              <>
                <div>
                  {to_address == address ? "Purchased" : "Sold"}{" "}
                  <b>{notification.token.name}</b>
                  {order && order.price >= 0 && (
                    <>
                      {" "}
                      for{" "}
                      <b>
                        {ethers.utils.formatEther(
                          ethers.utils.parseUnits(
                            order.price.toString(),
                            "gwei"
                          )
                        )}{" "}
                        {order.payment_token.symbol}
                      </b>
                    </>
                  )}
                </div>
              </>
            )}

            {notification.event_type == "Bridge" && (
              <>
                {from_address ==
                "0x0000000000000000000000000000000000000000" ? (
                  <div>
                    Bridged <b>{notification.token.name}</b> from Ethereum
                  </div>
                ) : (
                  <div>
                    Initiated bridge process for{" "}
                    <b>{notification.token.name}</b>
                  </div>
                )}
              </>
            )}

            {notification.event_type == "Transfer" && (
              <>
                {to_address == address ? (
                  <div>
                    Received <b>{notification.token.name}</b> from{" "}
                    {from_profile}
                  </div>
                ) : (
                  <div>
                    Transferred <b>{notification.token.name}</b> to {to_profile}
                  </div>
                )}
              </>
            )}

            {notification.event_type == "Mint" && (
              <div>
                Minted <b>{notification.token.name}</b>
              </div>
            )}

            {notification.event_type == "Burn" && (
              <div>
                Burned <b>{notification.token.name}</b>
              </div>
            )}

            {notification.event_type == "Airdrop" && (
              <div>
                Airdropped <b>{notification.token.name}</b>
              </div>
            )}

            {notification.event_type == "Offer" && (
              <>
                <div>
                  Received
                  {order && order.price >= 0 && (
                    <>
                      {" "}
                      <b>
                        {ethers.utils.formatEther(
                          ethers.utils.parseUnits(
                            order.price.toString(),
                            "gwei"
                          )
                        )}{" "}
                        {order.payment_token.symbol}
                      </b>
                    </>
                  )}{" "}
                  offer for <b>{notification.token.name}</b>
                </div>
              </>
            )}

            <ActivityTime>
              <TimeAgo date={notification.timestamp} />
            </ActivityTime>
          </ActivityText>
        </DropdownRow>
      </a>
    </Link>
  );
};
