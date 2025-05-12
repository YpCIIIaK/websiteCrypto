import { motion } from 'framer-motion';

const Section = ({ children, id, background = 'bg-[#133752]' }) => (
    <motion.section
        id={id}
        className={`py-16 ${background}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
    >
        <div className="max-w-6xl mx-auto px-4">{children}</div>
    </motion.section>
);

export default Section;