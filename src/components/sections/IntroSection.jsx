import { motion, AnimatePresence } from 'framer-motion';
import Button from "../buttons/Button.jsx";
import Section from "./Section.jsx";

const IntroSection = () => (
    <Section id="intro">
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-8">
            <div className="max-w-prose text-left">
                <motion.h1
                    className="text-3xl md:text-4xl font-bold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Оптимизируй трейдинг с <span className="text-[#FFD700]">автоматизацией</span>
                </motion.h1>
                <motion.p
                    className="mt-4 text-base text-gray-300 sm:text-lg/relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Создавай ботов, тестируй стратегии и отслеживай рынок в реальном времени для максимальной прибыли.
                </motion.p>
                <motion.div
                    className="mt-6 flex gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Button text="Начать сейчас" />
                    <Button text="Узнать больше" variant="secondary" />
                </motion.div>
            </div>
            <motion.div
                className="mt-8 md:mt-0 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="w-64 h-48 bg-gray-600 rounded-lg flex items-center justify-center text-gray-300">
                    [Placeholder для изображения]
                </div>
            </motion.div>
        </div>
    </Section>
);

export default IntroSection;