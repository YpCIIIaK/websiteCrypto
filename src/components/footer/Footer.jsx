import { motion, AnimatePresence } from 'framer-motion';
import Button from "../buttons/Button.jsx";
import FooterLink from "../buttons/FooterLink.jsx";
import SocialIcon from "../icons/SocialIcon.jsx";


const Footer = () => {
    const socialIcons = [
        {
            label: "Facebook",
            href: "#",
            svgPath: (
                <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                />
            ),
        },
        {
            label: "Twitter",
            href: "#",
            svgPath: (
                <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                />
            ),
        },
        {
            label: "GitHub",
            href: "#",
            svgPath: (
                <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                />
            ),
        },
    ];

    return (
        <footer className="bg-[#133752] flex justify-center items-center h-screen">
            <div className="max-w-6xl mx-auto px-4">
                <div className="lg:flex lg:items-start lg:gap-8">
                    <motion.div
                        className="text-[#00D4B4] text-2xl font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        CryptoPlatform
                    </motion.div>
                    <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
                        <motion.div
                            className="col-span-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold text-white">Получай свежие новости!</h2>
                            <p className="mt-4 text-gray-300">
                                Подпишись, чтобы быть в курсе обновлений платформы, новых стратегий и рыночных трендов.
                            </p>
                        </motion.div>
                        <motion.div
                            className="col-span-2 lg:col-span-3 lg:flex lg:items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div className="w-full">
                                <label htmlFor="UserEmail" className="sr-only">Email</label>
                                <div className="border border-gray-600 p-2 sm:flex sm:items-center sm:gap-4 rounded-lg">
                                    <input
                                        type="email"
                                        id="UserEmail"
                                        placeholder="your@email.com"
                                        className="w-full bg-transparent border-none text-white placeholder-gray-300 focus:ring-0 sm:text-sm"
                                    />
                                    <Button text="Подписаться" />
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="col-span-2 sm:col-span-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <p className="font-medium text-white">Платформа</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <FooterLink href="#" text="Мониторинг" />
                                <FooterLink href="#" text="Бэктестинг" />
                                <FooterLink href="#" text="Торговые боты" />
                                <FooterLink href="#" text="API" />
                            </ul>
                        </motion.div>
                        <motion.div
                            className="col-span-2 sm:col-span-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <p className="font-medium text-white">Сообщество</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <FooterLink href="#" text="Discord" />
                                <FooterLink href="#" text="Telegram" />
                                <FooterLink href="#" text="Форум" />
                            </ul>
                        </motion.div>
                        <motion.div
                            className="col-span-2 sm:col-span-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.0 }}
                        >
                            <p className="font-medium text-white">Ресурсы</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <FooterLink href="#" text="Блог" />
                                <FooterLink href="#" text="Документация" />
                                <FooterLink href="#" text="Видеоуроки" />
                            </ul>
                        </motion.div>
                        <motion.div
                            className="col-span-2 sm:col-span-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        >
                            <p className="font-medium text-white">Юридическая информация</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <FooterLink href="#" text="Политика конфиденциальности" />
                                <FooterLink href="#" text="Условия использования" />
                                <FooterLink href="#" text="Политика возврата" />
                            </ul>
                        </motion.div>
                        <motion.div
                            className="col-span-2 sm:col-span-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.4 }}
                        >
                            <p className="font-medium text-white">Скачать</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <FooterLink href="#" text="Руководство по трейдингу" />
                                <FooterLink href="#" text="Шаблоны стратегий" />
                            </ul>
                        </motion.div>
                        <motion.ul
                            className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.6 }}
                        >
                            {socialIcons.map((icon, index) => (
                                <li key={index}>
                                    <SocialIcon svgPath={icon.svgPath} label={icon.label} href={icon.href} />
                                </li>
                            ))}
                        </motion.ul>
                    </div>
                </div>
                <motion.div
                    className="mt-8 border-t border-gray-600 pt-8 sm:flex sm:justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                >
                    <p className="text-xs text-gray-300">© 2025 CryptoPlatform. Все права защищены.</p>
                    <ul className="mt-4 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
                        <FooterLink href="#" text="Условия и положения" />
                        <FooterLink href="#" text="Политика конфиденциальности" />
                        <FooterLink href="#" text="Cookies" />
                    </ul>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;