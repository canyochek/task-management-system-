import './CalendarScreen.scss';

const CalendarHeader = ({ view, setView }) => {
    const formattedDate = new Date().toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="calendar__header">
            <h2 className="calendar__title">{formattedDate}</h2>
            
            <div className="calendar__tabs">
                <button 
                    className={`calendar__btn ${view === 'day' ? 'active' : ''}`}
                    onClick={() => setView('day')} 
                >
                    День
                </button>
                <button 
                    className={`calendar__btn ${view === 'week' ? 'active' : ''}`}
                    onClick={() => setView('week')} 
                >
                    Тиждень
                </button>
                <button 
                    className={`calendar__btn ${view === 'month' ? 'active' : ''}`}
                    onClick={() => setView('month')} 
                >
                    Місяць
                </button>
            </div>
        </div>
    );
};

export default CalendarHeader;