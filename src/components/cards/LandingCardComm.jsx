import React from "react";
import { motion } from "framer-motion";
import { Card, Link, Badge } from "@heroui/react";
import { Icon } from "@iconify/react";

export const LandingCard = ({
                                icon,
                                iconColor,
                                title,
                                description,
                                tag,
                                links = [],
                                socialIcons = [],
                                delay = 0
                            }) => {
    const getIconColorClass = (color) => {
        const colorMap = {
            blue: "bg-blue-500/10 text-blue-400",
            purple: "bg-purple-500/10 text-purple-400",
            green: "bg-green-500/10 text-green-400",
            amber: "bg-amber-500/10 text-amber-400",
            red: "bg-red-500/10 text-red-400"
        };

        return colorMap[color] || colorMap.blue;
    };

    const getTagColor = (tag) => {
        const tagMap = {
            "ai-insights": "primary",
            "analytics": "secondary",
            "automation": "success"
        };

        return tagMap[tag] || "default";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 + delay }}
        >
            <Card className="crypto-card bg-content1/40 backdrop-blur-md border border-white/10 p-6 h-full text-white">
                <div className="flex items-center justify-between mb-6">
                    <div className={`rounded-xl p-3 ${getIconColorClass(iconColor)}`}>
                        <Icon icon={icon} className="text-2xl" style={{ color: iconColor === 'green' ? '#fff' : '#22C55E' }} />
                    </div>
                    {tag && (
                        <span
                            className={`px-4 py-1.5 rounded-full text-xs font-bold inline-flex items-center shadow ml-2 ${
                                tag === 'ai-insights' || tag === 'charts' ? 'bg-blue-500/10 text-blue-400' : tag === 'analytics' ? 'bg-purple-500/10 text-purple-400' : tag === 'automation' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                            }`}
                            style={{ letterSpacing: '0.05em' }}
                        >
                            {tag.replace('-', ' ')}
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="mb-6">{description}</p>

                {links.length > 0 && (
                    <div className="mt-auto pt-4 border-t border-gray-800 flex items-center text-sm">
                        <span className="mr-2">Explore on:</span>
                        <div className="flex items-center flex-wrap gap-2">
                            {links.map((link, index) => (
                                <React.Fragment key={index}>
                                    <Link
                                        href={link.href}
                                        color="primary"
                                        underline="hover"
                                        isExternal
                                        showAnchorIcon
                                        className="text-white"
                                    >
                                        {link.text}
                                    </Link>
                                    {index < links.length - 1 && <span className="text-white/60">or</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}

                {socialIcons.length > 0 && (
                    <div className="flex justify-center mt-4 gap-4">
                        {socialIcons.map((social, index) => (
                            <div key={index} className="p-2 rounded-full bg-content2 text-white">
                                <Icon icon={social.icon} className="text-xl" style={{ color: '#22C55E' }} />
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </motion.div>
    );
};

export default LandingCard;
