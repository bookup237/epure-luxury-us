import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#ede5db] text-[#1a1a1a] border-t border-[#d8cdbf] mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          
          {/* 1. Brand Identity */}
          <div className="md:col-span-1">
            <h3 className="font-['Cormorant_Garamond'] text-2xl tracking-[0.2em] font-semibold text-[#1a1a1a] uppercase mb-2">
              ÉPURE
            </h3>
            <p className="text-xs text-[#5c5449] font-light leading-relaxed">
              {t('footer_tagline')}
            </p>
          </div>

          {/* 2. Navigation */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8b7355] mb-4">
              {t('footer_shop')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4a4339]">
              <li>
                <Link to="/" className="hover:text-black hover:underline transition-colors">{t('tab_all')}</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black hover:underline transition-colors">{t('tab_coats')}</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-black hover:underline transition-colors">{t('tab_cashmere')}</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-black hover:underline transition-colors">{t('nav_cart')}</Link>
              </li>
            </ul>
          </div>

          {/* 3. Major Services (US Standard) */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8b7355] mb-4">
              {t('footer_services')}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4a4339]">
              <li className="flex items-center gap-2">
                <span className="text-[#8b7355] font-bold">&#10003;</span>
                <span>{t('footer_service_1')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#8b7355] font-bold">&#10003;</span>
                <span>{t('footer_service_2')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#8b7355] font-bold">&#10003;</span>
                <span>{t('footer_service_3')}</span>
              </li>
            </ul>
          </div>

          {/* 4. Contact & US Flagship */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8b7355] mb-4">
              {t('footer_contact_title')}
            </h4>
            <div className="space-y-2 text-xs text-[#4a4339]">
              <p>{t('footer_address')}</p>
              <p className="text-[#1a1a1a] font-semibold">{t('footer_phone')}</p>
              <p className="text-[#8b7355]">{t('footer_email')}</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & US Payment Badges (Apple Pay, Cash App, Venmo, Zelle) */}
        <div className="pt-8 mt-10 border-t border-[#d8cdbf] flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-[#6e6456] gap-4">
          <div>
            &copy; {new Date().getFullYear()} ÉPURE &bull; {t('footer_rights')}
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold mr-1">Accepted Payments:</span>

            {/* Apple Pay Badge */}
            <span className="bg-black text-white px-2.5 py-1 rounded text-[9px] font-bold flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.67-.99 1.74-.88 2.76 1 .08 1.98-.51 2.6-1.26z"/>
              </svg>
              Pay
            </span>

            {/* Cash App Badge */}
            <span className="bg-[#00D632] text-white px-2.5 py-1 rounded text-[9px] font-bold flex items-center gap-1">
              $ Cash App
            </span>

            {/* Venmo Badge */}
            <span className="bg-[#008CFF] text-white px-2.5 py-1 rounded text-[9px] font-bold italic">
              venmo
            </span>

            {/* Zelle Badge */}
            <span className="bg-[#7414CA] text-white px-2.5 py-1 rounded text-[9px] font-extrabold tracking-tight">
              zelle
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
