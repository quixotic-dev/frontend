import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { ethers } from "ethers";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { FaChartLine } from "react-icons/fa";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { siteConfig } from "../../../shared/config";
import {
  Section,
  SectionContent,
  SectionNoData,
  SectionTitle,
  SectionTitleText,
} from "../styles";
import { ChartContainer } from "./styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export const AssetPriceHistory = ({ token }) => {
  const [collapsed, setCollapsed] = useState(
    token.price_history.length > 0 ? false : true
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: token.price_history.length == 1 ? 4 : 0,
      },
    },
    scales: {
      x: {
        offset: token.price_history.length == 1 ? true : false,
        grid: {
          display: false,
        },
        ticks: {
          padding: 10,
        },
      },
      y: {
        grid: {
          drawBorder: false,
        },
        beginAtZero: true,
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
            return tooltipItem[0].label;
          },
          label: function (tooltipItem) {
            return [
              "Avg. price: " +
                Math.round(tooltipItem.raw * 10000) / 10000 +
                " ETH",
            ];
          },
        },
        titleFont: {
          size: 17,
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

  const chartColor = "#ff0420";

  const data = {
    labels: token.price_history.map((data) =>
      new Date(data.date).toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        timeZone: "UTC",
      })
    ),
    datasets: [
      {
        label: "Avg. price",
        backgroundColor: chartColor,
        borderColor: chartColor,
        data: token.price_history.map((data) => data.avg_price),
        lineTension: 0.25,
        pointHitRadius: 25,
      },
    ],
  };

  return (
    <Section>
      <SectionTitle onClick={() => setCollapsed(!collapsed)}>
        <SectionTitleText>
          <FaChartLine />
          Price History
        </SectionTitleText>
        {collapsed ? <FiChevronRight /> : <FiChevronDown />}
      </SectionTitle>
      {!collapsed && (
        <SectionContent>
          {token.price_history.length > 0 ? (
            <ChartContainer>
              <Line options={options} data={data} />
            </ChartContainer>
          ) : (
            <SectionNoData>No sales yet</SectionNoData>
          )}
        </SectionContent>
      )}
    </Section>
  );
};
