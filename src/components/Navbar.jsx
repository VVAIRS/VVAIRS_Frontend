import React, { useState } from 'react';
import { Menu, X, User, LogOut, LogIn, UserPlus, Home } from 'lucide-react';

// NOTE: All navigation is now handled using standard <a> tags with explicit href paths
// or buttons with the 'onLogout' handler. This avoids conflicts with external router setups.

// --- Sub-Component: Navbar (Header) ---
const Navbar = ({
    isLoggedIn = false, // True/False state for conditional rendering
    onLogout = () => console.log('Logout attempted'),
    // navigateTo prop is no longer used, as all navigation is handled via standard <a> tags
    logoUrl = "/src/assets/airs-logo.png"
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false); // Helper to close menu on click

    // Custom class for the shining gray buttons (using Tailwind CSS)
    const buttonClass = (isPrimary = false) =>
        `flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition duration-300 ease-in-out shadow-md 
        transform hover:scale-[1.02] hover:shadow-xl
        ${isPrimary
            // Darker Gray/Primary Button (Dashboard/Sign Up)
            ? 'bg-gray-700 text-white border border-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-70'
            // Lighter Gray/Secondary Button (Login/Logout)
            : 'bg-gray-200 text-gray-800 border border-gray-300 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-70'
        }`;

    const navLinkClass = "text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition duration-150";

    // Content for the right side of the Navbar, conditional on login status
    const AuthControls = ({ className, isMobile = false }) => {
        const baseClass = isMobile ? 'w-full' : '';
        const [isProfileOpen, setIsProfileOpen] = useState(false);

        if (isLoggedIn) {
            return (
                <div className={`${className} relative`}>
                    {/* 2. PROFILE DROPDOWN */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            aria-label="User Menu"
                        >
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
                                <User className="w-4 h-4" />
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                                <a
                                    href="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => { setIsProfileOpen(false); closeMenu(); }}
                                >
                                    Your Profile
                                </a>
                                <button
                                    onClick={() => { onLogout(); setIsProfileOpen(false); closeMenu(); }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            );
        } else {
            // When not logged in: Show Login and Sign Up links (using <a> links)
            return (
                <div className={className}>
                    {/* Login Link - FIX: Using <a> tag with href="/login" */}
                    <a
                        href="/LoginPage"
                        onClick={closeMenu}
                        className={buttonClass(false) + ` ${baseClass}`}
                    >
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                    </a>

                    {/* Sign Up Link - FIX: Using <a> tag with href="/signup" */}
                    <a
                        href="/signup"
                        onClick={closeMenu}
                        className={buttonClass(true) + ` ${baseClass}`}
                    >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Sign Up
                    </a>
                </div>
            );
        }
    };


    return (
        <header className="fixed w-full z-20 bg-white/90 backdrop-blur-sm shadow-md">

            {/* Main Navigation (Desktop and Mobile Toggle) */}
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-20">

                    {/* Logo and Branding: Using <a> tag with href for routing to the homepage */}
                    <div className="flex items-center space-x-4">
                        <a href="/" className="flex items-center space-x-2 cursor-pointer">
                            <div className="w-8 h-8 flex items-center justify-center">
                                {/* Image tag using logoUrl prop and original classes */}
                                <img src={logoUrl} alt="AIRS Logo" className="w-full h-full object-contain filter invert" />
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                                VVAIRS<span className="text-indigo-500">.</span>
                            </span>
                        </a>
                    </div>

                    {/* Desktop Navigation Links and Buttons */}
                    <div className="hidden sm:flex sm:space-x-4 items-center">
                        {/* CONDITIONAL RENDERING: Links only show if NOT logged in */}
                        {!isLoggedIn && (
                            <>
                                {/* Anchor links for section navigation */}
                                <a href="#about" className={navLinkClass}>About Us</a>
                                <a href="#pricing" className={navLinkClass}>Pricing</a>
                            </>
                        )}

                        {/* Authentication Controls (Dynamic Content - always visible) */}
                        <AuthControls className="flex space-x-4 items-center" />
                    </div>

                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="sm:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-lg"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Content (Dropdown) */}
            <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute w-full bg-white shadow-xl border-t border-gray-100 pb-4`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {/* CONDITIONAL RENDERING: Links only show if NOT logged in */}
                    {!isLoggedIn && (
                        <>
                            <a href="#about" onClick={closeMenu} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">About Us</a>
                            <a href="#pricing" onClick={closeMenu} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Pricing</a>
                        </>
                    )}
                </div>

                <div className="pt-4 pb-3 border-t border-gray-200 space-y-2 px-4 flex flex-col">
                    {/* Mobile Authentication Controls */}
                    <AuthControls className="space-y-2 flex flex-col" isMobile={true} />
                </div>
            </div>
        </header>
    );
};

export default Navbar;