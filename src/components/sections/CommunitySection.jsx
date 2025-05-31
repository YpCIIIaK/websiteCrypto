import React from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Section from "./Section";
import LandingCard from "../cards/LandingCardComm.jsx";

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

export const AISection = () => {
    const aiItems = [
        {
            icon: "lucide:brain-circuit",
            color: "blue",
            title: "AI-Powered Insights",
            description: "Leverage advanced AI models to predict market trends and make data-driven trading decisions with confidence.",
            tag: "ai-insights",
            links: [{ href: "#", text: "ai.platform.com" }],
            socialIcons: [
                { icon: "lucide:cpu", label: "AI Models" },
                { icon: "logos:github-icon", label: "GitHub" },
            ],
        },
        {
            icon: "lucide:bar-chart-2",
            color: "purple",
            title: "Advanced Analytics",
            description: "Access real-time analytics with customizable dashboards to monitor market data and optimize your strategies.",
            tag: "analytics",
            links: [{ href: "#", text: "analytics.platform.com" }],
            socialIcons: [
                { icon: "lucide:line-chart", label: "Dashboards" },
                { icon: "lucide:file-text", label: "Docs" },
            ],
        },
        {
            icon: "lucide:bot",
            color: "green",
            title: "Automated Trading",
            description: "Deploy AI-driven trading bots that execute strategies 24/7, adapting to market changes in real-time.",
            tag: "automation",
            links: [{ href: "#", text: "api.platform.com" }],
            socialIcons: [
                { icon: "lucide:code", label: "API" },
                { icon: "lucide:settings", label: "Automation" },
            ],
        },
    ];

    return (
        <Section id="ai" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-crypto-dark/0 via-crypto-dark to-crypto-dark/0"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 mb-16 text-center"
            >
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
          AI & Analytics
        </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage: "linear-gradient(to right, #3B82F6, #FFD700)", // gradient-text
                        }}
                    >

                 Empower Your Trading with AI
          </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Harness cutting-edge AI and analytics to elevate your crypto trading
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {aiItems.map((item, index) => (
                    <LandingCard
                        key={index}
                        icon={item.icon}
                        iconColor={item.color}
                        title={item.title}
                        description={item.description}
                        tag={item.tag}
                        links={item.links}
                        socialIcons={item.socialIcons}
                        delay={index * 0.2}
                    />
                ))}
            </div>

            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.6, delay: 0.6}}
                className="text-center mt-16 relative z-10"
            >
                <CustomButton
                    variant="solid"
                    size="lg"
                    className="px-8"
                    startContent={<Icon icon="lucide:brain"/>}
                >
                    Get Started with AI
                </CustomButton>
            </motion.div>

            {/* Stats section */}
            <motion.div
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                viewport={{once: true}}
                transition={{duration: 0.8, delay: 0.4}}
                className="mt-24 relative z-10"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-content1/30 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                        <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">10+</div>
                        <div className="text-gray-300">AI Models</div>
                    </div>
                    <div className="bg-content1/30 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                        <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">A lot of)</div>
                        <div className="text-gray-300">Data Points</div>
                    </div>
                    <div className="bg-content1/30 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                        <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">97%</div>
                        <div className="text-gray-300">AI Accuracy</div>
                    </div>
                    <div className="bg-content1/30 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                        <div className="text-3xl md:text-4xl font-bold text-crypto-accent mb-2">5+</div>
                        <div className="text-gray-300">Exchanges</div>
                    </div>
                </div>
            </motion.div>

            {/* Background elements */}
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full filter blur-3xl"></div>
        </Section>
    );
};

export default AISection;
