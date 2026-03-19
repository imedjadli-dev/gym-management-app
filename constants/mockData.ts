export type MemberStatus = "actif" | "expiré" | "nouveau";
export type SubscriptionType = "nouveau" | "renouvelé" | "expiré" | "actif";
export type ProductCategory = "Nutrition" | "Équipement" | "Accessoires";
export type Role = "admin" | "secretary";
export type Screen = "tableau_de_bord" | "membres" | "abonnements" | "produits";

export interface Member {
  id: number;
  name: string;
  plan: string;
  status: MemberStatus;
  joined: string;
  expires: string;
  phone: string;
  avatar: string;
}

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  sold: number;
}

export interface Subscription {
  id: number;
  member: string;
  plan: string;
  type: SubscriptionType;
  date: string;
  amount: number;
}

export interface NavItem {
  id: Screen;
  label: string;
  icon: string;
}

export const MEMBERS: Member[] = [
  {
    id: 1,
    name: "Yassine Bouazza",
    plan: "Premium",
    status: "actif",
    joined: "2025-01-10",
    expires: "2026-01-10",
    phone: "+213 555 0101",
    avatar: "YB",
  },
  {
    id: 2,
    name: "Amina Khelifi",
    plan: "Basic",
    status: "actif",
    joined: "2025-03-01",
    expires: "2026-03-01",
    phone: "+213 555 0202",
    avatar: "AK",
  },
  {
    id: 3,
    name: "Riad Mansouri",
    plan: "Premium",
    status: "expiré",
    joined: "2024-03-15",
    expires: "2025-03-15",
    phone: "+213 555 0303",
    avatar: "RM",
  },
  {
    id: 4,
    name: "Nour Benali",
    plan: "Basic",
    status: "nouveau",
    joined: "2026-03-01",
    expires: "2026-04-01",
    phone: "+213 555 0404",
    avatar: "NB",
  },
  {
    id: 5,
    name: "Karim Oukaci",
    plan: "Premium",
    status: "actif",
    joined: "2025-06-20",
    expires: "2026-06-20",
    phone: "+213 555 0505",
    avatar: "KO",
  },
  {
    id: 6,
    name: "Sonia Hadjadj",
    plan: "Basic",
    status: "expiré",
    joined: "2024-09-01",
    expires: "2025-09-01",
    phone: "+213 555 0606",
    avatar: "SH",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Whey Protein 1kg",
    category: "Nutrition",
    price: 4500,
    stock: 23,
    sold: 142,
  },
  {
    id: 2,
    name: "Créatine Monohydrate",
    category: "Nutrition",
    price: 2800,
    stock: 15,
    sold: 89,
  },
  {
    id: 3,
    name: "Set de Bandes de Résistance",
    category: "Équipement",
    price: 1200,
    stock: 8,
    sold: 34,
  },
  {
    id: 4,
    name: "Gants de Gym",
    category: "Accessoires",
    price: 800,
    stock: 31,
    sold: 67,
  },
  {
    id: 5,
    name: "Shaker",
    category: "Accessoires",
    price: 500,
    stock: 45,
    sold: 210,
  },
  {
    id: 6,
    name: "Pré-Workout 300g",
    category: "Nutrition",
    price: 3200,
    stock: 0,
    sold: 55,
  },
];

export const SUBSCRIPTIONS: Subscription[] = [
  {
    id: 1,
    member: "Nour Benali",
    plan: "Basic",
    type: "nouveau",
    date: "2026-03-01",
    amount: 2000,
  },
  {
    id: 2,
    member: "Amina Khelifi",
    plan: "Basic",
    type: "renouvelé",
    date: "2026-03-01",
    amount: 2000,
  },
  {
    id: 3,
    member: "Riad Mansouri",
    plan: "Premium",
    type: "expiré",
    date: "2025-03-15",
    amount: 3500,
  },
  {
    id: 4,
    member: "Yassine Bouazza",
    plan: "Premium",
    type: "renouvelé",
    date: "2025-01-10",
    amount: 3500,
  },
  {
    id: 5,
    member: "Sonia Hadjadj",
    plan: "Basic",
    type: "expiré",
    date: "2025-09-01",
    amount: 2000,
  },
  {
    id: 6,
    member: "Karim Oukaci",
    plan: "Premium",
    type: "actif",
    date: "2025-06-20",
    amount: 3500,
  },
];

export const NAV_ADMIN: NavItem[] = [
  { id: "tableau_de_bord", label: "Tableau de bord", icon: "📊" },
  { id: "membres", label: "Membres", icon: "👥" },
  { id: "abonnements", label: "Abonnements", icon: "📋" },
  { id: "produits", label: "Produits & Ventes", icon: "🛍️" },
];

export const NAV_SECRETARY: NavItem[] = [
  { id: "membres", label: "Membres", icon: "👥" },
  { id: "abonnements", label: "Abonnements", icon: "📋" },
  { id: "produits", label: "Acheter des produits", icon: "🛍️" },
];
