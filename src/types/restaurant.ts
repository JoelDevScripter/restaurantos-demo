/**
 * Types declarations for RestaurantOS
 */

export enum TableStatus {
  LIBRE = "LIBRE",
  OCUPADA = "OCUPADA",
  RESERVADA = "RESERVADA",
  POR_COBRAR = "POR_COBRAR",
  EN_LIMPIEZA = "EN_LIMPIEZA"
}

export interface Table {
  id: string;
  name: string; // e.g., "Mesa 1", "Barra 3"
  status: TableStatus;
  capacity: number;
  currentOrderId?: string;
  occupiedSince?: string; // ISO string
  waiterName?: string;
  x: number; // position coordinate for UI drag/drop simulation
  y: number;
  shape: "circle" | "square" | "rect_horiz" | "rect_vert";
}

export interface ModifierOption {
  id: string;
  name: string;
  price: number;
  allergen?: string;
}

export interface ModifierGroup {
  id: string;
  name: string;
  minSelection: number;
  maxSelection: number;
  options: ModifierOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  ingredients: { rawMaterialId: string; quantityNeeded: number }[]; // Recipe definition
  modifiers?: ModifierGroup[];
  allergens?: string[];
  isAvailable: boolean;
  preparationStation: "kitchen" | "bar" | "dessert";
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number; // Base price + selected modifiers
  quantity: number;
  selectedModifiers: {
    groupId: string;
    optionId: string;
    name: string;
    price: number;
  }[];
  notes?: string;
}

export enum OrderStatus {
  PENDIENTE = "PENDIENTE",
  PREPARANDO = "PREPARANDO",
  LISTO = "LISTO",
  ENTREGADO = "ENTREGADO",
  ANULADO = "ANULADO"
}

export interface Order {
  id: string;
  tableId?: string;
  tableName?: string;
  orderNum: number;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number; // SRI 15% or standard VAT
  serviceTip: number;
  total: number;
  status: OrderStatus;
  dateTime: string;
  paymentMethod?: "Efectivo" | "Tarjeta de Crédito" | "Transferencia" | "Deuna" | "PayPal";
  customerName?: string;
  customerPhone?: string;
  waiterName?: string;
  isDelivery: boolean;
  deliveryPlatform?: "Uber Eats" | "Rappi" | "PedidosYa" | "WhatsApp" | "Web" | "Local";
  notes?: string;
  isBilledSRI?: boolean;
  sriInvoiceId?: string;
}

export interface RawMaterial {
  id: string;
  name: string;
  category: string; // e.g. "Lácteos", "Carnes", "Verduras", "Abarrotes"
  stock: number;
  minStock: number;
  unit: "g" | "kg" | "ml" | "ltr" | "unidades" | "onzas";
  unitPrice: number;
  expirationDate?: string;
  lastSuppliedDate?: string;
  providerId?: string;
}

export interface Provider {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  score: number; // 1-5 rating
}

export interface OrderPurchase {
  id: string;
  providerId: string;
  providerName: string;
  date: string;
  items: { rawMaterialId: string; name: string; quantity: number; cost: number }[];
  total: number;
  status: "Pendiente" | "Recibido" | "Cancelado";
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  idDocument: string; // Cedula / RUC
  birthday?: string;
  points: number;
  level: "Bronce" | "Plata" | "Oro" | "Platino";
  totalSpent: number;
  visitsCount: number;
  notes?: string;
}

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  covers: number;
  tableId?: string;
  tableName?: string;
  status: "Confirmada" | "Pendiente" | "Cancelada" | "Lista de Espera";
  notes?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: "Mesero" | "Cajero" | "Chef" | "Bartender" | "Administrador";
  phone: string;
  isActive: boolean;
  salesCount: number;
  tipsEarned: number;
  shiftCheckedIn?: string; // ISO string if active
}

export interface SriInvoice {
  id: string;
  orderId: string;
  accessKey: string; // Clave de acceso de 49 dígitos
  dateTime: string;
  customerName: string;
  customerIdDocument: string;
  subtotal: number;
  tax: number;
  total: number;
  status: "AUTORIZADO" | "RECHAZADO" | "PENDIENTE";
  sriResponse?: string;
  xmlMockUrl?: string;
}

export interface CashDrawerShift {
  id: string;
  startTime: string;
  endTime?: string;
  startedBy: string;
  initialCash: number;
  cashSales: number;
  cardSales: number;
  otherSales: number;
  deposits: { amount: number; reason: string; time: string }[];
  withdrawals: { amount: number; reason: string; time: string }[];
  expectedCash: number;
  actualCash?: number;
  difference?: number;
  isClosed: boolean;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}
