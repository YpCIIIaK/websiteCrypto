import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Section from "./section";

const CustomButton = ({ variant = "solid", size = "lg", startContent, children, className = "" }) => {
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

const CustomLandingCard = ({ icon, iconColor, title, description, tag, links, delay }) => {
    const iconColorStyles = {
        blue: "#93c5fd", // text-blue-400
        purple: "#a855f7", // text-purple-400
        green: "#34d399", // text-green-400
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="relative bg-opacity-40 backdrop-blur-md border border-opacity-10 rounded-2xl p-6"
            style={{
                backgroundColor: "rgba(15, 23, 42, 0.4)", // bg-content1/40
                borderColor: "rgba(255, 255, 255, 0.1)", // border-white/10
            }}
        >
            <div className="flex items-center gap-3 mb-4">
                <Icon
                    icon={icon}
                    className="text-2xl"
                    style={{ color: iconColorStyles[iconColor] }}
                />
                <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                        backgroundColor: "rgba(59, 130, 246, 0.1)", // bg-blue-500/10
                        color: "#93c5fd", // text-blue-400
                    }}
                >
          {tag}
        </span>
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p
                className="text-base mb-4"
                style={{ color: "#d1d5db" }} // text-gray-300
            >
                {description}
            </p>
            <div className="flex flex-wrap gap-2">
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className="text-sm hover:underline"
                        style={{ color: "#93c5fd" }} // text-blue-400
                    >
                        {link.text}
                    </a>
                ))}
            </div>
        </motion.div>
    );
};

export const FeaturesSection = () => {
    const features = [
        {
            icon: "lucide:line-chart",
            color: "blue",
            title: "Cryptocurrency Monitoring",
            description: "Track prices and trends on a different exchanges in real-time with analytics and notifications.",
            tag: "real-time",
            links: [{ href: "#", text: "binance.com" }],
        },
        {
            icon: "lucide:history",
            color: "purple",
            title: "Backtesting",
            description: "Test strategies on historical data and optimize profits with advanced analytics.",
            tag: "strategy",
            links: [{ href: "#", text: "docs.platform.com" }],
        },
        {
            icon: "lucide:bot",
            color: "green",
            title: "Trading Bots",
            description: "Set up automated trading strategies for 24/7 trading without constant monitoring.",
            tag: "automation",
            links: [{ href: "#", text: "api.platform.com" }],
        },
    ];

    return (
        <Section id="features" className="py-24 relative">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: "linear-gradient(to bottom, rgba(15, 23, 42, 0), #0F172A, rgba(15, 23, 42, 0))", // bg-gradient-to-b from-crypto-dark/0 via-crypto-dark to-crypto-dark/0
                }}
            ></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 mb-16 text-center"
            >
        <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{
                backgroundColor: "rgba(59, 130, 246, 0.1)", // bg-blue-500/10
                color: "#93c5fd", // text-blue-400
            }}
        >
          Opportunities
        </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage: "linear-gradient(to right, #3B82F6, #FFD700)", // gradient-text
                        }}
                    >
           Our capabilities
          </span>
                </h2>
                <p
                    className="text-xl max-w-2xl mx-auto"
                    style={{ color: "#d1d5db" }} // text-gray-300
                >
                    A set of tools for cryptocurrency bot creation with AI implementation
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-white">
                {features.map((feature, index) => (
                    <CustomLandingCard
                        key={index}
                        icon={feature.icon}
                        iconColor={feature.color}
                        title={feature.title}
                        description={feature.description}
                        tag={feature.tag}
                        links={feature.links}
                        delay={index * 0.2}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mt-16 relative z-10"
            >
                <CustomButton
                    variant="solid"
                    size="lg"
                    className="px-8"
                    startContent={<Icon icon="lucide:rocket" />}
                >
                    Try now
                </CustomButton>
            </motion.div>

            <div
                className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl"
                style={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }} // bg-blue-500/5
            ></div>
            <div
                className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl"
                style={{ backgroundColor: "rgba(168, 85, 247, 0.05)" }} // bg-purple-500/5
            ></div>
        </Section>
    );
};

export default FeaturesSection;