import Navbar from './navBar.jsx';

export default function AboutUs() {
    return (
        <>
            <Navbar />
            <div className="about-container, containers">
                <h1>About Us</h1>
                <p>
                    We are a team of real estate professionals committed to helping you find your dream home.
                    With years of experience in the market, we strive to provide unparalleled service to our clients.
                </p>
            </div>
        </>
    );
}