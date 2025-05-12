import { motion, AnimatePresence } from 'framer-motion';

const SocialIcon = ({ svgPath, label }) => (
    <motion.a
        href="#"
        className="text-[#FFD700] hover:text-[#FFD700]/80"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
        aria-label={label}
    >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {svgPath}
        </svg>
    </motion.a>
);

export default SocialIcon;