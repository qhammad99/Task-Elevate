import { Link } from "react-router-dom";

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Task-Elevate!</span></h1>
            </header>
            <main className="public__main">
                <h3>Increase your productivity.</h3>
                <p>Lets manage your tasks and sync with team members in one place.</p>
                <address className="public__addr">
                    Task-Elevate<br />
                    facebook_page_link<br />
                </address>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}

export default Public