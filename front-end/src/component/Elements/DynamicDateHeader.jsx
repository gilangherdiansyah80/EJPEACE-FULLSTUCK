const DynamicDateHeader = () => {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('id-ID', options);

  const [dayName, dateString] = formattedDate.split(', ');

  return (
    <h2 className="lg:text-3xl font-semibold">
      {`${dayName}, ${dateString}`}
    </h2>
  );
};

export default DynamicDateHeader;