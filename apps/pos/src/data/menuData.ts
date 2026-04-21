import type { Category, Product } from "../types";

export const CATEGORIES: Category[] = [
  { id: "entradas", name: "Entradas", icon: "🥗", color: "bg-green-500" },
  { id: "platos-fuertes", name: "Platos Fuertes", icon: "🥩", color: "bg-red-500" },
  { id: "pastas", name: "Pastas", icon: "🍝", color: "bg-yellow-500" },
  { id: "hamburguesas", name: "Hamburguesas", icon: "🍔", color: "bg-orange-500" },
  { id: "bebidas", name: "Bebidas", icon: "🥤", color: "bg-blue-500" },
  { id: "cervezas", name: "Cervezas", icon: "🍺", color: "bg-amber-500" },
  { id: "cocteles", name: "Cócteles", icon: "🍹", color: "bg-pink-500" },
  { id: "postres", name: "Postres", icon: "🍰", color: "bg-purple-500" },
];

export const PRODUCTS: Product[] = [
  // Entradas
  {
    id: "p1",
    name: "Empanadas (3 und)",
    description: "Empanadas de carne con ají",
    price: 15000,
    categoryId: "entradas",
    available: true,
    modifierGroups: [
      {
        id: "mg-emp-tipo",
        name: "Tipo",
        required: true,
        maxSelections: 1,
        modifiers: [
          { id: "m1", name: "Carne", price: 0 },
          { id: "m2", name: "Pollo", price: 0 },
          { id: "m3", name: "Mixtas", price: 2000 },
        ],
      },
    ],
  },
  {
    id: "p2",
    name: "Patacones con hogao",
    description: "Patacones crocantes con hogao criollo",
    price: 12000,
    categoryId: "entradas",
    available: true,
  },
  {
    id: "p3",
    name: "Chicharrón",
    description: "Chicharrón crocante con limón",
    price: 18000,
    categoryId: "entradas",
    available: true,
  },
  {
    id: "p4",
    name: "Guacamole con totopos",
    price: 16000,
    categoryId: "entradas",
    available: true,
  },
  {
    id: "p5",
    name: "Aros de cebolla",
    price: 14000,
    categoryId: "entradas",
    available: true,
  },
  {
    id: "p6",
    name: "Deditos de queso",
    price: 13000,
    categoryId: "entradas",
    available: false,
  },

  // Platos fuertes
  {
    id: "p10",
    name: "Bandeja Paisa",
    description: "Frijoles, arroz, carne molida, chicharrón, huevo, plátano, arepa, aguacate",
    price: 32000,
    categoryId: "platos-fuertes",
    available: true,
  },
  {
    id: "p11",
    name: "Lomo de res",
    description: "Lomo en salsa de champiñones con papas gratinadas",
    price: 38000,
    categoryId: "platos-fuertes",
    available: true,
    modifierGroups: [
      {
        id: "mg-lomo-termino",
        name: "Término",
        required: true,
        maxSelections: 1,
        modifiers: [
          { id: "mt1", name: "Medio", price: 0 },
          { id: "mt2", name: "Tres cuartos", price: 0 },
          { id: "mt3", name: "Bien cocido", price: 0 },
        ],
      },
      {
        id: "mg-lomo-extras",
        name: "Extras",
        required: false,
        maxSelections: 3,
        modifiers: [
          { id: "me1", name: "Extra champiñones", price: 5000 },
          { id: "me2", name: "Extra papas", price: 4000 },
          { id: "me3", name: "Ensalada César", price: 8000 },
        ],
      },
    ],
  },
  {
    id: "p12",
    name: "Pechuga a la plancha",
    description: "Pechuga de pollo con arroz y ensalada",
    price: 26000,
    categoryId: "platos-fuertes",
    available: true,
    modifierGroups: [
      {
        id: "mg-pechuga-acomp",
        name: "Acompañamiento",
        required: true,
        maxSelections: 1,
        modifiers: [
          { id: "ma1", name: "Arroz blanco", price: 0 },
          { id: "ma2", name: "Arroz con coco", price: 2000 },
          { id: "ma3", name: "Puré de papa", price: 2000 },
          { id: "ma4", name: "Papas a la francesa", price: 3000 },
        ],
      },
    ],
  },
  {
    id: "p13",
    name: "Trucha al ajillo",
    description: "Trucha fresca con salsa de ajo y limón",
    price: 35000,
    categoryId: "platos-fuertes",
    available: true,
  },
  {
    id: "p14",
    name: "Costillas BBQ",
    description: "Costillas de cerdo glaseadas en salsa BBQ",
    price: 42000,
    categoryId: "platos-fuertes",
    available: true,
  },

  // Pastas
  {
    id: "p20",
    name: "Spaghetti Bolognesa",
    price: 24000,
    categoryId: "pastas",
    available: true,
  },
  {
    id: "p21",
    name: "Fetuccini Alfredo",
    description: "Con salsa cremosa y parmesano",
    price: 26000,
    categoryId: "pastas",
    available: true,
    modifierGroups: [
      {
        id: "mg-pasta-prot",
        name: "Agregar proteína",
        required: false,
        maxSelections: 1,
        modifiers: [
          { id: "mp1", name: "Pollo", price: 6000 },
          { id: "mp2", name: "Camarones", price: 10000 },
          { id: "mp3", name: "Tocineta", price: 5000 },
        ],
      },
    ],
  },
  {
    id: "p22",
    name: "Lasagna de carne",
    price: 28000,
    categoryId: "pastas",
    available: true,
  },
  {
    id: "p23",
    name: "Penne al pesto",
    price: 25000,
    categoryId: "pastas",
    available: true,
  },

  // Hamburguesas
  {
    id: "p30",
    name: "Burger Clásica",
    description: "Carne 200g, lechuga, tomate, cebolla, salsa de la casa",
    price: 22000,
    categoryId: "hamburguesas",
    available: true,
    modifierGroups: [
      {
        id: "mg-burger-extras",
        name: "Extras",
        required: false,
        maxSelections: 4,
        modifiers: [
          { id: "mb1", name: "Queso cheddar", price: 3000 },
          { id: "mb2", name: "Tocineta", price: 4000 },
          { id: "mb3", name: "Huevo", price: 2000 },
          { id: "mb4", name: "Doble carne", price: 10000 },
          { id: "mb5", name: "Jalapeños", price: 2000 },
        ],
      },
    ],
  },
  {
    id: "p31",
    name: "Burger BBQ",
    description: "Carne 200g, cheddar, tocineta, aros de cebolla, salsa BBQ",
    price: 28000,
    categoryId: "hamburguesas",
    available: true,
  },
  {
    id: "p32",
    name: "Burger Pollo Crispy",
    description: "Pechuga apanada, lechuga, mayo sriracha",
    price: 24000,
    categoryId: "hamburguesas",
    available: true,
  },

  // Bebidas
  {
    id: "p40",
    name: "Limonada natural",
    price: 7000,
    categoryId: "bebidas",
    available: true,
    modifierGroups: [
      {
        id: "mg-limonada",
        name: "Variación",
        required: true,
        maxSelections: 1,
        modifiers: [
          { id: "ml1", name: "Natural", price: 0 },
          { id: "ml2", name: "De coco", price: 2000 },
          { id: "ml3", name: "Cerezada", price: 2000 },
        ],
      },
    ],
  },
  {
    id: "p41",
    name: "Jugo natural",
    price: 8000,
    categoryId: "bebidas",
    available: true,
  },
  {
    id: "p42",
    name: "Gaseosa",
    price: 5000,
    categoryId: "bebidas",
    available: true,
  },
  {
    id: "p43",
    name: "Agua",
    price: 4000,
    categoryId: "bebidas",
    available: true,
  },
  {
    id: "p44",
    name: "Café",
    price: 4500,
    categoryId: "bebidas",
    available: true,
  },

  // Cervezas
  {
    id: "p50",
    name: "Club Colombia",
    price: 8000,
    categoryId: "cervezas",
    available: true,
  },
  {
    id: "p51",
    name: "Poker",
    price: 6000,
    categoryId: "cervezas",
    available: true,
  },
  {
    id: "p52",
    name: "Águila",
    price: 6000,
    categoryId: "cervezas",
    available: true,
  },
  {
    id: "p53",
    name: "Corona",
    price: 12000,
    categoryId: "cervezas",
    available: true,
  },
  {
    id: "p54",
    name: "BBC Lager",
    price: 14000,
    categoryId: "cervezas",
    available: true,
  },

  // Cócteles
  {
    id: "p60",
    name: "Mojito",
    price: 22000,
    categoryId: "cocteles",
    available: true,
  },
  {
    id: "p61",
    name: "Margarita",
    price: 24000,
    categoryId: "cocteles",
    available: true,
  },
  {
    id: "p62",
    name: "Piña Colada",
    price: 22000,
    categoryId: "cocteles",
    available: true,
  },
  {
    id: "p63",
    name: "Cuba Libre",
    price: 18000,
    categoryId: "cocteles",
    available: true,
  },

  // Postres
  {
    id: "p70",
    name: "Brownie con helado",
    description: "Brownie caliente con helado de vainilla",
    price: 16000,
    categoryId: "postres",
    available: true,
  },
  {
    id: "p71",
    name: "Tres leches",
    price: 14000,
    categoryId: "postres",
    available: true,
  },
  {
    id: "p72",
    name: "Cheesecake",
    price: 15000,
    categoryId: "postres",
    available: true,
    modifierGroups: [
      {
        id: "mg-cheese-sabor",
        name: "Sabor",
        required: true,
        maxSelections: 1,
        modifiers: [
          { id: "ms1", name: "Frutos rojos", price: 0 },
          { id: "ms2", name: "Maracuyá", price: 0 },
          { id: "ms3", name: "Oreo", price: 2000 },
        ],
      },
    ],
  },
  {
    id: "p73",
    name: "Helado (3 bolas)",
    price: 12000,
    categoryId: "postres",
    available: true,
  },
];