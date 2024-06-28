const PM25Card = ({ pm25 }) => {
  return (
    <div className="bg-slate-900 rounded-xl md:my-6 md:p-8 p-5 pl-6">
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <div>
          <div className="text-slate-200 md:text-start text-center">PM2.5</div>
          <div className="text-slate-200 md:text-4xl md:font-semibold text-3xl font-semibold md:text-start text-center">
            {pm25 || 0}{""}µg/m³
          </div>
        </div>
      </div>
    </div>
  );
};

export default PM25Card;
