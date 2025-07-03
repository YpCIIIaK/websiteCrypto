import { motion, AnimatePresence } from 'framer-motion';

const Link = ({ href, text }) => (
    <motion.a
        href={href}
        className="text-[#FFD700] hover:underline"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
    >
        {text}
    </motion.a>
);

export default Link;