const DataTable = ({ data, text }) => {
  return (
    <div className="bg-slate-900 rounded-xl md:p-12 md:mt-6 md:mb-0 p-5">
      <div className="text-slate-100">
        <div className="text-2xl md:mb-4 mb-4 md:text-center text-center">
          {text}
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="md:text-start text-start px-2 py-2">Date</th>
              <th className="md:text-start text-start px-2 py-2">AQI</th>
              <th className="md:text-start text-start px-2 py-2">PM2.5</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((data, index) => (
              <tr key={index} className="odd:bg-slate-800 even:bg-slate-900">
                <td className="md:text-start text-start px-2 py-2">
                  {data.date}
                </td>
                <td className="md:text-start text-start px-2 py-2">
                  {data.aqi}
                </td>
                <td className="md:text-start text-start px-2 py-2">
                  {data.pm25}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
