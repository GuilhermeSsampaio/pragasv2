import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

//layout base

export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}