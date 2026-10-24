import React, { createContext, useState, useContext } from 'react';

const dictionary = {
  fr: {
    // Navigation
    nav_boutique: 'Boutique',
    nav_decouvrir: 'Découvrir',
    nav_panier: 'Panier',
    nav_compte: 'Compte',
    
    // Home
    hero_season: 'HIVER 2024',
    hero_title: "L'Élégance Silencieuse",
    hero_subtitle: 'Découvrez notre nouvelle collection capsule. Des coupes intemporelles, tissées dans les matières les plus nobles.',
    hero_cta: 'Explorer la collection',
    
    cat_all: 'Tout',
    cat_coats: 'Manteaux',
    cat_knits: 'Mailles',
    cat_pants: 'Pantalons',
    
    values_title: 'Atelier & Engagements',
    val_1_title: 'Savoir-Faire',
    val_1_desc: 'Coupé et assemblé à la main dans nos ateliers parisiens.',
    val_2_title: 'Matières Pures',
    val_2_desc: 'Laine mérinos, cachemire et soie sourcés éthiquement.',
    val_3_title: 'Édition Limitée',
    val_3_desc: 'Chaque pièce est numérotée pour garantir son exclusivité.',
    
    mag_tag: 'Édition Numéro 07',
    mag_title: 'Le Carnet de Style',
    mag_desc: 'Comment composer une garde-robe capsule cohérente pour l\'hiver.',
    mag_link: 'Consulter l\'éditorial ↗',

    // Cart
    cart_title: 'Mon Panier',
    cart_items: 'articles',
    cart_shipping_msg: 'Livraison express offerte en France métropolitaine',
    cart_free: 'Offerte',
    cart_promo_placeholder: 'Code privilège / carte cadeau',
    cart_apply: 'Appliquer',
    cart_summary: 'Récapitulatif financier',
    cart_subtotal: 'Sous-total',
    cart_shipping: 'Livraison Standard Express',
    cart_gift: 'Coffret Signature & Housse Atelier',
    cart_included: '[ Inclus ]',
    cart_total: 'Total',
    cart_taxes: 'Taxes locales et douanes incluses',
    cart_checkout: 'Passer au paiement sécurisé',
    
    // Login
    login_title_in: 'Connexion',
    login_title_up: 'Créer un compte',
    login_desc_in: 'Accédez à votre historique, vos avantages et votre suivi de commande.',
    login_desc_up: 'Rejoignez la maison ÉPURE pour une expérience sur mesure.',
    login_firstname: 'Prénom',
    login_lastname: 'Nom',
    login_email: 'Email',
    login_password: 'Mot de passe',
    login_forgot: 'Mot de passe oublié ?',
    login_btn_in: 'Se connecter',
    login_btn_up: 'Valider l\'inscription',
    login_switch_in: 'Nouveau sur ÉPURE ?',
    login_switch_up: 'Vous avez déjà un compte ?',
    
    // Search
    search_placeholder: 'Que recherchez-vous ?',
    search_no_results: 'Aucun résultat pour'
  },
  en: {
    // Navigation
    nav_boutique: 'Shop',
    nav_decouvrir: 'Discover',
    nav_panier: 'Cart',
    nav_compte: 'Account',
    
    // Home
    hero_season: 'WINTER 2024',
    hero_title: "Quiet Elegance",
    hero_subtitle: 'Discover our new capsule collection. Timeless cuts, woven from the finest materials.',
    hero_cta: 'Explore collection',
    
    cat_all: 'All',
    cat_coats: 'Coats',
    cat_knits: 'Knitwear',
    cat_pants: 'Trousers',
    
    values_title: 'Atelier & Commitments',
    val_1_title: 'Craftsmanship',
    val_1_desc: 'Hand-cut and assembled in our Parisian ateliers.',
    val_2_title: 'Pure Materials',
    val_2_desc: 'Ethically sourced merino wool, cashmere, and silk.',
    val_3_title: 'Limited Edition',
    val_3_desc: 'Each piece is numbered to guarantee exclusivity.',
    
    mag_tag: 'Issue Number 07',
    mag_title: 'The Style Journal',
    mag_desc: 'How to build a cohesive winter capsule wardrobe.',
    mag_link: 'Read editorial ↗',

    // Cart
    cart_title: 'My Cart',
    cart_items: 'items',
    cart_shipping_msg: 'Complimentary express shipping within France',
    cart_free: 'Free',
    cart_promo_placeholder: 'Gift card or discount code',
    cart_apply: 'Apply',
    cart_summary: 'Order Summary',
    cart_subtotal: 'Subtotal',
    cart_shipping: 'Standard Express Shipping',
    cart_gift: 'Signature Box & Garment Bag',
    cart_included: '[ Included ]',
    cart_total: 'Total',
    cart_taxes: 'Local taxes and duties included',
    cart_checkout: 'Proceed to secure checkout',
    
    // Login
    login_title_in: 'Sign In',
    login_title_up: 'Create Account',
    login_desc_in: 'Access your history, benefits, and order tracking.',
    login_desc_up: 'Join the ÉPURE house for a tailored experience.',
    login_firstname: 'First Name',
    login_lastname: 'Last Name',
    login_email: 'Email',
    login_password: 'Password',
    login_forgot: 'Forgot password?',
    login_btn_in: 'Sign In',
    login_btn_up: 'Complete Registration',
    login_switch_in: 'New to ÉPURE?',
    login_switch_up: 'Already have an account?',
    
    // Search
    search_placeholder: 'What are you looking for?',
    search_no_results: 'No results for'
  }
};

type Language = 'fr' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
  t: (key: string) => key
});

const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language.split('-')[0].toLowerCase();
  return browserLang === 'en' ? 'en' : 'fr'; // Le français par défaut pour le reste du monde
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>(getBrowserLanguage());

  const t = (key: string) => {
    // @ts-ignore
    return dictionary[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
