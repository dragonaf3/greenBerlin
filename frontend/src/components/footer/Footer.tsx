import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="footer footer-center p-6 bg-primary text-primary-content">
            <nav className="flex gap-4">
                <Link to="/about" className="link link-hover">About us</Link>
                <Link to="/privacy" className="link link-hover">Privacy</Link>
            </nav>
        </footer>
    );
}
