export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: 'NOUVEAUTÉ' | 'ÉDITION LIMITÉE' | 'PIÈCE SIGNATURE' | 'RESTOCK';
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  ref?: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Manteau Oversize",
    subtitle: "Laine vierge peignée",
    description: "Un manteau oversize taillé dans une laine vierge peignée d'une douceur exceptionnelle. Coupe déstructurée, épaules tombantes et doublure intégrale en soie. Pièce intemporelle pensée pour traverser les saisons avec élégance.",
    price: 380,
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop",
    category: "MANTEAUX EN LAINE",
    badge: "NOUVEAUTÉ",
    colors: [
      { name: "Sable Lin", hex: "#c4b5a4" },
      { name: "Anthracite", hex: "#3d3d3d" },
      { name: "Crème", hex: "#f0ebe3" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    ref: "EP-891"
  },
  {
    id: "2",
    name: "Pull Col Roulé",
    subtitle: "Cachemire 4-fils crème",
    description: "Pull col roulé en pur cachemire 4-fils. Maille dense et moelleuse, coupe ajustée. Tricoté dans nos ateliers partenaires en Italie à partir de fibres mongolaises d'exception.",
    price: 240,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&h=800&fit=crop",
    category: "CACHEMIRE",
    badge: "ÉDITION LIMITÉE",
    colors: [
      { name: "Écru", hex: "#f0ebe3" },
      { name: "Caramel", hex: "#a0764a" }
    ],
    sizes: ["XS", "S", "M", "L"],
    ref: "EP-742"
  },
  {
    id: "3",
    name: "Manteau Ceinturé",
    subtitle: "Pur Cachemire Double-Face",
    description: "Manteau ceinturé en pur cachemire double-face. Ceinture à nouer, col tailleur et coutures main. Une pièce signature de la maison, symbole d'un savoir-faire artisanal d'exception.",
    price: 460,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=800&fit=crop",
    category: "CACHEMIRE",
    badge: "PIÈCE SIGNATURE",
    colors: [
      { name: "Sable Lin", hex: "#c4b5a4" },
      { name: "Noir", hex: "#1a1a1a" },
      { name: "Gris Perle", hex: "#b0b0b0" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    ref: "EP-892"
  },
  {
    id: "4",
    name: "Pantalon Plissé Écru",
    subtitle: "Coton lavé & lin",
    description: "Pantalon à plis marqués en mélange coton-lin. Taille haute, jambe droite, tombé fluide. Teinte naturelle obtenue sans teinture chimique.",
    price: 195,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    category: "PANTALONS",
    colors: [
      { name: "Écru", hex: "#f0ebe3" },
      { name: "Taupe", hex: "#8b7d6b" }
    ],
    sizes: ["XS", "S", "M", "L"],
    ref: "EP-560"
  },
  {
    id: "5",
    name: "Veste Tailleur",
    subtitle: "Laine froide anthracite",
    description: "Veste tailleur en laine froide anthracite. Structure épaulée, boutonnage simple, poches passepoilées. Doublure en cupro pour un porter soyeux.",
    price: 320,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
    category: "MANTEAUX EN LAINE",
    badge: "NOUVEAUTÉ",
    colors: [
      { name: "Anthracite", hex: "#3d3d3d" },
      { name: "Marine", hex: "#1c2841" }
    ],
    sizes: ["S", "M", "L", "XL"],
    ref: "EP-433"
  },
  {
    id: "6",
    name: "Pull Maille Côtelée",
    subtitle: "Laine Mérinos Superfine",
    description: "Pull en maille côtelée de laine mérinos superfine. Texture raffinée, coupe droite, bords-côtes élastiques. Un basique noble et durable.",
    price: 210,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a7a?w=600&h=800&fit=crop",
    category: "CACHEMIRE",
    colors: [
      { name: "Écru", hex: "#f0ebe3" },
      { name: "Sable", hex: "#c4b5a4" },
      { name: "Mousse", hex: "#7a8b6f" }
    ],
    sizes: ["XS", "S", "M", "L"],
    ref: "EP-318"
  }
];

export default products;
