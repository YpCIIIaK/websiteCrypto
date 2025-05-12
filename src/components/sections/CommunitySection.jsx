import Button from "../buttons/Button.jsx";
import Section from "./Section.jsx";
import LandingCard from "../cards/LandingCard.jsx";

const CommunitySection = () => (
    <Section id="community" background="bg-[#133752]/80">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Присоединяйся к нам</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LandingCard
                title="Сообщество"
                description="Общайся с трейдерами в Discord и Telegram."
                tag="community"
                links={[{ href: "#", text: "discord.com" }, { href: "#", text: "t.me" }]}
            />
            <LandingCard
                title="Поддержка 24/7"
                description="Наша команда готова помочь в любое время."
                tag="support"
                links={[{ href: "#", text: "support.platform.com" }]}
            />
            <LandingCard
                title="Обучение"
                description="Доступ к видеоурокам и документации."
                tag="education"
                links={[{ href: "#", text: "docs.platform.com" }]}
            />
        </div>
        <div className="text-center mt-12">
            <Button text="Присоединиться" />
        </div>
    </Section>
);

export default CommunitySection;