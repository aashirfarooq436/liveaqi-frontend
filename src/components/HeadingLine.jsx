const HeadingLine = ({ text }) => {
  return (
    <div className="rounded-xl md:px-8 p-4">
      <h2 className="text-slate-200 text-center md:text-4xl font-semibold text-xl">
        {text}
      </h2>
    </div>
  );
};

export default HeadingLine;
