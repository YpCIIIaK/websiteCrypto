import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Section from "./section";

const CustomButton = ({ variant = "solid", size = "lg", startContent, children }) => {
    const baseStyles = `
    relative inline-flex items-center justify-center box-border appearance-none select-none
    whitespace-nowrap subpixel-antialiased overflow-hidden
    transition-transform duration-200 ease-in-out
    px-6 min-w-24 h-12 text-base font-medium rounded-2xl
    hover:opacity-80 active:scale-95
  `;

    const variantStyles = {
        solid: {
            backgroundColor: "#3B82F6", // primary-500
            color: "#ffffff", // primary-foreground
        },
        bordered: {
            backgroundColor: "transparent",
            border: "2px solid #3B82F6", // primary-500
            color: "#3B82F6", // primary-500
        },
    };

    return (
        <button
            className={baseStyles}
            style={variantStyles[variant]}
        >
            {startContent && (
                <span className="mr-3 [&>svg]:max-w-8 rounded-lg focus:ring-">{startContent}</span>
            )}
            {children}
        </button>
    );
};

export const HeroSection = () => {
    return (
        <Section id="hero" className="py-50">
            <div className="text-center relative z-10">
                <motion.div
                    initial={{ opacity:0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-2 flex justify-center"
                >
          <span
              className="px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center"
              style={{
                  backgroundColor: "rgba(59, 130, 246, 0.1)", // bg-blue-500/10 (primary-500: #3b82f6)
                  color: "#93c5fd", // text-blue-400 (primary-300)
              }}
          >
            <Icon icon="lucide:zap" className="mr-1.5" />
            Currently in development
          </span>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
          <span
              className="bg-clip-text text-transparent"
              style={{
                  backgroundImage: "linear-gradient(to right, #3b82f6, #FFD700)", // gradient-text (primary: #3b82f6, accent: #FFD700)
              }}
          >
            Manage cryptocurrencies with AI
          </span>
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
                    style={{ color: "#d1d5db" }} // text-gray-300
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Track prices, test strategies, automate trading.
                </motion.p>

                <motion.div
                    className="flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <CustomButton
                        variant="solid"
                        size="lg"
                        startContent={<Icon icon="lucide:rocket" />}
                    >
                        Start for free
                    </CustomButton>
                    <CustomButton
                        variant="bordered"
                        size="lg"
                        startContent={<Icon icon="lucide:play" />}
                    >
                        View the demo
                    </CustomButton>
                </motion.div>

                <motion.div
                    className="mt-16 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <div
                        className="flex items-center gap-8 px-6 py-3 rounded-2xl backdrop-blur-md"
                        style={{ backgroundColor: "rgba(15, 23, 42, 0.4)" }} // bg-content1/40 (content1: #0F172A)
                    >
                        <div className="flex items-center gap-2">
                            <Icon icon="lucide:shield-check" style={{ color: "#34d399" }} /> {/* text-green-400 */}
                            <span className="text-sm" style={{ color: "#d1d5db" }}>
                Safety
              </span>
                        </div>
                        <div className="h-6 w-px" style={{ backgroundColor: "#4b5563" }}></div> {/* bg-gray-700 */}
                        <div className="flex items-center gap-2">
                            <Icon icon="lucide:clock" style={{ color: "#93c5fd" }} /> {/* text-blue-400 (primary-300) */}
                            <span className="text-sm" style={{ color: "#d1d5db" }}>
                24/7 support
              </span>
                        </div>
                        <div className="h-6 w-px" style={{ backgroundColor: "#4b5563" }}></div>
                        <div className="flex items-center gap-2">
                            <Icon icon="lucide:users" style={{ color: "#a855f7" }} /> {/* text-purple-400 */}
                            <span className="text-sm" style={{ color: "#d1d5db" }}>
                50K+ users
              </span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div
                className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl"
                style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }} // bg-blue-500/20 (primary-500)
            ></div>
            <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
                style={{ backgroundColor: "rgba(168, 85, 247, 0.1)" }} // bg-purple-500/10
            ></div>
        </Section>
    );
};

export default HeroSection;