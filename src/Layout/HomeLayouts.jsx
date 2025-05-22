import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Banner from '../Components/Banner';
import Features from '../Components/Features';
import Faq from '../Components/Faq';
import Footer from '../Components/Footer';
import Benifit from '../Components/Benifit';
import AllGroup from '../Components/AllGroup';

const HomeLayouts = () => {
  const location = useLocation();
  const isServiceDetailsPage = location.pathname.startsWith('/services/');

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        {isServiceDetailsPage ? (
          <Outlet />
        ) : (
          <>
            <Banner />
            <Features />
            <div id="benifit-section">
              <Benifit />
            </div>
            <div id="subscription-services">
              <AllGroup />
            </div>
            <div id="faq-section">
              <Faq />
            </div>
          </>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayouts;