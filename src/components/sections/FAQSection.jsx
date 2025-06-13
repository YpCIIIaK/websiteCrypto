import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Section from "./Section";

const CustomAccordion = ({ children, className = "" }) => {
    return <div className={`flex flex-col gap-4 ${className}`}>{children}</div>;
};

const CustomAccordionItem = ({ ariaLabel, title, children, indicator }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`relative bg-opacity-40 backdrop-blur-md border border-opacity-10 rounded-xl p-4 transition-all duration-300 ${
                isOpen ? "bg-opacity-60" : ""
            }`}
            style={{
                backgroundColor: isOpen ? "rgba(15, 23, 42, 0.6)" : "rgba(15, 23, 42, 0.4)", // bg-content1/60 when open, bg-content1/40 when closed
                borderColor: "rgba(255, 255, 255, 0.1)", // border-white/10
            }}
            aria-label={ariaLabel}
        >
            <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="text-lg font-medium text-white">{title}</div>
                {indicator && indicator({ isOpen })}
            </button>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="text-white pb-2">{children}</div>
                </motion.div>
            )}
        </div>
    );
};

export const FAQSection = () => {
    const faqItems = [
        {
            question: "Do I need programming skills to create a bot?",
            answer: "No, our platform has an intuitive interface where you can set up a bot without coding. For advanced users, we offer an API and the ability to write custom scripts in Python and JavaScript.",
        },
        {
            question: "Which exchanges are supported?",
            answer: "We support Binance, Kraken, Coinbase, KuCoin, Huobi, and other popular exchanges. We regularly add new platforms based on user requests.",
        },
        {
            question: "How is the security of my funds ensured?",
            answer: "We do not store your cryptocurrencies. The platform operates via API keys with limited permissions (trading only, no withdrawals). All connections are encrypted, and data is stored securely.",
        },
        {
            question: "What is the minimum amount to start trading?",
            answer: "The minimum amount depends on the chosen exchange and trading pair. For most exchanges, it's equivalent to 10-50 USD. We recommend starting with an amount you're comfortable using for learning.",
        },
    ];

    return (
        <Section id="faq" className="py-24 relative">
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
                    FAQ
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
                    <span style={{ color: "var(--success)" }}>
                        Frequently Asked Questions
                    </span>
                </h2>
                <p
                    className="text-xl max-w-2xl mx-auto"
                    style={{ color: "#d1d5db" }}
                >
                    Answers to the most common questions about our platform
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-3xl mx-auto relative z-10"
            >
                <CustomAccordion className="gap-4">
                    {faqItems.map((item, index) => (
                        <CustomAccordionItem
                            key={index}
                            ariaLabel={item.question}
                            title={item.question}
                            indicator={({ isOpen }) => (
                                <Icon
                                    icon={isOpen ? "lucide:minus-circle" : "lucide:plus-circle"}
                                    className="text-xl"
                                    style={{ color: "var(--success)" }}
                                />
                            )}
                        >
                            <div style={{ color: "#d1d5db" }}>{item.answer}</div> {/* text-gray-300 */}
                        </CustomAccordionItem>
                    ))}
                </CustomAccordion>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-10 text-center"
                >
                    <p
                        className="mb-4"
                        style={{ color: "#d1d5db" }} // text-gray-300
                    >
                        Didn't find the answer to your question?
                    </p>
                    <div className="inline-flex items-center transition-colors">
                        <Icon
                            icon="lucide:message-circle"
                            className="mr-2"
                            style={{ color: "#93c5fd" }} // text-blue-400
                        />
                        <span
                            className="font-medium hover:text-blue-300"
                            style={{ color: "#93c5fd" }} // text-blue-400, hover:text-blue-300
                        >
              Contact support
            </span>
                    </div>
                </motion.div>
            </motion.div>
        </Section>
    );
};

export default FAQSection;
