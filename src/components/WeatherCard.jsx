const WeatherCard = ({ temperature, humidity }) => {
  return (
    <div className="bg-slate-900 rounded-xl md:my-6 md:p-8 mt-4 p-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-slate-200 md:text-start text-center">Temp</div>
          <div className="text-slate-200 md:text-2xl font-bold text-3xl md:text-start text-center">
            {temperature || 0}°
          </div>
        </div>
        <div>
          <div className="text-slate-200 md:text-start text-center">Hum</div>
          <div className="text-slate-200 md:text-2xl font-bold text-3xl md:text-start text-center">
            {humidity || 0}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
