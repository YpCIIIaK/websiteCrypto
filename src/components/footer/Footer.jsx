import React from "react";
import { motion } from "framer-motion";

const CustomLink = ({ href, className = "", children, underline = "none", isExternal = false }) => {
    return (
        <a
            href={href}
            className={`${className} ${underline === "hover" ? "hover:underline" : ""}`}
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
            {children}
        </a>
    );
};

const CustomDivider = ({ className = "" }) => {
    return (
        <hr
            className={`my-6 ${className}`}
            style={{ backgroundColor: "#1f2937" }} // bg-gray-800
        />
    );
};

export const Footer = () => {
    const navLinks = [
        { text: "Tickers", href: "/" },
        { text: "Backtest", href: "/backtest" },
        { text: "Bots", href: "/bots" },
    ];

    const contactLinks = [
        { text: "baikurazov@vortan.org", href: "mailto:baikurazov@vortan.org" },
        { text: "vladimirov@vortan.org", href: "mailto:vladimirov@vortan.org" },
    ];

    return (
        <footer
            className="pt-8 pb-6"
            style={{
                backgroundColor: "rgba(15, 23, 42, 0.4)", // bg-content1/40
                borderTopColor: "rgba(255, 255, 255, 0.1)", // border-white/10
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:col-span-1"
                    >
                        <div className="flex items-center gap-2 mb-4">
              <span
                  className="text-xl font-bold"
                  style={{ color: "#FFD700" }} // text-crypto-accent
              >
                Vortan
              </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-1"
                    >
                        <h4
                            className="font-semibold mb-3 text-white"
                            style={{ color: "#ffffff" }} // text-white
                        >
                            Navigation
                        </h4>
                        <ul className="space-y-2 text-white">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <CustomLink
                                        href={link.href}
                                        className="text-sm transition-colors"
                                        style={{ color: "#ffffff" }} // text-white
                                        underline="hover"
                                    >
                                        {link.text}
                                    </CustomLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-1"
                    >
                        <h4
                            className="font-semibold mb-3 text-white"
                            style={{ color: "#ffffff" }} // text-white
                        >
                            Contact Us
                        </h4>
                        <ul className="space-y-2 text-white">
                            {contactLinks.map((link, index) => (
                                <li key={index}>
                                    <CustomLink
                                        href={link.href}
                                        className="text-sm transition-colors"
                                        style={{ color: "#ffffff" }} // text-white
                                        underline="hover"
                                        isExternal
                                    >
                                        {link.text}
                                    </CustomLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <CustomDivider />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p
                        className="text-sm"
                        style={{ color: "#ffffff" }} // text-white
                    >
                        © 2025 Vortan. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-white">
                        <CustomLink
                            href="#"
                            className="text-sm transition-colors"
                            style={{ color: "#ffffff" }} // text-white
                            underline="hover"
                        >
                            Terms and Conditions
                        </CustomLink>
                        <CustomLink
                            href="#"
                            className="text-sm transition-colors"
                            style={{ color: "#ffffff" }} // text-white
                            underline="hover"
                        >
                            Privacy Policy
                        </CustomLink>
                        <CustomLink
                            href="#"
                            className="text-sm transition-colors"
                            style={{ color: "#ffffff" }} // text-white
                            underline="hover"
                        >
                            Cookies
                        </CustomLink>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;