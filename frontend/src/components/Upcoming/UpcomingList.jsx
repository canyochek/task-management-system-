import UpcomingItem from "./UpcomingItem";
const UpcomingList = ({title, className}) => {
    return (
        <>
            <div className={className}>
                <h3 className="upcoming__title">{title}</h3>
                <UpcomingItem />
            </div>
        </>
    )
}

export default UpcomingList