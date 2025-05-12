import Section from "./Section.jsx";
import Accordion from "../accordion/Accordeon.jsx";

const FAQSection = () => (
    <Section id="faq">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Часто задаваемые вопросы</h2>
        <div className="dark:bg-gray-800 rounded-md p-5">
            <Accordion
                question="Нужны ли навыки программирования для создания бота?"
                answer="Нет, наша платформа имеет интуитивный интерфейс, где вы можете настроить бота без кода. Для продвинутых пользователей есть API."
            />
            <Accordion
                question="Какие биржи поддерживаются?"
                answer="Мы поддерживаем Binance, Kraken, Coinbase и ещё 100+ популярных бирж."
            />
            <Accordion
                question="Есть ли пробный период?"
                answer="Да, вы можете попробовать все функции бесплатно в течение 14 дней."
            />
        </div>
    </Section>
);

export default FAQSection;