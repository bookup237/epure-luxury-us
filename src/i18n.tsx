export type Language = 'en' | 'fr';

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const dictionary: Translations = {
  en: {
    // Navigation
    nav_boutique: 'Shop',
    nav_decouvrir: 'Discover',
    nav_cart: 'Bag',
    nav_account: 'Account',
    nav_atelier: 'Atelier (Admin)',

    // Hero Section
    hero_season: 'Fall / Winter 2025 Collection',
    hero_title: 'Pure Lines &\nNoble Fabrics',
    hero_subtitle: 'A wardrobe sculpted in the quiet intimacy of the atelier. Exceptional Italian & Scottish wools, timeless silhouettes.',
    hero_cta: 'Explore the Wardrobe',

    // Product Section & Tabs
    section_title: 'Recent Selection — New Arrivals',
    pieces_count: 'Pieces',
    tab_all: 'All',
    tab_coats: 'Wool Overcoats',
    tab_cashmere: 'Cashmere',
    tab_pants: 'Trousers',
    no_items: 'No pieces available in this category at the moment.',

    // Badges
    badge_new: 'NEW IN',
    badge_limited: 'LIMITED EDITION',
    badge_signature: 'SIGNATURE PIECE',
    badge_restock: 'RESTOCK',

    // Product Detail
    atelier_ref: 'ÉPURE Atelier • Ref',
    add_to_cart: 'Add to Shopping Bag',
    complimentary_shipping: 'Complimentary shipping across the United States',
    product_details: 'Garment Details',
    composition: 'Composition & Care',
    shipping_returns: 'Shipping & Returns',

    // Cart
    cart_title: 'Shopping Bag',
    cart_items: 'items',
    cart_shipping_banner: 'Complimentary Express Shipping across the US (2-day FedEx)',
    cart_shipping_free: 'Free',
    cart_empty: 'Your shopping bag is empty.',
    cart_size: 'Size',
    cart_promo_placeholder: 'Promo code / Gift card',
    cart_apply: 'Apply',
    cart_summary: 'Order Summary',
    cart_subtotal: 'Subtotal',
    cart_shipping_label: 'Standard Express Shipping (FedEx)',
    cart_packaging: 'Signature Gift Box & Garment Bag',
    cart_included: '[ Included ] $0.00',
    cart_total: 'Total',
    cart_taxes: 'US Sales Taxes included at checkout',
    cart_checkout_btn: 'Proceed to Secure Checkout',

    // Login
    login_title_in: 'Sign In',
    login_title_up: 'Create an Account',
    login_desc_in: 'Access your order history, exclusive perks, and tracking.',
    login_desc_up: 'Join the Maison ÉPURE for a tailored experience.',
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
    search_placeholder: 'What are you searching for?',
    search_no_results: 'No results found for',

    // Footer
    footer_tagline: 'High-end luxury garment house. Sculpted pure lines and noble fabrics crafted in European heritage mills.',
    footer_shop: 'Collections',
    footer_services: 'Client Services',
    footer_service_1: 'Complimentary 2-Day FedEx delivery in the US',
    footer_service_2: '30-day hassle-free returns',
    footer_service_3: 'Encrypted checkout (Apple Pay, Amex, PayPal)',
    footer_contact_title: 'Flagship & Concierge',
    footer_address: '740 Madison Avenue, New York, NY 10065',
    footer_phone: '+1 (212) 555-0198',
    footer_email: 'concierge.us@epure-paris.com',
    footer_rights: 'All rights reserved. United States.'
  },
  fr: {
    // Navigation
    nav_boutique: 'Boutique',
    nav_decouvrir: 'Découvrir',
    nav_cart: 'Panier',
    nav_account: 'Compte',
    nav_atelier: 'Atelier (Admin)',

    // Hero Section
    hero_season: 'Collection Automne / Hiver 2025',
    hero_title: 'Lignes pures &\nmatières nobles',
    hero_subtitle: 'Une garde-robe sculptée dans le silence de l’atelier. Tissus d’exception et coupes irréprochables.',
    hero_cta: 'Explorer le vestiaire',

    // Product Section & Tabs
    section_title: 'Sélection Récente — Nouveautés',
    pieces_count: 'Pièces',
    tab_all: 'Tous',
    tab_coats: 'Manteaux en laine',
    tab_cashmere: 'Cachemire',
    tab_pants: 'Pantalons',
    no_items: 'Aucune pièce disponible dans cette catégorie pour le moment.',

    // Badges
    badge_new: 'NOUVEAUTÉ',
    badge_limited: 'ÉDITION LIMITÉE',
    badge_signature: 'PIÈCE SIGNATURE',
    badge_restock: 'RESTOCK',

    // Product Detail
    atelier_ref: 'ÉPURE Atelier • Ref',
    add_to_cart: 'Ajouter au panier',
    complimentary_shipping: 'Livraison express offerte aux États-Unis',
    product_details: 'Détails du vêtement',
    composition: 'Composition & Entretien',
    shipping_returns: 'Livraisons & Retours',

    // Cart
    cart_title: 'Mon Panier',
    cart_items: 'articles',
    cart_shipping_banner: 'Livraison express offerte aux USA (FedEx 2 jours)',
    cart_shipping_free: 'Offerte',
    cart_empty: 'Votre panier est vide.',
    cart_size: 'Taille',
    cart_promo_placeholder: 'Code privilège / carte cadeau',
    cart_apply: 'Appliquer',
    cart_summary: 'Récapitulatif financier',
    cart_subtotal: 'Sous-total',
    cart_shipping_label: 'Livraison Standard Express (FedEx)',
    cart_packaging: 'Coffret Signature & Housse Atelier',
    cart_included: '[ Inclus ] 0,00 $',
    cart_total: 'Total',
    cart_taxes: 'Taxes américaines incluses',
    cart_checkout_btn: 'Passer au paiement sécurisé',

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
    search_no_results: 'Aucun résultat pour',

    // Footer
    footer_tagline: 'Maison de confection haut de gamme à Paris. Lignes épurées et matières nobles façonnées en Europe.',
    footer_shop: 'Collections',
    footer_services: 'Services',
    footer_service_1: 'Livraison express 2 jours offerte aux USA',
    footer_service_2: 'Retours gratuits sous 30 jours',
    footer_service_3: 'Paiement sécurisé crypté (Apple Pay, Amex, PayPal)',
    footer_contact_title: 'Salons & Conciergerie',
    footer_address: '740 Madison Avenue, New York, NY 10065',
    footer_phone: '+1 (212) 555-0198',
    footer_email: 'concierge.us@epure-paris.com',
    footer_rights: 'Tous droits réservés. États-Unis.'
  }
};

import { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // Par défaut en Anglais pour le marché américain
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string): string => {
    return dictionary[lang]?.[key] || dictionary['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
