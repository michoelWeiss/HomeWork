import Navbar from './navBar.jsx';

export default function ContactUs() {
    return (
        <>
            <Navbar />
            <div className="contact-container">
                <h1>Contact Us</h1>
                <p>Have questions? Reach out to us at:</p>
                <ul>
                    <li>Email: support@realestate.com</li>
                    <li>Phone: +1 (555) 123-4567</li>
                    <li>Address: 123 Real Estate Street, Home City</li>
                </ul>
            </div>
        </>
    );
}