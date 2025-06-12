import { motion } from 'framer-motion';

const Button = ({ text, variant = 'primary', onClick }) => {
    const baseStyles = 'px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-sm';
    const variants = {
        primary: 'bg-[var(--success)] text-white hover:bg-[#1e9e4a] border-2 border-[var(--success)]',
        secondary: 'bg-white text-[var(--success)] border-2 border-[var(--success)] hover:bg-[var(--success)] hover:text-white',
    };
    return (
        <motion.button
            className={`${baseStyles} ${variants[variant]}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
        >
            {text}
        </motion.button>
    );
};

export default Button;