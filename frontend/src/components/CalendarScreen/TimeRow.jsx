const hours = Array.from(
  { length: 24 },
  (_, i) => `${String(i).padStart(2, '0')}:00`
);

const TimeRow = () => {
  return (
    <ul className="calendar__time">
      {hours.map(hour => (
        <li key={hour} className="calendar__hours">
          {hour}
          <span className="calendar__line"></span>
        </li>
      ))}
    </ul>
  );
};

export default TimeRow;