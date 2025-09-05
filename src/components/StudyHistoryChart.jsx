import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { get, ref } from "firebase/database";
import { db } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";

// Chart.jsのコンポーネントを登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudyHistoryChart = () => {
  const { user, loading } = useAuth();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    const fetchLast10DaysLearningData = async () => {
      const wordHistoryRef = ref(db, `emr-users/${user.uid}/wordHistories`);
      try {
        const snapshot = await get(wordHistoryRef);
        if (snapshot.exists()) {
          const wordHistory = snapshot.val();
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tenDaysAgo = new Date(today);
          tenDaysAgo.setDate(today.getDate() - 6);

          const dailyCounts = {};
          const labels = [];

          for (let i = 0; i < 7; i++) {
            const date = new Date(tenDaysAgo);
            date.setDate(tenDaysAgo.getDate() + i);
            const dateKey = date.toLocaleDateString("ja-JP", {
              month: "2-digit",
              day: "2-digit",
            });
            dailyCounts[dateKey] = 0;
            labels.push(dateKey);
          }

          for (const wordId in wordHistory) {
            const wordData = wordHistory[wordId];
            if (wordData.lastReviewed) {
              const reviewedDate = new Date(wordData.lastReviewed);
              if (reviewedDate >= tenDaysAgo) {
                const dateKey = reviewedDate.toLocaleDateString("ja-JP", {
                  month: "2-digit",
                  day: "2-digit",
                });
                if (dailyCounts.hasOwnProperty(dateKey)) {
                  dailyCounts[dateKey]++;
                }
              }
            }
          }

          setChartData({
            labels: labels,
            datasets: [
              {
                data: labels.map((label) => dailyCounts[label]),
                backgroundColor: "#FB923C7F",
                borderColor: "#FB923C",
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
      }
    };

    if (user.uid) {
      fetchLast10DaysLearningData();
    }
  }, [user.uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // グラフオプションの設定
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Words",
        },
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <>
      <div className="w-full h-full flex-1">
        <Bar data={chartData} options={options} />
      </div>
      <div className="flex w-full justify-center gap-4">
        <p className="bg-orange-400/50 px-2 rounded border border-orange-400">
          Study words
        </p>
      </div>
    </>
  );
};

export default StudyHistoryChart;
