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
    shadow-lg
  `;

    const variantStyles = {
        solid: {
            backgroundColor: "var(--success)",
            color: "#fff",
        },
        flat: {
            backgroundColor: "rgba(34, 197, 94, 0.10)",
            color: "var(--success)",
            fontWeight: "bold",
            textShadow: "0 1px 2px rgba(36,81,53,0.08)",
        },
    };

    return (
        <button
            className={baseStyles}
            style={variantStyles[variant]}
        >
            {startContent && (
                <span className="mr-3 [&>svg]:max-w-8 rounded-lg focus:ring-" style={{ color: variant === 'solid' ? '#fff' : 'var(--success)' }}>{startContent}</span>
            )}
            <span style={variant !== 'solid' ? { color: 'var(--success)', fontWeight: 'bold', textShadow: '0 1px 2px rgba(36,81,53,0.08)', } : {}}>{children}</span>
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
        <Section id="intro" className="py-1 relative">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl z-0" style={{ backgroundColor: "rgba(34, 197, 94, 0.18)" }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl z-0" style={{ backgroundColor: "rgba(34, 197, 94, 0.12)" }}></div>
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
                            style={{ backgroundColor: "var(--success)" }}
                        ></div>
                        <span
                            className="font-medium"
                            style={{ color: "var(--success)" }}
                        >
              Automation
            </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
                        <span style={{ color: "var(--success)" }}>Optimize trading with automation</span>
                    </h2>

                    <p
                        className="text-lg mb-8 text-white drop-shadow"
                        style={{ color: "#fff" }}
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
                                style={{ backgroundColor: "rgba(34, 197, 94, 0.10)" }}
                            >
                                <Icon
                                    icon="lucide:trending-up"
                                    className="text-xl"
                                    style={{ color: '#22C55E' }}
                                />
                            </div>
                            <div>
                                <h4 className="font-medium mb-1 text-white">Profit growth</h4>
                                <p
                                    className="text-sm text-white/80"
                                    style={{ color: "#EAF7F0" }}
                                >
                                    Increase in ROI by 32%
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div
                                className="rounded-lg p-4"
                                style={{ backgroundColor: "rgba(34, 197, 94, 0.10)" }}
                            >
                                <Icon
                                    icon="lucide:shield"
                                    className="text-xl"
                                    style={{ color: '#22C55E' }}
                                />
                            </div>
                            <div>
                                <h4 className="font-medium mb-1 text-white">Safety</h4>
                                <p
                                    className="text-sm text-white/80"
                                    style={{ color: "#EAF7F0" }}
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
                            backgroundImage: "radial-gradient(circle, rgba(34, 197, 94, 0.2), transparent)",
                        }}
                    ></div>

                    <CustomCard className="relative z-10">
                        <div className="p-1">
                            <div
                                className="flex items-center gap-2 px-3 py-2 rounded-md mb-1"
                                style={{ backgroundColor: "#183923" }}
                            >
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-danger"></div>
                                    <div className="w-3 h-3 rounded-full bg-warn"></div>
                                    <div className="w-3 h-3 rounded-full bg-success"></div>
                                </div>
                                <div
                                    className="text-xs text-white/80"
                                    style={{ color: "#EAF7F0" }}
                                >
                                    trading-bot.js
                                </div>
                            </div>

                            <div
                                className="rounded-md p-4 font-mono text-sm"
                                style={{ backgroundColor: "#183923" }}
                            >
                                <div style={{ color: "#EAF7F0" }}>
                                    <span style={{ color: "var(--accent)" }}>const</span>{" "}
                                    <span style={{ color: "var(--success)" }}>tradingBot</span> = {"{"}
                                </div>
                                <div className="pl-4">
                                    <span style={{ color: "var(--accent)" }}>name</span>:{" "}
                                    <span style={{ color: "var(--warn)" }}>&quot;BTC Trader&quot;</span>,
                                </div>
                                <div className="pl-4">
                                    <span style={{ color: "var(--accent)" }}>strategy</span>:{" "}
                                    <span style={{ color: "var(--warn)" }}>&quot;MACD Crossover&quot;</span>,
                                </div>
                                <div className="pl-4">
                                    <span style={{ color: "var(--accent)" }}>assets</span>: [
                                    <span style={{ color: "var(--warn)" }}>&quot;BTC&quot;</span>,{" "}
                                    <span style={{ color: "var(--warn)" }}>&quot;ETH&quot;</span>],
                                </div>
                                <div className="pl-4">
                                    <span style={{ color: "var(--accent)" }}>interval</span>:{" "}
                                    <span style={{ color: "var(--danger)" }}>15</span>,
                                </div>
                                <div className="pl-4">
                                    <span style={{ color: "var(--accent)" }}>async</span>{" "}
                                    <span style={{ color: "var(--success)" }}>execute</span>() {"{"}
                                </div>
                                <div className="pl-8" style={{ color: "#EAF7F0" }}>
                                    <span style={{ color: "var(--accent)" }}>await</span>{" "}
                                    <span style={{ color: "var(--success)" }}>analyzeMarket</span>();
                                </div>
                                <div className="pl-8" style={{ color: "#EAF7F0" }}>
                                    <span style={{ color: "var(--accent)" }}>if</span> (signal ==={" "}
                                    <span style={{ color: "var(--warn)" }}>&quot;BUY&quot;</span>) {"{"}
                                </div>
                                <div className="pl-12" style={{ color: "#EAF7F0" }}>
                                    <span style={{ color: "var(--success)" }}>executeTrade</span>(type:{" "}
                                    <span style={{ color: "var(--warn)" }}>&quot;BUY&quot;</span>);
                                </div>
                                <div className="pl-8" style={{ color: "#EAF7F0" }}>
                                    {"}"}
                                </div>
                                <div className="pl-4" style={{ color: "#EAF7F0" }}>
                                    {"}"}
                                </div>
                                <div style={{ color: "#EAF7F0" }}>{"}"}</div>
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