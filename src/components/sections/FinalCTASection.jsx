import { motion, AnimatePresence } from 'framer-motion';
import Button from "../buttons/Button.jsx";

const FinalCTASection = () => (
    <motion.section
        id="final-cta"
        className="py-16 bg-[#133752]/80"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
    >
        <div className="max-w-6xl mx-auto px-4 xl:flex xl:items-center">
            <div className="xl:w-0 xl:flex-1">
                <motion.h2
                    className="text-2xl font-bold text-white sm:text-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Начни <span className="text-[#FFD700]">зарабатывать</span> с криптовалютой
                </motion.h2>
                <motion.p
                    className="max-w-3xl mt-3 text-lg text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Зарегистрируйся, чтобы отслеживать рынок, тестировать стратегии и автоматизировать трейдинг. Без лишних данных — только твой успех.
                </motion.p>
            </div>
            <motion.div
                className="mt-8 sm:max-w-md xl:mt-0 xl:ml-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="mt-3 rounded-md">
                    <Button text="Зарегистрироваться" />
                </div>
                <p className="mt-3 text-sm text-gray-300">
                    Мы заботимся о безопасности твоих данных. Они защищены и не используются в коммерческих целях.
                </p>
                <p className="mt-2 text-sm text-gray-300">
                    Для получения уведомлений дай браузеру соответствующие разрешения.
                </p>
            </motion.div>
        </div>
    </motion.section>
);

export default FinalCTASection;