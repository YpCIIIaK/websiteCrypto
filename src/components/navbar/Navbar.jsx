import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

const CustomLink = ({ to, className = "", children, underline = "none" }) => {
    return (
        <Link
            to={to}
            className={`${className} ${underline === "hover" ? "hover:underline" : ""}`}
        >
            {children}
        </Link>
    );
};

const CustomButton = ({
                          variant = "solid",
                          size = "lg",
                          startContent,
                          endContent,
                          children,
                          className = "",
                          as: Component = "button",
                          to,
                      }) => {
    const sizeStyles = {
        lg: "px-6 min-w-24 h-12 text-base",
        sm: "px-4 min-w-16 h-8 text-sm",
    };

    const baseStyles = `
    relative inline-flex items-center justify-center box-border appearance-none select-none
    whitespace-nowrap subpixel-antialiased overflow-hidden
    transition-transform duration-200 ease-in-out
    font-medium rounded-2xl
    focus:outline-none focus:ring-0
    hover:opacity-80 active:scale-95
    ${sizeStyles[size]}
    ${className}
  `;

    const variantStyles = {
        solid: {
            backgroundColor: "var(--success)", // фирменный зелёный
            color: "#fff",
            fontWeight: 700,
            border: 'none',
        },
        flat: {
            backgroundColor: "rgba(59, 130, 246, 0.1)", // primary-500/10
            color: "#3B82F6", // primary-500
        },
        bordered: {
            backgroundColor: "#fff",
            border: "2px solid var(--success)",
            color: "var(--success)",
            fontWeight: 700,
        },
        light: {
            backgroundColor: "transparent",
            color: "#d1d5db", // text-gray-300
        },
    };

    const props = Component === Link ? { to } : {};

    return (
        <Component
            className={baseStyles}
            style={variantStyles[variant]}
            {...props}
        >
            {startContent && (
                <span className="mr-3 [&>svg]:max-w-8">{startContent}</span>
            )}
            {children}
            {endContent && (
                <span className="ml-3 [&>svg]:max-w-8">{endContent}</span>
            )}
        </Component>
    );
};

const CustomInput = ({ placeholder, type, startContent, className = "" }) => {
    return (
        <div className={`flex items-center max-w-full sm:max-w-[12rem] h-10 ${className}`}>
            <div className="relative flex items-center w-full h-full">
                {startContent && (
                    <span className="absolute left-3">{startContent}</span>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full h-full text-sm font-normal pl-10 pr-3 rounded-2xl bg-content2/50 hover:bg-content2 border-none focus:outline-none focus:ring-0"
                    style={{
                        backgroundColor: "rgba(30, 41, 59, 0.5)", // bg-content2/50
                        color: "#6b7280", // text-default-500
                    }}
                />
            </div>
        </div>
    );
};

const CustomDropdown = ({ trigger, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48"
                >
                    {children}
                </motion.div>
            )}
        </div>
    );
};

const CustomDropdownTrigger = ({ children }) => {
    return <div>{children}</div>;
};

const CustomDropdownMenu = ({ children, className = "" }) => {
    return (
        <div
            className={`bg-content2/80 backdrop-blur-md rounded-xl p-2 ${className}`}
            style={{ backgroundColor: "rgba(30, 41, 59, 0.8)" }} // bg-content2/80
        >
            {children}
        </div>
    );
};

const CustomDropdownItem = ({ children, startContent, description, key, onClick, className = "" }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full flex items-center justify-start rounded-xl px-4 py-2 text-accent border border-accent bg-surface hover:bg-accent hover:text-surface transition-colors text-base ${className}`}
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--accent)", color: "var(--accent)" }}
            key={key}
        >
            {startContent && <span className="mr-3">{startContent}</span>}
            <span className="flex-1 text-left">{children}</span>
            {description && (
                <span className="text-xs text-muted ml-2" style={{ color: "#9ca3af" }}>{description}</span>
            )}
        </button>
    );
};

const CustomNavbar = ({ children, className = "" }) => {
    return (
        <nav
            className={`relative w-full ${className}`}
            style={{
                backgroundColor: "#245135" // brand
            }}
        >
            <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
        </nav>
    );
};

const CustomNavbarBrand = ({ children }) => {
    return <div className="flex items-center">{children}</div>;
};

const CustomNavbarContent = ({ children, justify = "start", className = "" }) => {
    const justifyStyles = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
    };
    return (
        <div
            className={`flex items-center ${justifyStyles[justify]} ${className}`}
        >
            {children}
        </div>
    );
};

const CustomNavbarItem = ({ children, className = "" }) => {
    return <div className={`flex items-center ${className}`}>{children}</div>;
};

const NavbarComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const languages = [
        { name: "English (US)", icon: "logos:usa", code: "en" },
        { name: "Deutsch", icon: "logos:germany", code: "de" },
        { name: "Italiano", icon: "logos:italy", code: "it" },
        { name: "中文 (繁體)", icon: "logos:china", code: "zh" },
    ];

    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full fixed top-0 z-50"
        >
            <CustomNavbar>
                <CustomNavbarBrand>
                    <CustomLink to="/" className="flex items-center gap-2">
                        <p
                            className="font-bold text-xl"
                            style={{ color: "#22C55E" }} // success
                        >
                            Vortan
                        </p>
                    </CustomLink>
                </CustomNavbarBrand>

                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex z-10">
                    <CustomNavbarContent className="gap-8">
                        <CustomNavbarItem>
                            <CustomLink to="/tokens" className="text-gray-300 hover:text-crypto-accent transition-colors" underline="hover">Tokens</CustomLink>
                        </CustomNavbarItem>
                        <CustomNavbarItem>
                            <CustomLink to="/backtest" className="text-gray-300 hover:text-crypto-accent transition-colors" underline="hover">Backtest</CustomLink>
                        </CustomNavbarItem>
                        <CustomNavbarItem>
                            <CustomLink to="/bots" className="text-gray-300 hover:text-crypto-accent transition-colors" underline="hover">Bots</CustomLink>
                        </CustomNavbarItem>
                        <CustomNavbarItem>
                            <CustomLink to="/pricing" className="text-gray-300 hover:text-crypto-accent transition-colors" underline="hover">Pricing</CustomLink>
                        </CustomNavbarItem>
                    </CustomNavbarContent>
                </div>

                <CustomNavbarContent justify="end" className="hidden md:flex items-center gap-4">
                    <CustomNavbarItem>
                        <CustomButton
                            as={Link}
                            variant="solid"
                            size="sm"
                            to="/login"
                            className="font-medium"
                        >
                            Login
                        </CustomButton>
                    </CustomNavbarItem>

                    <CustomNavbarItem className="hidden sm:flex">
                        <CustomButton
                            as={Link}
                            variant="bordered"
                            size="sm"
                            to="/register"
                            className="font-medium"
                        >
                            Register
                        </CustomButton>
                    </CustomNavbarItem>
                </CustomNavbarContent>
            </CustomNavbar>
        </motion.div>
    );
};

export default NavbarComponent;

export { CustomDropdown, CustomDropdownMenu, CustomDropdownItem };