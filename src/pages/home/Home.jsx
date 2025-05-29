import React, { useState } from 'react';
import HeroSection from "../../components/sections/HeroSection.jsx";
import FeaturesSection from "../../components/sections/FeaturesSection.jsx";
import FAQSection from "../../components/sections/FAQSection.jsx";
import CommunitySection from "../../components/sections/CommunitySection.jsx";
import FinalCTASection from "../../components/sections/FinalCTASection.jsx";
import IntroSection from "../../components/sections/IntroSection.jsx";

function EducationSection() {
    return null;
}

const Home = () => {

    return (
        <div>
            <HeroSection />
            <IntroSection />
            <FeaturesSection />
            <CommunitySection />
            <FAQSection />
        </div>
    );
};

export default Home;