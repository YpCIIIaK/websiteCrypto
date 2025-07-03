import { motion, AnimatePresence } from 'framer-motion';

const FooterLink = ({ href, text }) => (
    <li>
        <motion.a
            href={href}
            className="text-gray-300 hover:text-[#FFD700] transition"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            {text}
        </motion.a>
    </li>
);

export default FooterLink;