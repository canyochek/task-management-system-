import './WelcomeScreen.scss'
const WelcomeScreen = () => {
    return (
        <section className="welcome-screen">
            <h1 className="welcome-screen__title">Welcome to ToDoPy</h1>
            <p className="welcome-screen__info">A to-do app is a simple, user-friendly digital tool designed to help individuals and teams organize tasks and manage their daily activities efficiently. Users can create, edit, and prioritize tasks, set deadlines or reminders, categorize items, and track their progress, all within an intuitive and accessible interface. These apps are essential for improving productivity, reducing stress, and ensuring that important responsibilities are not forgotten.</p>
            <button className="welcome-screen__btn">Go to tasks</button>
        </section>
    )
}

export default WelcomeScreen