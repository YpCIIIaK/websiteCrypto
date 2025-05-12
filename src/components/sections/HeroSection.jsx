import { motion, AnimatePresence } from 'framer-motion';
import Section from "./Section.jsx";
import Button from "../buttons/Button.jsx";

const HeroSection = () => (
    <Section id="hero">
        <div className="text-center text-white">
            <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Управляй криптовалютами с умом
            </motion.h1>
            <motion.p
                className="text-lg md:text-xl mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                Отслеживай цены, тестируй стратегии, автоматизируй торговлю.
            </motion.p>
            <div className="flex justify-center gap-4">
                <Button text="Начать бесплатно" />
                <Button text="Посмотреть демо" variant="secondary" />
            </div>
        </div>
    </Section>
);

export default HeroSection;