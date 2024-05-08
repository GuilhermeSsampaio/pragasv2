import Footer from "../footer/Footer";

export default function Layout({ children }) {
    return (
        <div>
            {children}
            <Footer />
        </div>
    );
}