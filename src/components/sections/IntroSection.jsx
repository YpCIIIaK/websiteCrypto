import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Section from "./Section";

const CustomButton = ({ variant = "solid", size = "lg", startContent, children }) => {
    const baseStyles = `
    relative inline-flex items-center justify-center box-border appearance-none select-none
    whitespace-nowrap subpixel-antialiased overflow-hidden
    transition-transform duration-200 ease-in-out
    px-6 min-w-24 h-12 text-base font-medium rounded-2xl
    focus:outline-none focus:ring-0
    hover:opacity-80 active:scale-95
  `;

    const variantStyles = {
        solid: {
            backgroundColor: "#3B82F6", // primary-500
            color: "#ffffff", // primary-foreground
        },
        flat: {
            backgroundColor: "rgba(59, 130, 246, 0.1)", // primary-500/10
            color: "#3B82F6", // primary-500
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

const CustomCard = ({ className = "", children }) => {
    return (
        <div
            className={`relative bg-opacity-40 backdrop-blur-md border border-opacity-10 rounded-2xl overflow-hidden ${className}`}
            style={{
                backgroundColor: "rgba(15, 23, 42, 0.4)", // bg-content1/40
                borderColor: "rgba(255, 255, 255, 0.1)", // border-white/10
            }}
        >
            {children}
        </div>
    );
};

export const IntroSection = () => {
    return (
        <Section id="intro" className="py-1">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    className="max-w-xl"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-6 flex items-center gap-2">
                        <div
                            className="h-px w-12"
                            style={{ backgroundColor: "#3B82F6" }} // bg-blue-500 (primary-500)
                        ></div>
                        <span
                            className="font-medium"
                            style={{ color: "#93c5fd" }} // text-blue-400 (primary-300)
                        >
              Automation
            </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        <span style={{ color: "#FFD700" }}>Optimize trading with automation</span> {/* text-crypto-accent */}
                    </h2>

                    <p
                        className="text-lg mb-8"
                        style={{ color: "#d1d5db" }} // text-gray-300
                    >
                        Create bots, test strategies and monitor the market in real time with AI prediction for maximum profit. Our platform provides all the necessary tools for successful trading.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <CustomButton
                            variant="solid"
                            size="lg"
                            startContent={<Icon icon="lucide:arrow-right" />}
                        >
                            Start now
                        </CustomButton>
                        <CustomButton
                            variant="flat"
                            size="lg"
                            startContent={<Icon icon="lucide:info" />}
                        >
                            View more
                        </CustomButton>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                            <div
                                className="rounded-lg p-4"
                                style={{ backgroundColor: "rgba(22, 163, 74, 0.1)" }} // bg-green-500/10
                            >
                                <Icon
                                    icon="lucide:trending-up"
                                    className="text-xl"
                                    style={{ color: "#34d399" }} // text-green-400
                                />
                            </div>
                            <div>
                                <h4 className="font-medium mb-1 text-white">Profit growth</h4>
                                <p
                                    className="text-sm"
                                    style={{ color: "#9ca3af" }} // text-gray-400
                                >
                                    Increase in ROI by 32%
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div
                                className="rounded-lg p-4"
                                style={{ backgroundColor: "rgba(22, 163, 74, 0.1)" }} // bg-green-500/10
                            >
                                <Icon
                                    icon="lucide:shield"
                                    className="text-xl"
                                    style={{ color: "#34d399" }} // text-green-400
                                />
                            </div>
                            <div>
                                <h4 className="font-medium mb-1 text-white">Safety</h4>
                                <p
                                    className="text-sm"
                                    style={{ color: "#9ca3af" }} // text-gray-400
                                >
                                    Transparency
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div
                        className="absolute inset-0 rounded-full blur-2xl"
                        style={{
                            backgroundImage: "radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent)", // bg-gradient-radial from-blue-500/20
                        }}
                    ></div>

                    <CustomCard className="relative z-10">
                        <div className="p-1">
                            <div
                                className="flex items-center gap-2 px-3 py-2 rounded-md mb-1"
                                style={{ backgroundColor: "#1E293B" }} // bg-content2
                            >
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div
                                    className="text-xs"
                                    style={{ color: "#9ca3af" }} // text-gray-400
                                >
                                    trading-bot.js
                                </div>
                            </div>

                            <div
                                className="rounded-md p-4 font-mono text-sm"
                                style={{ backgroundColor: "#1E293B" }} // bg-content2
                            >
                                <div style={{ color: "#9ca3af" }}>
                                    <span style={{ color: "#93c5fd" }}>const</span>{" "}
                                    <span style={{ color: "#34d399" }}>tradingBot</span> = {"{"}
                                </div>
                                <div className="pl-4">
                                    <span style={{ color: "#a855f7" }}>name</span>:{" "}
                                    <span style={{ color: "#fef08a" }}>"BTC Trader"</span>,
                                </div>
                                <div className="pl-4">
                                    <span style={{ color: "#a855f7" }}>strategy</span>:{" "}
                                    <span style={{ color: "#fef08a" }}>"MACD Crossover"</span>,
                                </div>
                                <div className="pl-4">
                                    <span style={{ color: "#a855f7" }}>assets</span>: [
                                    <span style={{ color: "#fef08a" }}>"BTC"</span>,{" "}
                                    <span style={{ color: "#fef08a" }}>"ETH"</span>],
                                </div>
                                <div className="pl-4">
                                    <span style={{ color: "#a855f7" }}>interval</span>:{" "}
                                    <span style={{ color: "#fb923c" }}>15</span>,
                                </div>
                                <div className="pl-4">
                                    <span style={{ color: "#93c5fd" }}>async</span>{" "}
                                    <span style={{ color: "#34d399" }}>execute</span>() {"{"}
                                </div>
                                <div className="pl-8" style={{ color: "#d1d5db" }}>
                                    <span style={{ color: "#93c5fd" }}>await</span>{" "}
                                    <span style={{ color: "#34d399" }}>analyzeMarket</span>();
                                </div>
                                <div className="pl-8" style={{ color: "#d1d5db" }}>
                                    <span style={{ color: "#93c5fd" }}>if</span> (signal ==={" "}
                                    <span style={{ color: "#fef08a" }}>"BUY"</span>) {"{"}
                                </div>
                                <div className="pl-12" style={{ color: "#d1d5db" }}>
                                    <span style={{ color: "#34d399" }}>executeTrade</span>(type:{" "}
                                    <span style={{ color: "#fef08a" }}>"BUY"</span>);
                                </div>
                                <div className="pl-8" style={{ color: "#d1d5db" }}>
                                    {"}"}
                                </div>
                                <div className="pl-4" style={{ color: "#d1d5db" }}>
                                    {"}"}
                                </div>
                                <div style={{ color: "#d1d5db" }}>{"}"}</div>
                            </div>
                        </div>
                    </CustomCard>

                    <div
                        className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-30 blur-2xl"
                        style={{
                            backgroundImage:
                                "conic-gradient(from 180deg at 50% 50%, #FFD700, #3B82F6, #a855f7)", // bg-gradient-conic from-crypto-accent via-blue-500 to-purple-500
                        }}
                    ></div>
                </motion.div>
            </div>
        </Section>
    );
};

export default IntroSection;