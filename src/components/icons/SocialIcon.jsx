import { motion, AnimatePresence } from 'framer-motion';

const SocialIcon = ({ svgPath, label, color = '#22C55E' }) => (
    <motion.a
        href="#"
        className="hover:opacity-80"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
        aria-label={label}
    >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color }}>
            {svgPath}
        </svg>
    </motion.a>
);

export default SocialIcon;