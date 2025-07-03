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
    hover:opacity-80 active:scale-95
    shadow-lg
  `;

    const variantStyles = {
        solid: {
            backgroundColor: "var(--success)",
            color: "#fff",
        },
        bordered: {
            backgroundColor: "#fff",
            border: "2px solid var(--success)",
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
                <span className="mr-3 [&>svg]:max-w-8 rounded-lg focus:ring-" style={variant === 'bordered' ? { color: 'var(--success)', fontWeight: 'bold', textShadow: '0 1px 2px rgba(36,81,53,0.08)', } : { color: variant === 'solid' ? '#fff' : 'var(--success)' }}>{startContent}</span>
            )}
            <span style={variant === 'bordered' ? { color: 'var(--success)', fontWeight: 'bold', textShadow: '0 1px 2px rgba(36,81,53,0.08)', } : {}}>{children}</span>
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
              className="px-4 py-1.5 rounded-full text-sm font-bold inline-flex items-center shadow"
              style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  color: "var(--success)",
              }}
          >
            <Icon icon="lucide:zap" className="mr-1.5" />
            Currently in development
          </span>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-lg"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
          <span
              className="bg-clip-text text-transparent"
              style={{
                  backgroundImage: "linear-gradient(to right, #fff, #22C55E)",
              }}
          >
            Manage cryptocurrencies with AI
          </span>
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-white drop-shadow"
                    style={{ color: "#fff" }}
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
                        className="flex items-center gap-8 px-6 py-3 rounded-2xl backdrop-blur-md shadow-lg"
                        style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
                    >
                        <div className="flex items-center gap-2">
                            <Icon icon="lucide:shield-check" style={{ color: '#22C55E' }} />
                            <span className="text-sm text-white">Safety</span>
                        </div>
                        <div className="h-6 w-px" style={{ backgroundColor: "var(--success)" }}></div>
                        <div className="flex items-center gap-2">
                            <Icon icon="lucide:clock" style={{ color: '#22C55E' }} />
                            <span className="text-sm text-white">24/7 support</span>
                        </div>
                        <div className="h-6 w-px" style={{ backgroundColor: "var(--success)" }}></div>
                        <div className="flex items-center gap-2">
                            <Icon icon="lucide:users" style={{ color: '#22C55E' }} />
                            <span className="text-sm text-white">50K+ users</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div
                className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl"
                style={{ backgroundColor: "rgba(34, 197, 94, 0.18)" }} // success/20
            ></div>
            <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
                style={{ backgroundColor: "rgba(34, 197, 94, 0.12)" }} // success/10
            ></div>
        </Section>
    );
};

export default HeroSection;
