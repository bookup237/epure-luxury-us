import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n';

const Login = ({ setIsLoggedIn }: { setIsLoggedIn: (val: boolean) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate('/cart');
  };

  return (
    <div className="px-4 py-12 md:py-24 max-w-md mx-auto min-h-[70vh] flex flex-col justify-center">
      <div className="text-center mb-10">
        <h1 className="font-['Cormorant_Garamond'] text-4xl mb-2">
          {isLogin ? t('login_title_in') : t('login_title_up')}
        </h1>
        <p className="text-sm text-gray-500">
          {isLogin ? t('login_desc_in') : t('login_desc_up')}
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">{t('login_firstname')}</label>
              <input type="text" required className="w-full bg-[#f5f0eb] border border-transparent focus:border-[#c4b5a4] rounded-sm px-4 py-3 text-sm outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">{t('login_lastname')}</label>
              <input type="text" required className="w-full bg-[#f5f0eb] border border-transparent focus:border-[#c4b5a4] rounded-sm px-4 py-3 text-sm outline-none transition-colors" />
            </div>
          </div>
        )}

        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-1">{t('login_email')}</label>
          <input type="email" required className="w-full bg-[#f5f0eb] border border-transparent focus:border-[#c4b5a4] rounded-sm px-4 py-3 text-sm outline-none transition-colors" />
        </div>

        <div>
          <div className="flex justify-between items-end mb-1">
            <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500">{t('login_password')}</label>
            {isLogin && (
              <a href="#" className="text-[10px] text-gray-400 hover:text-[#1a1a1a] transition-colors">{t('login_forgot')}</a>
            )}
          </div>
          <input type="password" required className="w-full bg-[#f5f0eb] border border-transparent focus:border-[#c4b5a4] rounded-sm px-4 py-3 text-sm outline-none transition-colors" />
        </div>

        <button type="submit" className="w-full bg-[#1a1a1a] text-white py-4 text-[10px] font-bold tracking-widest uppercase rounded-sm mt-4 hover:bg-gray-900 transition-colors">
          {isLogin ? t('login_btn_in') : t('login_btn_up')}
        </button>
      </form>

      <div className="mt-8 text-center border-t border-[#ede5db] pt-8">
        <p className="text-xs text-gray-500 mb-3">
          {isLogin ? t('login_switch_in') : t('login_switch_up')}
        </p>
        <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-[10px] font-bold tracking-widest uppercase border-b border-[#1a1a1a] pb-0.5 inline-flex hover:text-[#8b7355] hover:border-[#8b7355] transition-colors">
          {isLogin ? t('login_title_up') : t('login_title_in')}
        </button>
      </div>
    </div>
  );
};

export default Login;
