import "./Today.scss";
import UpcomingList from '../Upcoming/UpcomingList'

const Today = () => {
    return (
        <section className="today-page">
            <h2 className="today-page__title">Today</h2>
            <UpcomingList title="Today's Tasks" className="today-page__content" />    
        </section>
    )
}


export default Today