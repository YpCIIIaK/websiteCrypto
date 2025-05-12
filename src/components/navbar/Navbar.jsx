import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Компонент навигационной панели
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // Состояние мобильного меню
    const [isLanguageOpen, setIsLanguageOpen] = useState(false); // Состояние дропдауна языка

    // Список языков (упрощён для компактности)
    const languages = [
        {
            name: 'English (US)',
            flag: (
                <svg className="h-3.5 w-3.5 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="#bd3d44" d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)" />
                    <path fill="#fff" d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)" />
                    <path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)" />
                </svg>
            ),
            code: 'en',
        },
        { name: 'Deutsch', flag: <svg className="h-3.5 w-3.5 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffce00" d="M0 341.3h512V512H0z" /><path d="M0 0h512v170.7H0z" /><path fill="#d00" d="M0 170.7h512v170.6H0z" /></svg>, code: 'de' },
        { name: 'Italiano', flag: <svg className="h-3.5 w-3.5 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M0 0h512v512H0z" /><path fill="#009246" d="M0 0h170.7v512H0z" /><path fill="#ce2b37" d="M341.3 0H512v512H341.3z" /></svg>, code: 'it' },
        { name: '中文 (繁體)', flag: <svg className="h-3.5 w-3.5 rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#de2910" d="M0 0h512v512H0z" /><path fill="#ffde00" d="M128 128l76.8 0 0 76.8-76.8 0z" /><path fill="#ffde00" d="M142.6 47l25.6 0 0 25.6-25.6 0z" transform="rotate(-121)" /><path fill="#ffde00" d="M198 82l25.6 0 0 25.6-25.6 0z" transform="rotate(-98.1)" /><path fill="#ffde00" d="M272.4 114l25.6 0 0 25.6-25.6 0z" transform="rotate(-74)" /><path fill="#ffde00" d="M256 230.4l16-19.968 19.968 16-16 19.968z" /></svg>, code: 'zh' },
    ];

    return (
        <motion.nav
            className="bg-[#133752]/80 shadow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Логотип */}
                    <Link to="/" className="block text-[#FFD700]">
                        <span className="mr-7">CryptoPlatform</span>
                    </Link>

                    {/* Десктопное меню */}
                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        <nav aria-label="Global" className="hidden md:flex items-center gap-6 text-sm">
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                <Link to="/tickers" className="text-gray-300 hover:text-[#FFD700] transition">
                                    Tickers
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                <Link to="/backtest" className="text-gray-300 hover:text-[#FFD700] transition">
                                    Backtest
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                <Link to="/bots" className="text-gray-300 hover:text-[#FFD700] transition">
                                    Bots
                                </Link>
                            </motion.div>
                        </nav>

                        {/* Поиск, кнопки и выбор языка */}
                        <div className="flex items-center gap-4">
                            {/* Поиск */}
                            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                  </svg>
                </span>
                                <input
                                    type="text"
                                    className="py-2 pl-10 pr-4 text-gray-300 bg-[#133752]/80 border border-gray-600 rounded-lg focus:border-[#00D4B4] focus:outline-none focus:ring focus:ring-[#00D4B4]/40"
                                    placeholder="Search"
                                />
                            </div>
                            <div className="relative flex items-center gap-2 sm:gap-4">
                                {/* Кнопки */}
                                <motion.a
                                    href="#"
                                    className="block rounded-md bg-[#00D4B4] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#00BFA5]"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login
                                </motion.a>
                                <motion.a
                                    href="#"
                                    className="hidden sm:block rounded-md bg-transparent border border-[#FFD700] px-5 py-2.5 text-sm font-medium text-[#FFD700] transition hover:bg-[#FFD700] hover:text-[#133752]"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Register
                                </motion.a>
                                {/* Дропдаун языка */}
                                <motion.button
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-[#133752]/80"
                                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {languages[0].flag}
                                    <span className="ml-2">{languages[0].name}</span>
                                </motion.button>
                                <AnimatePresence>
                                    {isLanguageOpen && (
                                        <motion.div
                                            className="absolute right-0 top-full mt-2 z-50 w-48 py-2 text-sm bg-[#133752]/80 rounded-lg shadow-lg border border-gray-600"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {languages.map((lang) => (
                                                <Link
                                                    key={lang.code}
                                                    to={`?lang=${lang.code}`}
                                                    className="block px-4 py-2 text-gray-300 hover:bg-[#133752] hover:text-[#FFD700]"
                                                    onClick={() => setIsLanguageOpen(false)}
                                                >
                                                    <div className="inline-flex items-center">
                                                        {lang.flag}
                                                        <span className="ml-2">{lang.name}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            {/* Кнопка мобильного меню */}
                            <button
                                className="md:hidden rounded-sm bg-[#133752]/80 p-2.5 text-gray-300 hover:text-[#FFD700] transition"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span className="sr-only">Toggle menu</span>
                                {!isOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Мобильное меню */}
                <motion.div
                    className={`md:hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex flex-col px-2 py-4 bg-[#133752]/80">
                        <Link
                            to="/tickers"
                            className="px-2.5 py-2 text-gray-300 hover:bg-[#133752] hover:text-[#FFD700] rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Tickers
                        </Link>
                        <Link
                            to="/backtest"
                            className="px-2.5 py-2 text-gray-300 hover:bg-[#133752] hover:text-[#FFD700] rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Backtest
                        </Link>
                        <Link
                            to="/bots"
                            className="px-2.5 py-2 text-gray-300 hover:bg-[#133752] hover:text-[#FFD700] rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Bots
                        </Link>
                        {/* Мобильный дропдаун языка */}
                        <div className="relative px-2.5 py-2">
                            <button
                                className="inline-flex items-center w-full px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-[#133752]/80"
                                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                            >
                                {languages[0].flag}
                                <span className="ml-2">{languages[0].name}</span>
                            </button>
                            <AnimatePresence>
                                {isLanguageOpen && (
                                    <motion.div
                                        className="mt-2 w-full py-2 text-sm bg-[#133752]/80 rounded-lg shadow-lg border border-gray-600"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {languages.map((lang) => (
                                            <Link
                                                key={lang.code}
                                                to={`?lang=${lang.code}`}
                                                className="block px-4 py-2 text-gray-300 hover:bg-[#133752] hover:text-[#FFD700]"
                                                onClick={() => {
                                                    setIsLanguageOpen(false);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                <div className="inline-flex items-center">
                                                    {lang.flag}
                                                    <span className="ml-2">{lang.name}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
};

export default Navbar;