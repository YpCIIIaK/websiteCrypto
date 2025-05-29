import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

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

const CustomButton = ({ variant = "solid", startContent, children, className = "" }) => {
    const baseStyles = `
    relative inline-flex items-center justify-center box-border appearance-none select-none
    whitespace-nowrap subpixel-antialiased overflow-hidden
    transition-transform duration-200 ease-in-out
    px-6 min-w-24 h-12 text-base font-medium rounded-2xl
    focus:outline-none focus:ring-0
    hover:opacity-80 active:scale-95
    ${className}
  `;

    const variantStyles = {
        solid: {
            backgroundColor: "#3B82F6", // primary-500
            color: "#ffffff", // primary-foreground
        },
    };

    return (
        <button
            className={baseStyles}
            style={variantStyles[variant]}
        >
            {startContent && (
                <span className="mr-3 [&>svg]:max-w-8">{startContent}</span>
            )}
            {children}
        </button>
    );
};

const CustomInput = ({ placeholder, type, startContent, className = "" }) => {
    return (
        <div className={`flex items-center w-full sm:w-auto h-12 ${className}`}>
            <div className="relative flex items-center w-full h-full">
                {startContent && (
                    <span className="absolute left-3">{startContent}</span>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full h-full text-base font-normal pl-10 pr-3 rounded-2xl bg-content2/50 border border-gray-700 hover:bg-content2 focus:outline-none focus:ring-0"
                    style={{
                        backgroundColor: "rgba(30, 41, 59, 0.5)", // bg-content2/50
                        borderColor: "#4b5563", // border-gray-700
                        color: "#d1d5db", // text-gray-300
                    }}
                />
            </div>
        </div>
    );
};

const CustomDivider = ({ className = "" }) => {
    return (
        <hr
            className={`my-8 ${className}`}
            style={{ backgroundColor: "#1f2937" }} // bg-gray-800
        />
    );
};

export const Footer = () => {
    const footerSections = [
        {
            title: "Platform",
            links: [
                { text: "Monitoring", href: "#" },
                { text: "Backtesting", href: "#" },
                { text: "Trading Bots", href: "#" },
                { text: "API", href: "#" },
            ],
        },
        {
            title: "Community",
            links: [
                { text: "Discord", href: "#" },
                { text: "Telegram", href: "#" },
                { text: "Forum", href: "#" },
            ],
        },
        {
            title: "Resources",
            links: [
                { text: "Blog", href: "#" },
                { text: "Documentation", href: "#" },
                { text: "Video Tutorials", href: "#" },
            ],
        },
        {
            title: "Legal Information",
            links: [
                { text: "Privacy Policy", href: "#" },
                { text: "Terms of Use", href: "#" },
                { text: "Refund Policy", href: "#" },
            ],
        },
        {
            title: "Download",
            links: [
                { text: "Trading Guide", href: "#" },
                { text: "Strategy Templates", href: "#" },
            ],
        },
    ];

    const socialLinks = [
        { icon: "logos:discord-icon", label: "Discord", href: "#" },
        { icon: "logos:telegram", label: "Telegram", href: "#" },
        { icon: "logos:twitter", label: "Twitter", href: "#" },
        { icon: "logos:github-icon", label: "GitHub", href: "#" },
        { icon: "logos:youtube-icon", label: "YouTube", href: "#" },
    ];

    return (
        <footer
            className="pt-16 pb-8"
            style={{
                backgroundColor: "rgba(15, 23, 42, 0.4)", // bg-content1/40
                borderTopColor: "rgba(255, 255, 255, 0.1)", // border-white/10
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{
                                    backgroundImage: "linear-gradient(to bottom right, #3B82F6, #FFD700)", // from-blue-500 to-crypto-accent
                                }}
                            >
                                <Icon icon="lucide:bitcoin" className="text-white" />
                            </div>
                            <span
                                className="text-xl font-bold"
                                style={{ color: "#FFD700" }} // text-crypto-accent
                            >
                CryptoPlatform
              </span>
                        </div>

                        <h3
                            className="text-2xl font-bold mb-4"
                            style={{ color: "#ffffff" }} // text-white
                        >
                            Get the latest news!
                        </h3>
                        <p
                            className="mb-6"
                            style={{ color: "#d1d5db" }} // text-gray-300
                        >
                            Subscribe to keep up to date with platform updates, new strategies, and market trends.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <CustomInput
                                type="email"
                                placeholder="your@email.com"
                                startContent={<Icon icon="lucide:mail" style={{ color: "#9ca3af" }} />} // text-default-400
                            />
                            <CustomButton
                                variant="solid"
                                className="font-medium"
                                startContent={<Icon icon="lucide:send" />}
                            >
                                Subscribe
                            </CustomButton>
                        </div>

                        <p
                            className="mt-4 text-xs"
                            style={{ color: "#9ca3af" }} // text-gray-400
                        >
                            We care about the security of your data. They are protected and not used for commercial purposes.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-4 grid grid-cols-2 md:grid-cols-5 gap-8"
                    >
                        {footerSections.map((section, index) => (
                            <div key={index} className="col-span-1">
                                <h4
                                    className="font-semibold mb-4"
                                    style={{ color: "#ffffff" }} // text-white
                                >
                                    {section.title}
                                </h4>
                                <ul className="space-y-3">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <CustomLink
                                                href={link.href}
                                                className="text-sm transition-colors text-white"
                                                style={{ color: "#9ca3af" }} // text-gray-400
                                                underline="hover"
                                            >
                                                {link.text}
                                            </CustomLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 flex flex-wrap justify-center gap-6 "
                >
                    {socialLinks.map((social, index) => (
                        <CustomLink
                            key={index}
                            href={social.href}
                            isExternal
                            className="p-3 rounded-full transition-colors"
                            style={{
                                backgroundColor: "rgba(30, 41, 59, 0.5)", // bg-content2/50
                            }}
                            title={social.label}
                        >
                            <Icon icon={social.icon} className="text-xl" />
                        </CustomLink>
                    ))}
                </motion.div>

                <CustomDivider />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p
                        className="text-sm"
                        style={{ color: "#9ca3af" }} // text-gray-400
                    >
                        © 2025 CryptoPlatform. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-white">
                        <CustomLink
                            href="#"
                            className="text-sm transition-colors"
                            style={{ color: "#9ca3af" }} // text-gray-400
                            underline="hover"
                        >
                            Terms and Conditions
                        </CustomLink>
                        <CustomLink
                            href="#"
                            className="text-sm transition-colors"
                            style={{ color: "#9ca3af" }} // text-gray-400
                            underline="hover"
                        >
                            Privacy policy
                        </CustomLink>
                        <CustomLink
                            href="#"
                            className="text-sm transition-colors"
                            style={{ color: "#9ca3af" }} // text-gray-400
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