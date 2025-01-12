import { axisClasses, LineChart } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import CircularLoading from "../components/Elements/CircularLoading";
import Divider from "../components/Elements/Divider";
import withAuth from "../components/hoc/WithAuth";
import sendRequest from "../lib/getApi";
import { getArticleStatsByDate, getCommentStats } from "../lib/statistic";
import useAppStore from "../store/useAppStore";
import { Statistic } from "../types/dashboard";
import { Article, ArticleResponse } from "../types/response/article";

const chartSetting = {
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-10px, 0)",
    },
  },
};

const DashboardPage = () => {
  const setLoading = useAppStore.useSetLoading();
  const [articles, setArticles] = useState<Article[]>();
  const [commentStats, setCommentStats] = useState<Statistic[]>();
  const [labels, setLabels] = useState<string[]>();
  const [values, setValues] = useState<number[]>();

  const [dateStats, setDateStats] = useState<Statistic[]>();
  const [labelsDate, setLabelsDate] = useState<string[]>();
  const [valuesDate, setValuesDate] = useState<number[]>();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { isSuccess, data } = await sendRequest<ArticleResponse>(
        "GET",
        `/articles`,
        null,
        {
          "populate[category]": "*",
          "populate[comments]": "*",
          "pagination[pageSize]": 50,
          "sort[0]": "publishedAt:desc",
        }
      );

      if (isSuccess && data) {
        setArticles(data.data);
      }

      setLoading(false);
    };

    fetchArticles();
  }, [setLoading]);

  useEffect(() => {
    if (articles) {
      setCommentStats(getCommentStats(articles));
      setDateStats(getArticleStatsByDate(articles));
    }
  }, [articles]);

  useEffect(() => {
    if (commentStats) {
      setLabels(commentStats.map((item) => item.label));
      setValues(commentStats.map((item) => item.value));
    }
  }, [commentStats]);

  useEffect(() => {
    if (dateStats) {
      setLabelsDate(dateStats.map((item) => item.label));
      setValuesDate(dateStats.map((item) => item.value));
    }
  }, [dateStats]);

  return (
    <main className="container py-5 md:py-10 flex flex-col gap-4">
      <h3 className="h3 font-bold text-white flex items-center">
        <MdOutlineSpaceDashboard className="inline mr-3" />
        Dashboard
      </h3>
      <Divider />

      <h4 className="h4 font-bold text-bw-50">Statistik Jumlah Komentar</h4>
      <div className="text-white p-5 bg-white rounded-2xl border w-full">
        <div className="styled-scrollbar w-full overflow-x-auto pb-5">
          {articles && labels && values ? (
            <BarChart
              margin={{ bottom: 70, left: 70 }}
              yAxis={[
                {
                  label: "Jumlah Komentar",
                },
              ]}
              xAxis={[
                {
                  scaleType: "band",
                  data: labels,
                  tickLabelStyle: {
                    angle: -25,
                    textAnchor: "end",
                    color: "white",
                  },
                },
              ]}
              series={[{ data: values }]}
              width={articles.length * 100}
              height={400}
              colors={["#FC5B5F"]}
              grid={{ vertical: true, horizontal: true }}
              {...chartSetting}
            />
          ) : (
            <CircularLoading className="text-3xl text-dark-surface"/>
          )}
        </div>
      </div>

      <h4 className="h4 font-bold text-bw-50 mt-5">
        Statistik Jumlah Artikel Dipublish Per Tanggal
      </h4>
      <div className="text-white p-5 bg-white rounded-2xl border w-full">
        <div className="styled-scrollbar w-full overflow-x-auto pb-5">
          {articles && labelsDate && valuesDate ? (
            <LineChart
              margin={{ bottom: 20 }}
              yAxis={[
                {
                  label: "Jumlah Artikel Dipublish",
                },
              ]}
              xAxis={[
                {
                  scaleType: "band",
                  data: labelsDate,
                },
              ]}
              series={[{ data: valuesDate }]}
              width={Math.max(labelsDate.length * 50, 1200)}
              height={400}
              colors={["#FC5B5F"]}
              grid={{ vertical: true, horizontal: true }}
              {...chartSetting}
            />
          ) : (
            <CircularLoading className="text-3xl text-dark-surface"/>
          )}
        </div>
      </div>
    </main>
  );
};

export default withAuth(DashboardPage, true);
