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

        {/* Bottom Bar: Copyright & US Payment Badges (AMEX, VISA, MASTERCARD, APPLE PAY, PAYPAL) */}
        <div className="pt-8 mt-10 border-t border-[#d8cdbf] flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-[#6e6456] gap-4">
          <div>
            &copy; {new Date().getFullYear()} ÉPURE &bull; {t('footer_rights')}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#f5f0eb] border border-[#d8cdbf] px-2 py-0.5 rounded text-[9px] font-bold text-[#006fcf]">AMEX</span>
            <span className="bg-[#f5f0eb] border border-[#d8cdbf] px-2 py-0.5 rounded text-[9px] font-bold text-[#1a1a1a]">VISA</span>
            <span className="bg-[#f5f0eb] border border-[#d8cdbf] px-2 py-0.5 rounded text-[9px] font-bold text-[#eb001b]">MASTERCARD</span>
            <span className="bg-[#f5f0eb] border border-[#d8cdbf] px-2 py-0.5 rounded text-[9px] font-bold text-[#003087]">PAYPAL</span>
            <span className="bg-[#f5f0eb] border border-[#d8cdbf] px-2 py-0.5 rounded text-[9px] font-bold text-[#1a1a1a]">APPLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
