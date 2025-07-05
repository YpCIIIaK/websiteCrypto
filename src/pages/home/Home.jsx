import React from 'react';
import WhatIsVortanSection from '../../components/sections/WhatIsVortanSection.jsx';
import ProductFeaturesSection from '../../components/sections/ProductFeaturesSection.jsx';
import WhoIsForSection from '../../components/sections/WhoIsForSection.jsx';
import TeamSection from '../../components/sections/TeamSection.jsx';
import ContactAboutSection from '../../components/sections/ContactAboutSection.jsx';
import PricingSummarySection from '../../components/sections/PricingSummarySection.jsx';

const Home = () => {
  return (
    <div className="bg-brand text-text-base">
      <WhatIsVortanSection />
      <ProductFeaturesSection />
      <WhoIsForSection />
      <TeamSection />
      <PricingSummarySection />
      <ContactAboutSection />
    </div>
  );
};

export default Home;