import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Section from "./Section";

const CustomButton = ({ variant = "solid", size = "lg", startContent, children, className = "" }) => {
    const baseStyles = `
    relative inline-flex items-center justify-center box-border appearance-none select-none
    whitespace-nowrap subpixel-antialiased overflow-hidden
    transition-transform duration-200 ease-in-out
    px-6 min-w-24 h-12 text-base font-medium rounded-2xl
    focus:outline-none focus:ring-0
    hover:opacity-80 active:scale-95
    shadow-lg
    ${className}
  `;

    const variantStyles = {
        solid: {
            backgroundColor: "var(--success)",
            color: "#fff",
        },
    };

    return (
        <button
            className={baseStyles}
            style={variantStyles[variant]}
        >
            {startContent && (
                <span className="mr-3 [&>svg]:max-w-8 rounded-lg focus:ring-" style={{ color: '#fff' }}>{startContent}</span>
            )}
            <span style={{ color: '#fff' }}>{children}</span>
        </button>
    );
};

const CustomLandingCard = ({ icon, iconColor, title, description, tag, links, delay }) => {
    const iconColorStyles = {
        blue: "var(--accent)",
        purple: "var(--brand-light)",
        green: "var(--success)",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="relative bg-opacity-40 backdrop-blur-md border border-success rounded-2xl p-6"
            style={{
                backgroundColor: "rgba(34, 197, 94, 0.10)",
                borderColor: "var(--success)",
            }}
        >
            <div className="flex items-center gap-3 mb-4">
                <Icon
                    icon={icon}
                    className="text-2xl"
                    style={{ color: iconColor === 'green' ? '#fff' : '#22C55E' }}
                />
                <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                        backgroundColor: "rgba(34, 197, 94, 0.12)",
                        color: "var(--success)",
                    }}
                >
          {tag}
        </span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">{title}</h3>
            <p
                className="text-base mb-4 text-white/90"
                style={{ color: "#EAF7F0" }}
            >
                {description}
            </p>
            <div className="flex flex-wrap gap-2">
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className="text-sm hover:underline font-bold"
                        style={{ color: "var(--success)" }}
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
            links: [{ href: "/", text: "tickers" }],
        },
        {
            icon: "lucide:history",
            color: "purple",
            title: "Backtesting",
            description: "Test strategies on historical data and optimize profits with advanced analytics.",
            tag: "strategy",
            links: [{ href: "/backtest", text: "backtest" }],
        },
        {
            icon: "lucide:bot",
            color: "green",
            title: "Trading Bots",
            description: "Set up automated trading strategies for 24/7 trading without constant monitoring.",
            tag: "automation",
            links: [{ href: "/bots", text: "bots" }],
        },
    ];

    return (
        <Section id="features" className="py-24 relative">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl z-0" style={{ backgroundColor: "rgba(34, 197, 94, 0.18)" }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl z-0" style={{ backgroundColor: "rgba(34, 197, 94, 0.12)" }}></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 mb-16 text-center"
            >
                <span
                    className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4"
                    style={{ backgroundColor: "rgba(34,197,94,0.12)", color: "var(--success)" }}
                >
                    Opportunities
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
                    <span style={{ color: "var(--success)" }}>
                        Our capabilities
                    </span>
                </h2>
                <p
                    className="text-xl max-w-2xl mx-auto"
                    style={{ color: "#d1d5db" }}
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
        </Section>
    );
};

export default FeaturesSection;
