import Navbar from './navBar.jsx';

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="containers">
                <h1>Welcome to Our Real Estate Website</h1>
                <p>
                    Whether you’re buying or selling, we provide the best tools and expert advice
                    to help you make informed decisions. Explore our listings, learn about our services,
                    or contact us to get started.
                </p>
            </div>
        </>
    );
}