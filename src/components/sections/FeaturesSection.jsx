import Section from "./Section.jsx";
import Button from "../buttons/Button.jsx";
import LandingCard from "../cards/LandingCard.jsx";

const FeaturesSection = () => (
    <Section id="features" background="bg-[#133752]/80">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Наши возможности</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LandingCard
                title="Мониторинг криптовалют"
                description="Отслеживай цены и тренды на 100+ биржах в реальном времени."
                tag="real-time"
                links={[{ href: "#", text: "binance.com" }]}
            />
            <LandingCard
                title="Бэктестинг"
                description="Тестируй стратегии на исторических данных и оптимизируй прибыль."
                tag="strategy"
                links={[{ href: "#", text: "docs.platform.com" }]}
            />
            <LandingCard
                title="Торговые боты"
                description="Настраивай автоматизированные стратегии для торговли 24/7."
                tag="automation"
                links={[{ href: "#", text: "api.platform.com" }]}
            />
        </div>
        <div className="text-center mt-12">
            <Button text="Попробовать сейчас" />
        </div>
    </Section>
);

export default FeaturesSection;