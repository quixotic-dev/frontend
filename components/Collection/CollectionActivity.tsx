import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchCollectionDailyStats } from "../../api/collection";
import { fetchMoreByURL } from "../../api/general";
import { siteConfig } from "../../shared/config";
import { ActivityRow } from "../Common/Activity/ActivityRow";
import { ActivityRowGhost } from "../Common/Activity/ActivityRowGhost";
import {
  ActivityGrid,
  ActivityGridRow,
  ActivityInfo,
} from "../Common/Activity/styles";
import { NoItems } from "../Common/styles";
import { ActivityChart, LoadingRing } from "./styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  Title,
  Tooltip,
  TimeScale
);

export const CollectionActivity = ({
  collection,
  stats,
  setStats,
  activityState,
  setActivityState,
  chartHistory,
  colorData,
}) => {
  const [loadingStats, setLoadingStats] = useState(true);
  const [fullStats, setFullStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const dailyStats = await fetchCollectionDailyStats(collection.address);

      if (stats) {
        setStats(dailyStats);
        setFullStats(dailyStats);
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (fullStats.length > 0) {
      setLoadingStats(true);
      if (chartHistory != "all") {
        var today = new Date();
        var priorDate = new Date(
          new Date().setDate(today.getDate() - Number(chartHistory))
        );
        setStats(fullStats.filter((item) => new Date(item.date) > priorDate));
      } else {
        setStats(fullStats);
      }
      setLoadingStats(false);
    }
  }, [chartHistory, fullStats]);

  async function fetchMoreActivity() {
    const res = await fetchMoreByURL(activityState.activity.next);

    setActivityState({
      ...activityState,
      moreActivity: res.next ? true : false,
      activity: res,
      activityResults: activityState.activityResults.concat(res.results),
    });
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "M/D",
          },
        },
        bounds: "ticks",
        offset: true,
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
        },
      },
      y1: {
        grid: {
          drawBorder: false,
          display: false,
        },
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 4,
        },
      },
      y2: {
        grid: {
          drawBorder: false,
        },
        beginAtZero: true,
        position: "right",
        ticks: {
          maxTicksLimit: 4,
          padding: 10,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItem) {
            return new Date(tooltipItem[0].label).toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            });
          },
          label: function (tooltipItem) {
            return [
              "Avg. price: " +
                stats[tooltipItem.dataIndex].avg_price.toFixed(3) +
                " ETH",
              "Volume: " +
                stats[tooltipItem.dataIndex].volume.toFixed(2) +
                " ETH",
              "Transactions: " +
                stats[tooltipItem.dataIndex].num_traded.toFixed(0),
            ];
          },
        },
        titleFont: {
          size: 16,
          weight: "800",
          family: "Readex Pro, sans-serif",
        },
        bodyFont: {
          size: 14,
          weight: "500",
          family: "Readex Pro, sans-serif",
          lineHeight: 1.33,
        },
        displayColors: false,
        padding: 12,
      },
    },
  };

  const chartColor = colorData.vibrant ? colorData.vibrant : "#ff0420";

  const data = {
    datasets: [
      {
        type: "line" as any,
        label: "Average Price",
        backgroundColor: chartColor,
        borderColor: chartColor,
        data: stats.map((a) => a.avg_price),
        lineTension: 0.25,
        pointHitRadius: 25,
        yAxisID: "y2",
      },
      {
        type: "bar" as any,
        label: "Volume",
        backgroundColor: chartColor + "33",
        borderColor: chartColor + "33",
        data: stats.map((a) => a.volume),
        yAxisID: "y1",
      },
    ],
    labels: stats.map((a) =>
      new Date(a.date).toLocaleString("en-US", {
        timeZone: "UTC",
      })
    ),
  };

  return (
    <>
      {stats.length > 1 && (
        <ActivityChart>
          {loadingStats ? (
            <LoadingRing />
          ) : (
            <Chart type="line" options={options} data={data} />
          )}
        </ActivityChart>
      )}

      {activityState.activityUpdating ? (
        <ActivityGrid>
          <ActivityGridRow className="title">
            <ActivityInfo className="title">Event</ActivityInfo>
            <ActivityInfo className="title">Item</ActivityInfo>
            <ActivityInfo className="title">Price</ActivityInfo>
            <ActivityInfo className="title">From</ActivityInfo>
            <ActivityInfo className="title">To</ActivityInfo>
            <ActivityInfo className="title">Date</ActivityInfo>
          </ActivityGridRow>
          {[...Array(9)].map((e, i) => (
            <ActivityRowGhost key={i} />
          ))}
        </ActivityGrid>
      ) : (
        <>
          {activityState.activityResults &&
          activityState.activityResults.length > 0 ? (
            <ActivityGrid>
              <InfiniteScroll
                dataLength={activityState.activityResults.length}
                next={fetchMoreActivity}
                hasMore={activityState.moreActivity}
                loader={[...Array(6)].map((e, i) => (
                  <ActivityRowGhost key={i} />
                ))}
                style={{ display: "contents", overflow: "visible" }}
              >
                <ActivityGridRow className="title collection">
                  <ActivityInfo className="title">Event</ActivityInfo>
                  <ActivityInfo className="title">Item</ActivityInfo>
                  <ActivityInfo className="title">Price</ActivityInfo>
                  <ActivityInfo className="title">From</ActivityInfo>
                  <ActivityInfo className="title">To</ActivityInfo>
                  <ActivityInfo className="title">Date</ActivityInfo>
                </ActivityGridRow>
                {activityState.activityResults.map((event, index) => (
                  <ActivityRow event={event} key={index} />
                ))}
              </InfiniteScroll>
            </ActivityGrid>
          ) : (
            <NoItems>
              <h1>No activity to display</h1>
              <p>Try updating your selected filters</p>
            </NoItems>
          )}
        </>
      )}
    </>
  );
};
