import { motion, AnimatePresence } from 'framer-motion';
import SocialIcon from "../icons/SocialIcon.jsx";
import Link from "../buttons/Link.jsx";
import Tag from "../tag/Tag.jsx";

const LandingCard = ({ tag, title, description, links = [], socialIcons = [] }) => (
    <motion.div
        className="w-full max-w-sm dark:bg-gray-800 p-4 rounded-md shadow-lg text-white"
        whileHover={{ y: -5}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-light text-gray-300">Криптотрейдинг</span>
            {tag && <Tag text={tag} />}
        </div>
        <div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-300">{description}</p>
        </div>
        {links.length > 0 && (
            <div className="flex items-center mt-4 text-gray-300">
                <span className="mr-1">Посмотреть на:</span>
                {links.map((link, index) => (
                    <div key={index} className="flex items-center">
                        <Link href={link.href} text={link.text} />
                        {index < links.length - 1 && <span className="mx-2">или</span>}
                    </div>
                ))}
            </div>
        )}
        {socialIcons.length > 0 && (
            <div className="flex justify-center mt-4 gap-4">
                {socialIcons.map((icon, index) => (
                    <SocialIcon key={index} svgPath={icon.svgPath} label={icon.label} color="#22C55E" />
                ))}
            </div>
        )}
    </motion.div>
);

export default LandingCard;