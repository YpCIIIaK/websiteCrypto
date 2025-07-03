import React from "react";
import { motion } from "framer-motion";

const Section = ({ id, children, background = "", className = "" }) => {
    // Map custom background classes to inline styles
    const backgroundStyles = {
        "bg-crypto-primary": { backgroundColor: "#3B82F6" },
        "bg-crypto-secondary": { backgroundColor: "#1E293B" },
        "bg-crypto-accent": { backgroundColor: "#FFD700" },
        "bg-crypto-dark": { backgroundColor: "#0F172A" },
        "bg-crypto-darker": { backgroundColor: "#020617" },
        "bg-content1": { backgroundColor: "#0F172A" },
        "bg-content2": { backgroundColor: "#1E293B" },
        "bg-content3": { backgroundColor: "#334155" },
        "bg-content4": { backgroundColor: "#475569" },
    };

    const appliedBackground = backgroundStyles[background] || {};

    return (
        <section
            id={id}
            className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
            style={appliedBackground}
        >
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto"
            >
                {children}
            </motion.div>
        </section>
    );
};

export default Section;