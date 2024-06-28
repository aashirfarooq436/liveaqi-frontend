import React from "react";

const AQICard = ({ aqi, time }) => {
  const getAQILevel = (aqi) => {
    if (aqi <= 50) {
      return "Good";
    } else if (aqi <= 100) {
      return "Moderate";
    } else if (aqi <= 150) {
      return "Unhealthy for Sensitive Groups";
    } else if (aqi <= 200) {
      return "Unhealthy";
    } else if (aqi <= 300) {
      return "Very Unhealthy";
    } else {
      return "Unavailable";
    }
  };

  const aqiLevel = getAQILevel(aqi);
  return (
    <div className={"bg-slate-900 rounded-xl md:my-6 md:p-8 md:px-10 mt-4 p-6"}>
      <h3
        className={"text-slate-200 md:text-sm md:text-end text-sm text-start"}
      >
        Last Refreshed
      </h3>
      <h1
        className={
          "text-slate-200 md:text-lg text-md md:font-bold font-semibold md:text-end text-start md:mb-0 mb-6"
        }
      >
        {time || "Unavailable"}
      </h1>
      <div className={"text-start text-slate-200"}>
        <div className="md:text-xl text-lg md:text-start text-center">
          US AQI
        </div>
        <div className="md:text-8xl font-bold md:mb-2 text-6xl md:text-start text-center">
          {aqi || 0}
        </div>
        <div className="md:text-xl md:text-start text-center">
          {aqiLevel || "Unavailable"}
        </div>
      </div>
    </div>
  );
};

export default AQICard;
