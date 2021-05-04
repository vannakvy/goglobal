import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ outOfStock, totalDonor, totalItem, total, totalDonee }) => (
  <>
    <Pie
      data={{
        labels: [
          "ទំនិញ់អស់",
          "លុយសល់",
          "ចំនួនទំនិញ់សរុប",
          "អ្នកទទួលការឧបត្ថម",
          "អ្នកឧបត្ថម",
        ],
        datasets: [
          {
            label: "#",
            data: [outOfStock, total, totalItem, totalDonee, totalDonor],
            backgroundColor: ["red", "green", "yellow", "purple", "blue"],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
    />
  </>
);

export default PieChart;
