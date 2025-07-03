import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Section from "../sections/Section"; // Adjusted to common/Section
import LandingCard from "../cards/LandingCardComm.jsx"; // Fixed import
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Filler } from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Filler);

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
            style={{ backgroundColor: 'var(--success)', color: '#fff' }}
        >
            {startContent && (
                <span className="mr-3 [&>svg]:max-w-8 rounded-lg focus:ring-" style={{ color: '#fff' }}>{startContent}</span>
            )}
            {children}
        </button>
    );
};

export const ChartSection = () => {
    const chartFeatures = {
        icon: "lucide:line-chart",
        iconColor: "blue",
        title: "Real-Time Charting",
        description: "Visualize market trends, AI predictions, and trading signals with interactive charts powered by advanced analytics.",
        tag: "charts",
        links: [{ href: "#", text: "charts.platform.com" }],
        socialIcons: [
            { icon: "lucide:bar-chart-2", label: "Analytics" },
            { icon: "lucide:cpu", label: "AI" },
        ],
    };

    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "BTC/USD",
                data: [65000, 67000, 69000, 68000, 70000, 72000],
                borderColor: "#3B82F6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                fill: true,
                tension: 0.4,
            },
            {
                label: "AI Prediction",
                data: [65500, 67500, 69500, 68500, 71000, 73000],
                borderColor: "#FFD700",
                backgroundColor: "rgba(255, 215, 0, 0.2)",
                fill: true,
                tension: 0.4,
                borderDash: [5, 5],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allow chart to fill container height
        plugins: {
            legend: {
                labels: {
                    color: "#d1d5db", // text-gray-300
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#d1d5db", // text-gray-300
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)", // border-white/10
                },
            },
            y: {
                ticks: {
                    color: "#d1d5db", // text-gray-300
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)", // border-white/10
                },
            },
        },
    };

    return (
        <Section id="charts" className="py-10 relative">
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
                    Charts & Analytics
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
                    <span style={{ color: "var(--success)" }}>
                        Visualize Your Progress with charts
                    </span>
                </h2>
                <p
                    className="text-xl text-gray-300 max-w-2xl mx-auto"
                    style={{ color: "#d1d5db" }}
                >
                    Explore real-time data and AI-driven insights through interactive charting tools
                </p>
            </motion.div>

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex"
                >
                    <div className="bg-gray-900/20 backdrop-blur-md border border-gray-600 rounded-xl p-6 w-full h-96">
                        <div className="text-gray-300 mb-4">BTC/USD Price Trend (Mock)</div>
                        <div className="relative h-80">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex"
                >
                    <LandingCard
                        icon={chartFeatures.icon}
                        iconColor={chartFeatures.iconColor}
                        title={chartFeatures.title}
                        description={chartFeatures.description}
                        tag={chartFeatures.tag}
                        links={chartFeatures.links}
                        socialIcons={chartFeatures.socialIcons}
                        delay={0.4}
                    />
                </motion.div>
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
                    startContent={<Icon icon="lucide:line-chart" style={{ color: '#fff' }} />}
                >
                    Get Started with Charts
                </CustomButton>
            </motion.div>
        </Section>
    );
};

export default ChartSection;