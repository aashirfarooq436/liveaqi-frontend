import React, { useState, useEffect } from "react";
import axiosInstance from "../components/Axios";
import HeadingLine from "../components/HeadingLine";
import AQICard from "../components/AqiCard";
import WeatherCard from "../components/WeatherCard";
import PM25Card from "../components/PM25Card";
import DataTable from "../components/DataTable";
import DataGraph from "../components/DataGraph";

const Home = () => {
  const [latestEntry, setLatestEntry] = useState(null);
  const [latest5hours, setLatest5hours] = useState(null);
  const [latest5days, setLatest5days] = useState(null);
  const [future5hours, setFuture5hours] = useState(null);
  const [future5days, setFuture5days] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/home/current")
      .then((response) => {
        setLatestEntry(response.data);
      })
      .catch((error) => {
        console.error("Error fetching latest entry:", error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/home/hours")
      .then((response) => {
        const data = response.data.map((id) => {
          return { date: id.Time, aqi: id.Aqi, pm25: id.Pm25 };
        });
        setLatest5hours(data);
      })
      .catch((error) => {
        console.error("Error fetching latest 5 hours:", error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/home/days")
      .then((response) => {
        const data = response.data.map((id) => {
          return { date: id.day, aqi: id.AQI_avg, pm25: id.PM25_avg };
        });
        setLatest5days(data);
      })
      .catch((error) => {
        console.error("Error fetching latest 5 days:", error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/home/futurehours")
      .then((response) => {
        const data = response.data.map((id) => {
          return { date: id.Time, aqi: id.Aqi, pm25: id.Pm25 };
        });
        setFuture5hours(data);
      })
      .catch((error) => {
        console.error("Error fetching future 5 hours:", error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/home/futuredays")
      .then((response) => {
        const data = response.data.map((id) => {
          return { date: id.Time, pm25: id.Pm25 };
        });
        setFuture5days(data);
      })
      .catch((error) => {
        console.error("Error fetching future 5 days:", error);
      });
  }, []);

  function calcAQI(Cp, Ih, Il, BPh, BPl) {
    const a = Ih - Il;
    const b = BPh - BPl;
    const c = Cp - BPl;
    return (a / b) * c + Il;
  }

  function calculateAQI(pm) {
    if (pm > 350.5) {
      return calcAQI(pm, 500, 401, 500.4, 350.5); // Hazardous
    } else if (pm > 250.5) {
      return calcAQI(pm, 400, 301, 350.4, 250.5); // Hazardous
    } else if (pm > 150.5) {
      return calcAQI(pm, 300, 201, 250.4, 150.5); // Very Unhealthy
    } else if (pm > 55.5) {
      return calcAQI(pm, 200, 151, 150.4, 55.5); // Unhealthy
    } else if (pm > 35.5) {
      return calcAQI(pm, 150, 101, 55.4, 35.5); // Unhealthy for Sensitive Groups
    } else if (pm > 12.1) {
      return calcAQI(pm, 100, 51, 35.4, 12.1); // Moderate
    } else if (pm >= 0) {
      return calcAQI(pm, 50, 0, 12, 0); // Good
    } else {
      return "Out of Range";
    }
  }

  const [view, setView] = useState("hourly");

  const hours5table = latest5hours?.slice(0, 5).map((entry) => {
    return { date: entry.date, aqi: entry.aqi, pm25: entry.pm25 };
  });
  const hours5graph = latest5hours?.map((entry) => {
    return { date: entry.date, aqi: entry.aqi, pm25: entry.pm25 };
  });
  const days5table = latest5days?.slice(0, 5).map((entry) => {
    return { date: entry.date, aqi: entry.aqi, pm25: entry.pm25 };
  });
  const days5graph = latest5days?.map((entry) => {
    return { date: entry.date, aqi: entry.aqi, pm25: entry.pm25 };
  });
  const future5h = future5hours?.map((entry) => {
    return {
      date: entry.date,
      aqi: parseInt(calculateAQI(entry.pm25)),
      pm25: entry.pm25,
    };
  });
  const future5d = future5days?.map((entry) => {
    return {
      date: entry.date,
      aqi: parseInt(calculateAQI(entry.pm25)),
      pm25: entry.pm25,
    };
  });

  const dummy = [
    { date: "Unavailable", aqi: 0, pm25: 0 },
    { date: "Unavailable", aqi: 0, pm25: 0 },
    { date: "Unavailable", aqi: 0, pm25: 0 },
    { date: "Unavailable", aqi: 0, pm25: 0 },
    { date: "Unavailable", aqi: 0, pm25: 0 },
  ];

  return (
    <div className="container mx-auto md:px-36 md:pt-4 p-8 pt-16">
      <div className="md:mt-16 md:pt-2"></div>
      <HeadingLine text={"Current Air Quality Index in Lahore"} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        <div className="md:col-span-4">
          <AQICard aqi={latestEntry?.Aqi} time={latestEntry?.Time} />
        </div>
        <div className="md:col-span-2">
          <PM25Card pm25={latestEntry?.Pm25} />
          <WeatherCard
            temperature={latestEntry?.Temp}
            humidity={latestEntry?.Hum}
          />
        </div>
      </div>
      <div className="md:mt-0 mt-4"></div>
      <HeadingLine text={"Historic AQI Data for Lahore"} />
      {/* Tables and plots*/}
      <div className="flex md:justify-center justify-center md:mt-1 md:mb-0 my-4">
        <button
          className={`mr-4 px-4 py-2 rounded-md ${
            view === "hourly"
              ? "bg-slate-900 text-slate-200 hover:bg-slate-900"
              : "bg-slate-800 text-slate-200 hover:bg-slate-900"
          }`}
          onClick={() => setView("hourly")}
        >
          HOURLY
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            view === "daily"
              ? "bg-slate-900 text-slate-200 hover:bg-slate-900"
              : "bg-slate-800 text-slate-200 hover:bg-slate-900"
          }`}
          onClick={() => setView("daily")}
        >
          DAILY
        </button>
      </div>
      {/* Render DataTable and DataGraph based on selected view */}
      <div className="md:grid grid-cols-1 gap-4 md:grid-cols-2 md:mb-0 mb-0">
        <div className="md:col-span-1">
          <DataTable
            data={view === "hourly" ? hours5table || dummy : days5table || dummy}
            text={`Last 5 ${view === "hourly" ? "Hours" : "Days"}`}
          />
        </div>
        <div className="md:col-span-1">
          <DataGraph
            values={view === "hourly" ? hours5graph || dummy : days5graph || dummy}
            text={"Historic AQI Graph"}
          />
        </div>
      </div>
      <div className="md:mt-4 md:pt-2 mt-4"></div>
      <HeadingLine text={"Forecasted Air Quality Index in Lahore"} />
      {/* Tables and plots*/}
      <div className="md:grid gap-4 md:grid-cols-2 md:mt-0 mt-2">
        <div className="md:col-span-1">
          <DataTable data={future5h || dummy} text={"Next 5 hours"} />
        </div>
        <div className="md:col-span-1">
          <DataTable data={future5d || dummy} text={"Next 5 days"} />
        </div>
      </div>
    </div>
  );
};

export default Home;
