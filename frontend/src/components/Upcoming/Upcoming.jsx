import './Upcoming.scss'
import UpcomingList from './UpcomingList'
//import UpcomingItem from './UpcomingItem'

const upcomingSection = [
    {id: 1, title: "Today"},
    {id: 2, title: "Tomorrow"},
    {id: 3, title: "This Week"},
];


const Upcoming = () => {
    return (
        <section className="upcoming">
            <h2 className="upcoming__title">Upcoming</h2>
            <div className="upcoming__tasks">
                {upcomingSection.map(section => (
                    <UpcomingList 
                        key={section.id}
                        className="upcoming__list" 
                        title={section.title}
                    />
                ))}
            </div>
        </section>
    )
}

export default Upcoming