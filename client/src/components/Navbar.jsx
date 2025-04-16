import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { UserButton, SignedIn } from "@clerk/clerk-react";
import "../styles/navbar.css";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo - Left */}
                <Link to="/" className="navbar-logo">
                    StemQuiz
                </Link>

                {/* Desktop Navigation - Center */}
                <div className="navbar-links">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <Link to="/main" className="nav-link">
                        Quiz
                    </Link>
                    <Link to="/dashboard" className="nav-link">
                        Dashboard
                    </Link>
                </div>

                {/* User Menu - Right */}
                <div className="user-button">
                    <SignedIn>
                        <UserButton 
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "user-button",
                                },
                            }}
                        />
                    </SignedIn>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="mobile-menu-button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu size={24} />
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="mobile-menu">
                        <Link 
                            to="/" 
                            className="mobile-nav-link"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/main" 
                            className="mobile-nav-link"
                            onClick={() => setIsOpen(false)}
                        >
                            Quiz
                        </Link>
                        <Link 
                            to="/dashboard" 
                            className="mobile-nav-link"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <div className="mobile-menu-divider">
                            <SignedIn>
                                <div className="user-button">
                                    <UserButton 
                                        afterSignOutUrl="/"
                                        appearance={{
                                            elements: {
                                                userButtonAvatarBox: "user-button",
                                            },
                                        }}
                                    />
                                </div>
                            </SignedIn>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
} 