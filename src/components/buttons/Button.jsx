import { motion, AnimatePresence } from 'framer-motion';

const Button = ({ text, variant = 'primary', onClick }) => {
    const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300';
    const variants = {
        primary: 'bg-[#00D4B4] text-white hover:bg-[#00BFA5]',
        secondary: 'bg-transparent border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#133752]',
    };
    return (
        <motion.button
            className={`${baseStyles} ${variants[variant]}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            {text}
        </motion.button>
    );
};

export default Button;