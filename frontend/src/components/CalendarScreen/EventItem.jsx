const EventItem = ({ event }) => {
    return (
        <div
            className="calendar__event"
            style={{ backgroundColor: event.color }}
        >
            <p className="calendar__event-text">
                {event.title} <span className="calendar__event-time">({event.time})</span>
            </p>
        </div>
    );
};

export default EventItem;