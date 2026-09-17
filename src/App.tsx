import { useState, useEffect, useRef } from "react";
import { 
  Utensils, 
  ChefHat, 
  ShoppingCart, 
  Users, 
  Layers, 
  Calendar, 
  TrendingUp, 
  Bot, 
  FileText, 
  Check, 
  Flame, 
  RotateCcw, 
  Receipt, 
  Send, 
  Sparkles, 
  Clock,
  Plus,
  Minus,
  Trash2,
  DollarSign,
  AlertTriangle,
  User,
  Percent,
  Search,
  Sliders,
  CheckCircle,
  X,
  CreditCard,
  Building,
  ArrowRight,
  Info,
  Smartphone,
  BookOpen,
  Briefcase
} from "lucide-react";
import LandingPage from "./components/LandingPage";
import { 
  Table, 
  TableStatus, 
  MenuItem, 
  OrderItem, 
  Order, 
  OrderStatus, 
  RawMaterial, 
  Customer, 
  Reservation, 
  Employee, 
  SriInvoice, 
  CashDrawerShift, 
  ChatMessage,
  Provider
} from "./types/restaurant";

// Initial Demo Data
const INITIAL_PROVIDERS: Provider[] = [
  { id: "p1", name: "Distribuidora Alimentos San Jorge", contact: "Jorge San Lucas", phone: "0998124741", email: "jorge@sanjorgeecuador.com", score: 4.8 },
  { id: "p2", name: "Carnes Premium del Valle", contact: "Lucia Larrea", phone: "0981144212", email: "ventas@vallepremium.ec", score: 4.9 },
  { id: "p3", name: "La Holandesa (Lácteos y Quesos)", contact: "Sven Vander", phone: "0987162541", email: "sven@laholandesa.com", score: 4.6 }
];

const INITIAL_RAW_MATERIALS: RawMaterial[] = [
  { id: "rm1", name: "Queso Mozzarella Premium", category: "Lácteos", stock: 12, minStock: 8, unit: "kg", unitPrice: 6.5, providerId: "p3", lastSuppliedDate: "2026-06-01" },
  { id: "rm2", name: "Harina de Trigo Italiana 00", category: "Abarrotes", stock: 25, minStock: 15, unit: "kg", unitPrice: 1.8, providerId: "p1", lastSuppliedDate: "2026-06-03" },
  { id: "rm3", name: "Salsa de Tomate de la Casa", category: "Abarrotes", stock: 15, minStock: 5, unit: "ltr", unitPrice: 3.2, providerId: "p1", lastSuppliedDate: "2026-06-04" },
  { id: "rm4", name: "Lomo Fino de Res", category: "Carnes", stock: 14, minStock: 10, unit: "kg", unitPrice: 12.0, providerId: "p2", lastSuppliedDate: "2026-06-05" },
  { id: "rm5", name: "Salmon Chileno de Importación", category: "Carnes", stock: 8, minStock: 5, unit: "kg", unitPrice: 18.5, providerId: "p2", lastSuppliedDate: "2026-06-02" },
  { id: "rm6", name: "Tomate Riñón Orgánico", category: "Verduras", stock: 4, minStock: 6, unit: "kg", unitPrice: 1.5, providerId: "p1", lastSuppliedDate: "2026-06-06" }, // Low Stock
  { id: "rm7", name: "Café de Especialidad Zaruma", category: "Abarrotes", stock: 2, minStock: 3, unit: "kg", unitPrice: 14.0, providerId: "p1", lastSuppliedDate: "2026-05-30" }, // Low Stock
];

const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Pizza Margherita Artesanal",
    description: "Salsa de tomate casera, queso mozzarella premium, albahaca fresca del huerto y aceite de oliva extra virgen.",
    price: 13.50,
    category: "Pizzas",
    image: "🍕",
    ingredients: [
      { rawMaterialId: "rm1", quantityNeeded: 0.25 }, // 250g mozzarella
      { rawMaterialId: "rm2", quantityNeeded: 0.30 }, // 300g harina
      { rawMaterialId: "rm3", quantityNeeded: 0.15 }, // 150ml salsa
      { rawMaterialId: "rm6", quantityNeeded: 0.10 }  // 100g tomate
    ],
    modifiers: [
      {
        id: "mod1",
        name: "Ingredientes Extra",
        minSelection: 0,
        maxSelection: 3,
        options: [
          { id: "opt1", name: "Doble Queso Mozzarella", price: 2.50 },
          { id: "opt2", name: "Lomo Fino picado", price: 3.50 },
          { id: "opt3", name: "Champiñones silvestre", price: 1.75 }
        ]
      }
    ],
    allergens: ["Gluten", "Lácteos"],
    isAvailable: true,
    preparationStation: "kitchen"
  },
  {
    id: "m2",
    name: "Lomo Fino a la Piedra",
    description: "Corte premium de tierna carne de res a la parrilla, acompañado de papas rústicas, espárragos y salsa chimichurri.",
    price: 22.00,
    category: "Carnes",
    image: "🥩",
    ingredients: [
      { rawMaterialId: "rm4", quantityNeeded: 0.35 } // 350g lomo fino
    ],
    modifiers: [
      {
        id: "mod2",
        name: "Término de la Carne",
        minSelection: 1,
        maxSelection: 1,
        options: [
          { id: "opt_t1", name: "Término Medio (Jugoso)", price: 0.00 },
          { id: "opt_t2", name: "Tres Cuartos", price: 0.00 },
          { id: "opt_t3", name: "Bien Cocido", price: 0.00 }
        ]
      }
    ],
    isAvailable: true,
    preparationStation: "kitchen"
  },
  {
    id: "m3",
    name: "Salmón Grillado Glaseado",
    description: "Filete de salmón fresco grillado con glaseado cítrico de maracuyá, servido con puré de papas trufado.",
    price: 19.50,
    category: "Carnes",
    image: "🐟",
    ingredients: [
      { rawMaterialId: "rm5", quantityNeeded: 0.25 } // 250g salmon
    ],
    isAvailable: true,
    preparationStation: "kitchen"
  },
  {
    id: "m4",
    name: "Café Capuccino Zaruma",
    description: "Espresso de grano selecto de Zaruma batido con leche vaporizada sedosa y un toque de canela orgánica.",
    price: 3.20,
    category: "Café y Postres",
    image: "☕",
    ingredients: [
      { rawMaterialId: "rm7", quantityNeeded: 0.02 } // 20g café
    ],
    modifiers: [
      {
        id: "mod3",
        name: "Tipo de Leche",
        minSelection: 1,
        maxSelection: 1,
        options: [
          { id: "opt_l1", name: "Leche Entera regular", price: 0.00 },
          { id: "opt_l2", name: "Leche de Almendras", price: 0.75 },
          { id: "opt_l3", name: "Leche Deslactosada", price: 0.25 }
        ]
      }
    ],
    isAvailable: true,
    preparationStation: "bar"
  },
  {
    id: "m5",
    name: "Copa de Vino Tinto Malbec",
    description: "Vino de reserva premium de cuerpo noble, maridaje perfecto para carnes y pastas.",
    price: 6.50,
    category: "Bebidas",
    image: "🍷",
    ingredients: [],
    isAvailable: true,
    preparationStation: "bar"
  },
  {
    id: "m6",
    name: "Cheesecake de Frutos Rojos",
    description: "Delicioso pastel de queso crema sobre base crocante de galletas, cubierto con salsa artesanal de moras del valle.",
    price: 4.80,
    category: "Café y Postres",
    image: "🍰",
    ingredients: [
      { rawMaterialId: "rm1", quantityNeeded: 0.10 } // usa queso
    ],
    isAvailable: true,
    preparationStation: "dessert"
  }
];

const INITIAL_TABLES: Table[] = [
  { id: "t1", name: "Mesa 1", status: TableStatus.OCUPADA, capacity: 4, currentOrderId: "o1", occupiedSince: "2026-06-07T14:15:00Z", waiterName: "Carlos Loor", x: 10, y: 15, shape: "square" },
  { id: "t2", name: "Mesa 2", status: TableStatus.LIBRE, capacity: 2, x: 230, y: 15, shape: "circle" },
  { id: "t3", name: "Mesa 3", status: TableStatus.POR_COBRAR, capacity: 6, currentOrderId: "o2", occupiedSince: "2026-06-07T13:30:00Z", waiterName: "Diana Valencia", x: 450, y: 15, shape: "rect_horiz" },
  { id: "t4", name: "Mesa 4", status: TableStatus.EN_LIMPIEZA, capacity: 4, x: 10, y: 160, shape: "square" },
  { id: "t5", name: "Mesa 5", status: TableStatus.LIBRE, capacity: 4, x: 230, y: 160, shape: "square" },
  { id: "t6", name: "Mesa 6", status: TableStatus.RESERVADA, capacity: 8, x: 450, y: 160, shape: "rect_vert" },
  { id: "t7", name: "Barra 1", status: TableStatus.LIBRE, capacity: 1, x: 10, y: 310, shape: "circle" },
  { id: "t8", name: "Barra 2", status: TableStatus.OCUPADA, capacity: 1, currentOrderId: "o3", occupiedSince: "2026-06-07T14:40:00Z", waiterName: "Carlos Loor", x: 150, y: 310, shape: "circle" },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: "o1",
    tableId: "t1",
    tableName: "Mesa 1",
    orderNum: 101,
    items: [
      {
        id: "oi1",
        menuItemId: "m1",
        name: "Pizza Margherita Artesanal",
        price: 16.00, // item con extra dobles queso
        quantity: 1,
        selectedModifiers: [
          { groupId: "mod1", optionId: "opt1", name: "Doble Queso Mozzarella", price: 2.50 }
        ],
        notes: "Por favor crujiente"
      },
      {
        id: "oi2",
        menuItemId: "m5",
        name: "Copa de Vino Tinto Malbec",
        price: 6.50,
        quantity: 2,
        selectedModifiers: []
      }
    ],
    subtotal: 29.00,
    discount: 0,
    tax: 4.35, // 15% SRI Ecuador
    serviceTip: 2.90, // 10% servicio
    total: 36.25,
    status: OrderStatus.PREPARANDO,
    dateTime: "2026-06-07T14:15:00Z",
    waiterName: "Carlos Loor",
    isDelivery: false,
    deliveryPlatform: "Local"
  },
  {
    id: "o2",
    tableId: "t3",
    tableName: "Mesa 3",
    orderNum: 102,
    items: [
      {
        id: "oi3",
        menuItemId: "m2",
        name: "Lomo Fino a la Piedra",
        price: 22.00,
        quantity: 2,
        selectedModifiers: [
          { groupId: "mod2", optionId: "opt_t1", name: "Término Medio (Jugoso)", price: 0 }
        ]
      },
      {
        id: "oi4",
        menuItemId: "m3",
        name: "Salmón Grillado Glaseado",
        price: 19.50,
        quantity: 1,
        selectedModifiers: []
      }
    ],
    subtotal: 63.50,
    discount: 5.00,
    tax: 8.78, // (63.5 - 5) * 15%
    serviceTip: 5.85,
    total: 73.13,
    status: OrderStatus.PENDIENTE,
    dateTime: "2026-06-07T13:30:00Z",
    waiterName: "Diana Valencia",
    isDelivery: false,
    deliveryPlatform: "Local"
  },
  {
    id: "o3",
    tableId: "t8",
    tableName: "Barra 2",
    orderNum: 103,
    items: [
      {
        id: "oi5",
        menuItemId: "m4",
        name: "Café Capuccino Zaruma",
        price: 3.95, // con almendras
        quantity: 1,
        selectedModifiers: [
          { groupId: "mod3", optionId: "opt_l2", name: "Leche de Almendras", price: 0.75 }
        ]
      }
    ],
    subtotal: 3.95,
    discount: 0,
    tax: 0.59,
    serviceTip: 0.40,
    total: 4.94,
    status: OrderStatus.PREPARANDO,
    dateTime: "2026-06-07T14:40:00Z",
    waiterName: "Carlos Loor",
    isDelivery: false,
    deliveryPlatform: "Local"
  },
  {
    id: "o4",
    orderNum: 104,
    items: [
      {
        id: "oi6",
        menuItemId: "m1",
        name: "Pizza Margherita Artesanal",
        price: 13.50,
        quantity: 2,
        selectedModifiers: []
      }
    ],
    subtotal: 27.00,
    discount: 0,
    tax: 4.05,
    serviceTip: 0,
    total: 31.05,
    status: OrderStatus.PENDIENTE,
    dateTime: "2026-06-07T14:50:00Z",
    isDelivery: true,
    deliveryPlatform: "Rappi",
    customerName: "Viviana Ponce",
    customerPhone: "0993184512"
  },
  {
    id: "o5",
    orderNum: 105,
    items: [
      {
        id: "oi7",
        menuItemId: "m2",
        name: "Lomo Fino a la Piedra",
        price: 22.00,
        quantity: 1,
        selectedModifiers: [
          { groupId: "mod2", optionId: "opt_t2", name: "Tres Cuartos", price: 0 }
        ]
      }
    ],
    subtotal: 22.00,
    discount: 0,
    tax: 3.30,
    serviceTip: 0,
    total: 25.30,
    status: OrderStatus.LISTO,
    dateTime: "2026-06-07T14:30:00Z",
    isDelivery: true,
    deliveryPlatform: "Uber Eats",
    customerName: "Jean Paul S.",
    customerPhone: "0963124512"
  }
];

const INITIAL_CUSTOMERS: Customer[] = [
  { id: "c1", name: "Andrés Guarderas", email: "andres.guarderas@mail.ec", phone: "0984124612", idDocument: "1724124512", points: 840, level: "Oro", totalSpent: 720.00, visitsCount: 18, notes: "Prefiere vino tinto. Alérgico a mariscos." },
  { id: "c2", name: "María José Espinosa", email: "majo.espinosa@mail.com", phone: "0992318451", idDocument: "1712412519", points: 230, level: "Plata", totalSpent: 280.00, visitsCount: 7, notes: "Suele reservar mesa de terraza de tarde." },
  { id: "c3", name: "Viviana Ponce", email: "viviponce@hotmail.ec", phone: "0993184512", idDocument: "0921415123", points: 1540, level: "Platino", totalSpent: 1840.50, visitsCount: 42, notes: "Cliente VIP de entrega express los fines de semana." },
  { id: "c4", name: "Roberto Muñoz", email: "roby.munoz@gmail.com", phone: "0987123456", idDocument: "1709451234", points: 50, level: "Bronce", totalSpent: 45.00, visitsCount: 1 }
];

const INITIAL_RESERVATIONS: Reservation[] = [
  { id: "v1", customerName: "Guillermo Lasso", phone: "0991112223", email: "guillermo@gmail.ec", date: "2026-06-07", time: "19:30", covers: 4, tableId: "t6", tableName: "Mesa 6", status: "Confirmada", notes: "Seguridad ejecutiva cerca de la mesa." },
  { id: "v2", customerName: "Estefanía Cevallos", phone: "0992415124", date: "2026-06-07", time: "20:00", covers: 2, tableId: "t2", tableName: "Mesa 2", status: "Confirmada", notes: "Aniversario de bodas, pedir mesa discreta." },
  { id: "v3", customerName: "Andrés Guarderas", phone: "0984124612", email: "andres.guarderas@mail.ec", date: "2026-06-08", time: "14:00", covers: 6, status: "Pendiente" },
  { id: "v4", customerName: "Familia Ortega", phone: "0983124512", date: "2026-06-07", time: "21:00", covers: 5, status: "Lista de Espera" }
];

const INITIAL_EMPLOYEES: Employee[] = [
  { id: "e1", name: "Carlos Loor", role: "Mesero", phone: "0991241521", isActive: true, salesCount: 142, tipsEarned: 185.50, shiftCheckedIn: "2026-06-07T12:00:00Z" },
  { id: "e2", name: "Diana Valencia", role: "Mesero", phone: "0983415124", isActive: true, salesCount: 98, tipsEarned: 124.00, shiftCheckedIn: "2026-06-07T12:00:00Z" },
  { id: "e3", name: "Chef Segundo Ortiz", role: "Chef", phone: "0999014125", isActive: true, salesCount: 0, tipsEarned: 0, shiftCheckedIn: "2026-06-07T10:00:00Z" },
  { id: "e4", name: "Sofía Martínez", role: "Bartender", phone: "0981242125", isActive: true, salesCount: 45, tipsEarned: 60.50, shiftCheckedIn: "2026-06-07T14:00:00Z" },
  { id: "e5", name: "Pedro Jaramillo", role: "Cajero", phone: "0963125412", isActive: true, salesCount: 12, tipsEarned: 0 }
];

const INITIAL_SHIFTS: CashDrawerShift[] = [
  {
    id: "s1",
    startTime: "2026-06-07T12:00:00Z",
    startedBy: "Pedro Jaramillo",
    initialCash: 150.00,
    cashSales: 165.50,
    cardSales: 420.00,
    otherSales: 75.30,
    deposits: [],
    withdrawals: [
      { amount: 20.00, reason: "Pago de moto delivery", time: "2026-06-07T13:30:00Z" }
    ],
    expectedCash: 295.50,
    isClosed: false
  }
];

function getDemoCopilotReply(question: string, context: { sales: string; lowStock: number; occupied: number; tables: number }) {
  const normalized = question.toLowerCase();
  if (/(compr|inventario|ingrediente|stock|insumo)/.test(normalized)) {
    return `### Compras prioritarias\n\nHay **${context.lowStock} insumos** en nivel crítico. Prioriza tomate riñón y café de especialidad para evitar quiebres de stock. Después, crea una orden de compra para tu proveedor habitual y revisa el inventario tras recibirla.`;
  }
  if (/(ganancia|margen|rentab|plato|menú)/.test(normalized)) {
    return "### Rentabilidad del menú\n\nLa **Pizza Margherita Artesanal** es el producto ideal para empujar: combina buen margen y alta rotación. Prueba un combo con bebida en hora pico y monitorea el costo de mozzarella para mantener el margen.";
  }
  if (/(venta|horario|pico|demanda|martes)/.test(normalized)) {
    return `### Lectura operativa\n\nEl turno de mayor demanda está entre **19:30 y 21:30**. Ahora tienes **${context.occupied} de ${context.tables} mesas** activas y ventas simuladas por **$${context.sales}**. Refuerza cocina y barra antes de ese tramo.`;
  }
  return "### RestaurantOS Copilot — modo demo\n\nPuedo analizar ventas, inventario, rentabilidad y horas pico con los datos que cambias dentro de esta sesión. Esta respuesta se genera localmente: no se envía información a un servidor ni requiere una clave de IA.";
}

export default function App() {
  const [showApp, setShowApp] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("dashboard");

  // Core App States (Durable/Transient simulations with state)
  const [providers, setProviders] = useState<Provider[]>(INITIAL_PROVIDERS);
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>(INITIAL_RAW_MATERIALS);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [shifts, setShifts] = useState<CashDrawerShift[]>(INITIAL_SHIFTS);
  const [invoices, setInvoices] = useState<SriInvoice[]>([]);
  
  // Interactive UI states
  const [selectedTableForPos, setSelectedTableForPos] = useState<Table | null>(null);
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string>("Todos");
  const [currentCart, setCurrentCart] = useState<OrderItem[]>([]);
  const [cartNotes, setCartNotes] = useState<string>("");
  const [cartCustomerDoc, setCartCustomerDoc] = useState<string>("");
  const [cartDiscount, setCartDiscount] = useState<number>(0);
  const [cartPaymentMethod, setCartPaymentMethod] = useState<"Efectivo" | "Tarjeta de Crédito" | "Transferencia" | "Deuna" | "PayPal">("Efectivo");
  const [activeKdsType, setActiveKdsType] = useState<string>("todos"); // todos | kitchen | bar | dessert
  
  // Modifiers state
  const [activeModGroup, setActiveModGroup] = useState<{ item: MenuItem, group: any } | null>(null);
  const [selectedMods, setSelectedMods] = useState<any[]>([]);

  // BI state (Dashboard Builder)
  const [dashboardWidgets, setDashboardWidgets] = useState<string[]>([
    "ventas_hoy", "food_cost", "mesas_actividad", "bajo_inventario", "ranking_meseros", "ventas_tiempo_real"
  ]);
  const [availableWidgets, setAvailableWidgets] = useState<{id: string, label: string}[]>([
    { id: "ventas_hoy", label: "Ventas Totales Hoy" },
    { id: "food_cost", label: "Costo de Alimentos (Food Cost %)" },
    { id: "mesas_actividad", label: "Estado y Ocupación del Salón" },
    { id: "bajo_inventario", label: "Stock Crítico e Ingredientes" },
    { id: "ranking_meseros", label: "Rendimiento de Ventas por Personal" },
    { id: "ventas_tiempo_real", label: "Gráfico de Transacciones Recientes" },
    { id: "sri_autorizaciones", label: "Contador de Documentos SRI Autorizados" },
    { id: "delivery_split", label: "Canales de Delivery (Uber Eats, Rappi, etc)" }
  ]);
  const [showWidgetSelector, setShowWidgetSelector] = useState<boolean>(false);

  // Inventario interactivo / Compra
  const [purchaseOrderModal, setPurchaseOrderModal] = useState<boolean>(false);
  const [poProvider, setPoProvider] = useState<string>("p1");
  const [poItems, setPoItems] = useState<{ rawId: string, quantity: number, cost: number }[]>([]);

  // SRI Invoice PDF Visualizer Modal
  const [selectedInvoiceForPdf, setSelectedInvoiceForPdf] = useState<SriInvoice | null>(null);

  // Chat AI
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "init", role: "model", text: "¡Hola! Soy **RestaurantOS Copilot** 🤖 Tu consultor estratégico personal.\n\nPuedo ayudarte con análisis de mermas, optimización de menús y compras eficientes. Pregúntame, por ejemplo:\n* ¿Qué platos generan más ganancias?\n* ¿Qué ingredientes debo comprar hoy?\n* ¿Cuál es mi mejor horario de atención?", timestamp: new Date().toLocaleTimeString() }
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Calculations for dashboard
  const totalSalesVal = orders
    .filter(o => o.status !== OrderStatus.ANULADO)
    .reduce((sum, o) => sum + o.total, 0);

  const completedSalesVal = orders
    .filter(o => o.status === OrderStatus.ENTREGADO)
    .reduce((sum, o) => sum + o.total, 0);

  const occupiedTablesCount = tables.filter(t => t.status === TableStatus.OCUPADA || t.status === TableStatus.POR_COBRAR).length;
  const criticalStockItems = rawMaterials.filter(rm => rm.stock <= rm.minStock);

  // Recipe consumption engine
  const executeRecipeDeduction = (orderItemQuantity: number, menuItemId: string): boolean => {
    const item = menuItems.find(m => m.id === menuItemId);
    if (!item) return false;

    let updatedMaterials = [...rawMaterials];
    for (const ing of item.ingredients) {
      const material = updatedMaterials.find(rm => rm.id === ing.rawMaterialId);
      if (material) {
        const totalNeeded = ing.quantityNeeded * orderItemQuantity;
        if (material.stock < totalNeeded) {
          // Allow negative for simulation, but warn
        }
        material.stock = parseFloat((material.stock - totalNeeded).toFixed(2));
      }
    }
    setRawMaterials(updatedMaterials);
    return true;
  };

  // Chatbot handler
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputText("");
    setIsAiLoading(true);

    window.setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: "model",
        text: getDemoCopilotReply(textToSend, {
          sales: totalSalesVal.toFixed(2),
          lowStock: criticalStockItems.length,
          occupied: occupiedTablesCount,
          tables: tables.length
        }),
        timestamp: new Date().toLocaleTimeString()
      }]);
      setIsAiLoading(false);
    }, 550);
  };

  // Add Item to active POS Cart
  const handleAddToCart = (item: MenuItem) => {
    if (item.modifiers && item.modifiers.length > 0) {
      // Trigger modifiers modal
      setActiveModGroup({ item, group: item.modifiers[0] });
      setSelectedMods([]);
    } else {
      addToCartWithModifiers(item, []);
    }
  };

  const addToCartWithModifiers = (item: MenuItem, modifiers: any[]) => {
    const id = Math.random().toString();
    const modifierAddedPrice = modifiers.reduce((sum, m) => sum + m.price, 0);
    const finalPrice = item.price + modifierAddedPrice;

    const cartItem: OrderItem = {
      id,
      menuItemId: item.id,
      name: item.name,
      price: finalPrice,
      quantity: 1,
      selectedModifiers: modifiers.map(m => ({
        groupId: activeModGroup?.group.id || "manual",
        optionId: m.id,
        name: m.name,
        price: m.price
      })),
      notes: ""
    };

    setCurrentCart([...currentCart, cartItem]);
    setActiveModGroup(null);
    setSelectedMods([]);
  };

  // Submit POS Order
  const handleSubmitOrder = (isDelivery: boolean = false) => {
    if (currentCart.length === 0) return alert("El carrito está vacío");

    const orderNum = orders.length + 101;
    const subtotal = currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountedSubtotal = Math.max(0, subtotal - cartDiscount);
    const tax = parseFloat((discountedSubtotal * 0.15).toFixed(2)); // Ecuador 15% SRI VAT
    const serviceTip = isDelivery ? 0 : parseFloat((discountedSubtotal * 0.10).toFixed(2));
    const total = parseFloat((discountedSubtotal + tax + serviceTip).toFixed(2));

    let chosenCustomer: Customer | undefined;
    if (cartCustomerDoc) {
      chosenCustomer = customers.find(c => c.idDocument === cartCustomerDoc || c.phone === cartCustomerDoc);
    }

    // Recipe deduction on order submit!
    currentCart.forEach(ci => {
      executeRecipeDeduction(ci.quantity, ci.menuItemId);
    });

    const newOrder: Order = {
      id: `order_${Math.random().toString(36).substring(2, 9)}`,
      orderNum,
      items: [...currentCart],
      subtotal,
      discount: cartDiscount,
      tax,
      serviceTip,
      total,
      status: OrderStatus.PENDIENTE,
      dateTime: new Date().toISOString(),
      isDelivery,
      deliveryPlatform: isDelivery ? "WhatsApp" : "Local",
      customerName: chosenCustomer ? chosenCustomer.name : (isDelivery ? "Cliente Delivery" : "Consumidor Final"),
      customerPhone: chosenCustomer?.phone,
      waiterName: selectedTableForPos?.waiterName || "Carlos Loor"
    };

    // If table selected, bind order to table and transition table status
    if (selectedTableForPos) {
      newOrder.tableId = selectedTableForPos.id;
      newOrder.tableName = selectedTableForPos.name;
      
      setTables(tables.map(t => {
        if (t.id === selectedTableForPos.id) {
          return {
            ...t,
            status: TableStatus.OCUPADA,
            currentOrderId: newOrder.id,
            occupiedSince: new Date().toISOString()
          };
        }
        return t;
      }));
    }

    setOrders([newOrder, ...orders]);
    
    // Auto generate SRI Invoice Simulation setup
    const rucDoc = chosenCustomer?.idDocument || "1799999999001";
    const clName = chosenCustomer?.name || "Consumidor Final";
    const newInvoice: SriInvoice = {
      id: `sri_${Math.random().toString().substring(2, 6)}`,
      orderId: newOrder.id,
      accessKey: `0706202601${rucDoc.padEnd(13, '0')}2${orderNum.toString().padStart(9, '0')}1234567814`,
      dateTime: new Date().toLocaleDateString("es-EC") + " " + new Date().toLocaleTimeString(),
      customerName: clName,
      customerIdDocument: rucDoc,
      subtotal: discountedSubtotal,
      tax: tax,
      total: total,
      status: "AUTORIZADO",
      sriResponse: "PROCESADO Y AUTORIZADO POR EL SERVICIO DE RENTAS INTERNAS - FIRMADO DIGITALMENTE"
    };

    setInvoices([newInvoice, ...invoices]);

    // Add customer loyalty points
    if (chosenCustomer) {
      const addedPoints = Math.floor(total);
      setCustomers(customers.map(c => {
        if (c.id === chosenCustomer?.id) {
          return {
            ...c,
            points: c.points + addedPoints,
            totalSpent: c.totalSpent + total,
            visitsCount: c.visitsCount + 1
          };
        }
        return c;
      }));
    }

    // Reset checkout states
    setCurrentCart([]);
    setCartDiscount(0);
    setCartCustomerDoc("");
    setCartNotes("");
    setSelectedTableForPos(null);
    alert(`¡Orden #${orderNum} creada con éxito! Sincronizada con KDS y mermada en Almacén.`);
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-blue-600 selection:text-white">
      {/* View router for premium presentation */}
      {!showApp ? (
        <LandingPage onEnterApp={() => setShowApp(true)} />
      ) : (
        <div id="app-workspace-container" className="flex h-screen overflow-hidden text-neutral-200">
          
          {/* Elegant Dark Vertical Menu Rail (Stripe & Linear Inspired) */}
          <aside className="w-18 sm:w-64 bg-[#0d0d0d] border-r border-white/10 flex flex-col justify-between shrink-0">
            <div>
              {/* Brand Header */}
              <div className="h-16 flex items-center gap-3 px-4 border-b border-white/10 bg-black/40">
                <div onClick={() => setShowApp(false)} title="Volver a la presentación" className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-500/20 cursor-pointer">
                  <Utensils className="w-4 h-4" />
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-white tracking-tight">Restaurant<span className="text-blue-400">OS</span></span>
                  <p className="text-[10px] text-neutral-500 font-mono">MODO DEMO</p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="p-3 space-y-1">
                {[
                  { id: "dashboard", label: "Dashboard Ejecutivo", icon: <TrendingUp className="w-4 h-4" />, badge: "BI" },
                  { id: "pos", label: "POS & Comandas", icon: <ShoppingCart className="w-4 h-4" />, badge: "Touch" },
                  { id: "tables", label: "Mapa de Mesas", icon: <Layers className="w-4 h-4" />, badge: `${tables.length}` },
                  { id: "kds", label: "KDS Cocina Screen", icon: <ChefHat className="w-4 h-4" />, badge: `${orders.filter(o => o.status !== OrderStatus.ENTREGADO && o.status !== OrderStatus.ANULADO).length}` },
                  { id: "inventory", label: "Inventario y Fórmulas", icon: <Utensils className="w-4 h-4" />, badge: `${criticalStockItems.length}!` },
                  { id: "sri", label: "Facturación SRI", icon: <FileText className="w-4 h-4" />, badge: "EC" },
                  { id: "crm", label: "Clientes & Loyalty", icon: <Users className="w-4 h-4" /> },
                  { id: "reservations", label: "Reservas & Turnos", icon: <Calendar className="w-4 h-4" /> },
                  { id: "assistant", label: "IA Copilot", icon: <Bot className="w-4 h-4 animate-pulse" />, badge: "Demo" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    id={`sidebar-tab-${tab.id}`}
                    onClick={() => setCurrentTab(tab.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      currentTab === tab.id 
                      ? "bg-white/10 text-white border border-white/10 shadow-sm" 
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </div>
                    {tab.badge && (
                      <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.5 rounded-md font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Bottom Admin User block */}
            <div className="p-3 border-t border-white/10 bg-black/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs">
                    D
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-bold text-white">Restaurante de muestra</p>
                    <p className="text-[10px] text-neutral-500 flex items-center gap-1 font-mono">
                      Sesión temporal
                    </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowApp(false)}
                className="w-full text-center text-xs py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-colors border border-white/5"
              >
                Volver a la Web
              </button>
            </div>
          </aside>

          {/* Core Content Shell */}
          <main className="flex-1 flex flex-col bg-[#0a0a0a] overflow-hidden">
            
            {/* Real-time Status Header */}
            <header className="h-16 border-b border-white/10 px-8 flex items-center justify-between bg-[#0e0e0e]/80 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-4">
                <h1 className="text-lg font-bold text-white capitalize">{currentTab === 'sri' ? 'Facturación SRI' : currentTab}</h1>
                <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-0.5 rounded-full font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Turno de muestra activo
                </div>
              </div>

              {/* Status parameters */}
              <div className="flex items-center gap-4 text-xs">
                <div className="hidden md:flex flex-col text-right font-mono text-neutral-400">
                  <span>Fondo de caja: $150.00</span>
                  <span className="text-blue-400">Ventas Hoy: ${totalSalesVal.toFixed(2)}</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">Estado:</span>
                  <span className="text-blue-300 font-bold uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded font-mono">DEMO LOCAL</span>
                </div>
              </div>
            </header>

            {/* Tab Container scroll */}
            <div className="flex-1 overflow-y-auto p-8">
              
              {/* ==================== DASHBOARD TAB ==================== */}
              {currentTab === "dashboard" && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Top Notification alert if stock is critical */}
                  {criticalStockItems.length > 0 && (
                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-between text-orange-400">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        <span className="text-sm">Tenemos <strong>{criticalStockItems.length} ingredientes en nivel crítico</strong> de almacenamiento. Realizar pedido de reabastecimiento o consultar con Copilot.</span>
                      </div>
                      <button 
                        onClick={() => setCurrentTab("inventory")}
                        className="text-xs bg-orange-500 text-black font-bold px-3 py-1.5 rounded-xl hover:bg-orange-400"
                      >
                        Verificar Almacén
                      </button>
                    </div>
                  )}

                  {/* Elegant Dashboard Builder Header with Widget Adder */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-widest font-mono">BI & Analytics</p>
                      <h2 className="text-3xl font-extrabold text-white">Consola de Control del Fundador</h2>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setShowWidgetSelector(!showWidgetSelector)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-neutral-950 font-bold text-xs tracking-wide hover:bg-neutral-200 transition-all shadow-md"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        Personalizar Pantallas Builder
                      </button>

                      {showWidgetSelector && (
                        <div className="absolute right-0 mt-2 w-80 bg-[#161616] border border-white/10 rounded-2xl shadow-2xl p-4 z-40">
                          <h4 className="text-xs font-bold text-neutral-300 uppercase mb-3">Agregar / Quitar KPIs</h4>
                          <div className="space-y-2">
                            {availableWidgets.map(widget => {
                              const isAdded = dashboardWidgets.includes(widget.id);
                              return (
                                <button
                                  key={widget.id}
                                  onClick={() => {
                                    if (isAdded) {
                                      setDashboardWidgets(dashboardWidgets.filter(w => w !== widget.id));
                                    } else {
                                      setDashboardWidgets([...dashboardWidgets, widget.id]);
                                    }
                                  }}
                                  className="w-full text-left px-3 py-2 rounded-xl text-xs flex justify-between items-center transition-colors bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10"
                                >
                                  <span>{widget.label}</span>
                                  <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${isAdded ? "bg-emerald-500/10 text-emerald-400" : "bg-neutral-800 text-neutral-400"}`}>
                                    {isAdded ? "Habilitado" : "Oculto"}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                            <button
                              onClick={() => setShowWidgetSelector(false)}
                              className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold"
                            >
                              Aplicar Vista de Dashboard
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Grid layout driven by Dashboard Builder state */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {dashboardWidgets.includes("ventas_hoy") && (
                      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-[#262626] transition-all">
                        <span className="text-xs text-neutral-400 block uppercase font-bold tracking-widest mb-2 font-mono">VENTAS BRUTAS HOY</span>
                        <h3 className="text-3xl font-extrabold text-white font-mono">${totalSalesVal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                        <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" /> +14.8% comparado con la semana anterior
                        </p>
                        <div className="absolute right-4 bottom-4 text-white/5">
                          <DollarSign className="w-16 h-16" />
                        </div>
                      </div>
                    )}

                    {dashboardWidgets.includes("food_cost") && (
                      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-[#262626] transition-all">
                        <span className="text-xs text-neutral-400 block uppercase font-bold tracking-widest mb-2 font-mono">COSTO DE ALIMENTOS (FOOD COST %)</span>
                        <h3 className="text-3xl font-extrabold text-white font-mono">28.5%</h3>
                        <p className="text-teal-400 text-xs mt-2">
                          Meta operativa: Mantener por debajo del 30%
                        </p>
                        <div className="absolute right-4 bottom-4 text-white/5">
                          <Percent className="w-16 h-16" />
                        </div>
                      </div>
                    )}

                    {dashboardWidgets.includes("mesas_actividad") && (
                      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-[#262626] transition-all">
                        <span className="text-xs text-neutral-400 block uppercase font-bold tracking-widest mb-2 font-mono">OCUPACIÓN DE MESAS</span>
                        <h3 className="text-3xl font-extrabold text-blue-400 font-mono">{occupiedTablesCount} / {tables.length}</h3>
                        <p className="text-neutral-400 text-xs mt-2">
                          Rotación promedio de mesa: 1.8h / comensales
                        </p>
                        <div className="absolute right-4 bottom-4 text-white/5">
                          <Layers className="w-16 h-16" />
                        </div>
                      </div>
                    )}

                    {dashboardWidgets.includes("bajo_inventario") && (
                      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-[#262626] transition-all">
                        <span className="text-xs text-red-400 block uppercase font-bold tracking-widest mb-2 font-mono">ALERTAS DE ALMACÉN</span>
                        <h3 className="text-3xl font-extrabold text-orange-400 font-mono">{criticalStockItems.length} materiales</h3>
                        <p className="text-neutral-400 text-xs mt-2">
                          Ingredientes en stock menor o igual al mínimo
                        </p>
                        <div className="absolute right-4 bottom-4 text-white/5">
                          <AlertTriangle className="w-16 h-16" />
                        </div>
                      </div>
                    )}

                    {dashboardWidgets.includes("ranking_meseros") && (
                      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 col-span-1 md:col-span-2">
                        <span className="text-xs text-neutral-400 block uppercase font-bold tracking-widest mb-4 font-mono">RENDIMIENTO DE VENTAS POR PERSONAL HOY</span>
                        <div className="space-y-3">
                          {employees.map(emp => (
                            <div key={emp.id} className="flex justify-between items-center bg-black/30 p-2.5 rounded-xl border border-white/5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs">
                                  {emp.name.split(' ').map(n=>n[0]).join('')}
                                </div>
                                <div>
                                  <span className="text-sm font-bold text-white block">{emp.name}</span>
                                  <span className="text-[10px] text-neutral-400 font-mono">{emp.role} • Turno Activo</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-extrabold text-white font-mono">${(emp.salesCount * 12 + 15).toFixed(2)}</span>
                                <span className="text-[10px] text-emerald-400 block font-mono">Propina: ${emp.tipsEarned.toFixed(2)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {dashboardWidgets.includes("ventas_tiempo_real") && (
                      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 col-span-1 md:col-span-3">
                        <span className="text-xs text-neutral-400 block uppercase font-bold tracking-widest mb-4 font-mono">FLUJO DE CAJA - TRANSACCIONES RECIENTES</span>
                        <div className="aspect-[21/6] bg-black/40 rounded-xl border border-white/5 p-4 relative flex items-end justify-between overflow-hidden">
                          {/* Beautiful simulated micro bar chart using SVG style coordinates */}
                          <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-30 select-none">
                            <span className="text-[9px] font-mono text-neutral-400">$200</span>
                            <span className="text-[9px] font-mono text-neutral-400">$100</span>
                            <span className="text-[9px] font-mono text-neutral-400">$0</span>
                          </div>
                          
                          <div className="relative z-10 w-full flex items-end justify-between h-40 pt-4">
                            {orders.slice().reverse().map((o, idx) => (
                              <div key={o.id} className="flex flex-col items-center flex-1 group">
                                <div className="text-[9px] font-mono text-emerald-400 scale-90 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  ${o.total.toFixed(0)}
                                </div>
                                <div 
                                  className={`w-8 rounded-t-lg transition-all border ${
                                    o.status === OrderStatus.ENTREGADO 
                                      ? "bg-emerald-500/20 border-emerald-500/40 hover:bg-emerald-500/30" 
                                      : "bg-blue-500/20 border-blue-500/40 hover:bg-blue-500/30"
                                  }`}
                                  style={{ height: `${Math.min(100, (o.total / 150) * 100)}px` }}
                                ></div>
                                <div className="text-[9px] text-neutral-500 font-mono mt-2 uppercase">
                                  #{o.orderNum}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {dashboardWidgets.includes("sri_autorizaciones") && (
                      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6">
                        <span className="text-xs text-neutral-400 block uppercase font-bold tracking-widest mb-2 font-mono">AUTORIZADOS SRI ECUADOR</span>
                        <h3 className="text-3xl font-extrabold text-teal-400 font-mono">{invoices.filter(i => i.status === "AUTORIZADO").length + 24}</h3>
                        <p className="text-neutral-400 text-xs mt-2">
                          100% éxito sincronización de clave de acceso de 49 dígitos
                        </p>
                      </div>
                    )}

                    {dashboardWidgets.includes("delivery_split") && (
                      <div className="bg-[#161616] border border-white/10 rounded-2xl p-6">
                        <span className="text-xs text-neutral-400 block uppercase font-bold tracking-widest mb-2 font-mono">DELIVERY HUB SPLIT</span>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="bg-black/30 p-2 border border-white/5 rounded-xl text-center">
                            <span className="text-[10px] text-orange-400 block font-bold font-mono">Uber Eats</span>
                            <span className="text-sm font-bold font-mono">35%</span>
                          </div>
                          <div className="bg-black/30 p-2 border border-white/5 rounded-xl text-center">
                            <span className="text-[10px] text-red-400 block font-bold font-mono">Rappi</span>
                            <span className="text-sm font-bold font-mono">45%</span>
                          </div>
                          <div className="bg-black/30 p-2 border border-white/5 rounded-xl text-center">
                            <span className="text-[10px] text-red-500 block font-bold font-mono">PedidosYa</span>
                            <span className="text-sm font-bold font-mono">15%</span>
                          </div>
                          <div className="bg-black/30 p-2 border border-white/5 rounded-xl text-center">
                            <span className="text-[10px] text-green-400 block font-bold font-mono">Propio / WA</span>
                            <span className="text-sm font-bold font-mono">5%</span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Business intelligence block options */}
                  <div className="border border-white/10 p-5 rounded-2xl bg-gradient-to-r from-blue-900/10 via-black to-emerald-900/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                        <Bot className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">¿Necesitas asesoría estratégica con Inteligencia Artificial?</h4>
                        <p className="text-sm text-neutral-400">Pregúntale a RestaurantOS Copilot por predicciones de ventas y mermas sugeridas.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setCurrentTab("assistant")}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wider rounded-xl uppercase transition-colors"
                    >
                      Consultar con Copilot IA
                    </button>
                  </div>

                </div>
              )}

              {/* ==================== POS TAB ==================== */}
              {currentTab === "pos" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-fade-in">
                  
                  {/* Left block Food ordering grid */}
                  <div className="col-span-1 lg:col-span-8 flex flex-col space-y-6">
                    
                    {/* Categories rail & Quick selections */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-sm sm:max-w-xl">
                        {["Todos", "Pizzas", "Carnes", "Café y Postres", "Bebidas"].map(cat => (
                          <button
                            key={cat}
                            onClick={() => setSelectedMenuCategory(cat)}
                            className={`text-xs px-3.5 py-2 border font-bold rounded-lg shrink-0 transition-colors ${selectedMenuCategory === cat ? "bg-blue-600 border-blue-500 text-white" : "bg-[#161616] border-white/10 hover:border-white/20 hover:bg-white/5 text-neutral-300"}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* Binding table selector */}
                      <select
                        onChange={(e) => {
                          const tbl = tables.find(t => t.id === e.target.value);
                          if (tbl) setSelectedTableForPos(tbl);
                        }}
                        className="bg-[#161616] border border-white/10 text-white text-xs px-4 py-2 rounded-xl focus:outline-none"
                      >
                        <option value="">Ligar a Mesa (Física)...</option>
                        {tables.map(t => (
                          <option key={t.id} value={t.id}>
                            {t.name} (Capacidad: {t.capacity}) • {t.status}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Food Items list Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {menuItems.filter(item => selectedMenuCategory === "Todos" || item.category === selectedMenuCategory).map(item => (
                        <div 
                          key={item.id} 
                          className="bg-[#161616] border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-500/30 transition-all cursor-pointer group"
                          onClick={() => handleAddToCart(item)}
                        >
                          <div>
                            <div className="flex justify-between items-start">
                              <span className="text-3xl p-1 bg-white/5 rounded-xl block">{item.image || "🍽️"}</span>
                              {item.preparationStation && (
                                <span className="text-[9px] px-2 py-0.5 rounded uppercase font-mono font-bold bg-neutral-800 text-neutral-400">
                                  {item.preparationStation}
                                </span>
                              )}
                            </div>
                            <h4 className="text-base font-bold text-white mt-4 group-hover:text-blue-400 transition-colors">{item.name}</h4>
                            <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{item.description}</p>
                          </div>

                          <div className="mt-6 flex justify-between items-center border-t border-white/5 pt-3">
                            <span className="text-base font-extrabold text-white font-mono">${item.price.toFixed(2)}</span>
                            <button onClick={(event) => { event.stopPropagation(); handleAddToCart(item); }} aria-label={`Agregar ${item.name}`} className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick helper for modifiers explanation */}
                    <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl text-xs text-blue-400 flex items-start gap-2.5">
                      <Info className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                      <span><strong>Modificadores & Recetas:</strong> Al seleccionar un plato, el sistema verifica ingredientes disponibles en tiempo real. Al procesar el pago, se descuentan las porciones exactas definidas en la receta maestra.</span>
                    </div>

                  </div>

                  {/* Right Column: Active Order Checkout Form */}
                  <div className="col-span-1 lg:col-span-4 bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative">
                    
                    {/* Header of Checkout */}
                    <div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="w-5 h-5 text-blue-400" />
                          <h3 className="text-base font-bold text-white">Comanda Activa</h3>
                        </div>
                        {selectedTableForPos && (
                          <span className="text-xs px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono font-bold rounded">
                            {selectedTableForPos.name}
                          </span>
                        )}
                      </div>

                      {/* Cart Items list */}
                      {currentCart.length === 0 ? (
                        <div className="py-20 text-center text-neutral-500 text-xs">
                          <ShoppingCart className="w-12 h-12 mx-auto text-neutral-600 mb-3" />
                          Haz click en cualquier plato para agregar a la comanda activa.
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                          {currentCart.map(cartItem => (
                            <div key={cartItem.id} className="bg-black/30 p-3 rounded-xl border border-white/5 flex flex-col justify-between">
                              <div className="flex justify-between">
                                <span className="text-sm font-bold text-white">{cartItem.name}</span>
                                <span className="text-sm font-mono font-bold">${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
                              </div>
                              
                              {cartItem.selectedModifiers.length > 0 && (
                                <div className="text-[11px] text-neutral-400 mt-1 pl-2 border-l border-white/5 italic">
                                  + {cartItem.selectedModifiers.map(m => m.name).join(', ')}
                                </div>
                              )}

                              <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      if (cartItem.quantity > 1) {
                                        setCurrentCart(currentCart.map(c => c.id === cartItem.id ? { ...c, quantity: c.quantity - 1 } : c));
                                      } else {
                                        setCurrentCart(currentCart.filter(c => c.id !== cartItem.id));
                                      }
                                    }}
                                    className="p-1 bg-white/5 hover:bg-white/10 rounded"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="text-xs font-mono font-bold">{cartItem.quantity}</span>
                                  <button
                                    onClick={() => {
                                      setCurrentCart(currentCart.map(c => c.id === cartItem.id ? { ...c, quantity: c.quantity + 1 } : c));
                                    }}
                                    className="p-1 bg-white/5 hover:bg-white/10 rounded"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => setCurrentCart(currentCart.filter(c => c.id !== cartItem.id))}
                                  className="text-red-400 hover:text-red-300 p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Checkout Billing Settings */}
                    <div className="mt-6 border-t border-white/10 pt-4 space-y-4">
                      
                      {/* Search client input */}
                      <div>
                        <label className="text-[10px] text-neutral-400 uppercase font-bold font-mono tracking-widest block mb-1">Cédula / Celular / RUC de Cliente</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Buscar cliente para acumulación..."
                            value={cartCustomerDoc}
                            onChange={(e) => setCartCustomerDoc(e.target.value)}
                            className="w-full text-xs bg-black border border-white/10 rounded-xl px-3 py-2.5 pl-8 focus:outline-none focus:border-blue-500 font-mono text-white"
                          />
                          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-3" />
                        </div>
                        {cartCustomerDoc && (
                          <div className="p-2 border border-white/5 bg-black/50 text-[11px] rounded-lg mt-1 flex justify-between items-center text-neutral-400 font-mono">
                            {customers.find(c => c.idDocument === cartCustomerDoc || c.phone === cartCustomerDoc) ? (
                              <span className="text-emerald-400">✅ Cliente Registrado: <strong>{customers.find(c => c.idDocument === cartCustomerDoc || c.phone === cartCustomerDoc)?.name}</strong></span>
                            ) : (
                              <span>Invitado sin registro (Consumidor Final)</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Discount and Payment Settings */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-neutral-400 uppercase font-mono block mb-1">Descuento ($)</label>
                          <input
                            type="number"
                            min="0"
                            placeholder="0"
                            value={cartDiscount || ""}
                            onChange={(e) => setCartDiscount(Math.max(0, parseFloat(e.target.value)) || 0)}
                            className="w-full text-xs bg-black border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-400 uppercase font-mono block mb-1">Médula de Pago</label>
                          <select
                            value={cartPaymentMethod}
                            onChange={(e: any) => setCartPaymentMethod(e.target.value)}
                            className="w-full text-xs bg-black border border-white/10 rounded-xl px-2 py-2 focus:outline-none focus:border-blue-500 text-white"
                          >
                            <option value="Efectivo">Efectivo</option>
                            <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                            <option value="Transferencia">Transferencia</option>
                            <option value="Deuna">Deuna (Pichincha)</option>
                          </select>
                        </div>
                      </div>

                      {/* Cost Summary block */}
                      {currentCart.length > 0 && (
                        <div className="border-t border-dashed border-white/10 pt-3 space-y-1.5 font-mono text-xs">
                          <div className="flex justify-between text-neutral-400">
                            <span>Subtotal</span>
                            <span>${currentCart.reduce((sum, c) => sum + (c.price * c.quantity), 0).toFixed(2)}</span>
                          </div>
                          {cartDiscount > 0 && (
                            <div className="flex justify-between text-red-400">
                              <span>Descuento aplicado</span>
                              <span>-${cartDiscount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-neutral-400">
                            <span>IVA (15% SRI)</span>
                            <span>${(Math.max(0, currentCart.reduce((sum, c) => sum + (c.price * c.quantity), 0) - cartDiscount) * 0.15).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-neutral-400 font-bold border-t border-dashed border-white/5 pt-1.5 text-base text-white">
                            <span>Total de Comanda</span>
                            <span>${(
                              Math.max(0, currentCart.reduce((sum, c) => sum + (c.price * c.quantity), 0) - cartDiscount) * 1.15 + 
                              (selectedTableForPos ? Math.max(0, currentCart.reduce((sum, c) => sum + (c.price * c.quantity), 0) - cartDiscount) * 0.10 : 0)
                            ).toFixed(2)}</span>
                          </div>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          onClick={() => handleSubmitOrder(false)}
                          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs uppercase"
                        >
                          Pago de Mesa
                        </button>
                        <button
                          onClick={() => handleSubmitOrder(true)}
                          className="w-full py-3 bg-emerald-500 text-neutral-900 hover:bg-emerald-400 font-extrabold rounded-xl text-xs uppercase"
                        >
                          Enviar Delivery
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* ==================== ACTIVE MODIFIERS MODAL ==================== */}
              {activeModGroup && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-[#161616] border border-white/10 rounded-2xl w-full max-w-md p-6 relative">
                    <h3 className="text-lg font-bold text-white mb-2">Personalizar {activeModGroup.item.name}</h3>
                    <p className="text-xs text-neutral-400 mb-4">Selecciona opciones de {activeModGroup.group.name}</p>

                    <div className="space-y-2 mb-6">
                      {activeModGroup.group.options.map((opt: any) => {
                        const isSelected = selectedMods.some(s => s.id === opt.id);
                        return (
                          <button
                            key={opt.id}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedMods(selectedMods.filter(s => s.id !== opt.id));
                              } else {
                                setSelectedMods([...selectedMods, opt]);
                              }
                            }}
                            className={`w-full text-left p-3 rounded-xl border text-xs flex justify-between items-center transition-all ${
                              isSelected 
                                ? "bg-blue-500/10 border-blue-500/30 text-white" 
                                : "bg-neutral-900 border-white/5 text-neutral-300 hover:border-white/10"
                            }`}
                          >
                            <span>{opt.name}</span>
                            <span className="font-mono font-bold">
                              {opt.price > 0 ? `+$${opt.price.toFixed(2)}` : "Gratis"}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setActiveModGroup(null)}
                        className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 text-xs font-bold rounded-xl border border-white/5"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => addToCartWithModifiers(activeModGroup.item, selectedMods)}
                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl"
                      >
                        Confirmar y Agregar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== TABLES TAB ==================== */}
              {currentTab === "tables" && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-widest font-mono">Disposición Física</p>
                      <h2 className="text-3xl font-extrabold text-white">Salón e Indicadores en Tiempo Real</h2>
                    </div>
                    {/* States legends summary */}
                    <div className="flex items-center gap-3 text-xs flex-wrap">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Libre</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Ocupada</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Por Cobrar</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-600 animate-pulse"></span> Reservada</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-neutral-600 animate-spin"></span> Limpieza</span>
                    </div>
                  </div>

                  {/* Salón visual map layout */}
                  <div className="border border-white/10 rounded-2xl bg-black/40 h-100 p-8 relative overflow-hidden flex items-center justify-center">
                    
                    {/* Simulated visual grid boundaries of restaurant floor */}
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>
                    
                    <div className="relative w-full h-full max-w-2xl border border-dashed border-white/5 bg-black/20 rounded-xl relative flex flex-wrap items-center justify-around p-6 overflow-y-auto">
                      {tables.map(table => {
                        let colorClasses = "bg-emerald-500/10 border-emerald-500/40 text-emerald-400";
                        if (table.status === TableStatus.OCUPADA) colorClasses = "bg-red-500/10 border-red-500/40 text-red-400";
                        if (table.status === TableStatus.POR_COBRAR) colorClasses = "bg-amber-500/10 border-amber-500/40 text-amber-400";
                        if (table.status === TableStatus.RESERVADA) colorClasses = "bg-yellow-500/10 border-yellow-500/40 text-yellow-300";
                        if (table.status === TableStatus.EN_LIMPIEZA) colorClasses = "bg-neutral-800 border-neutral-700 text-neutral-400";

                        return (
                          <div
                            key={table.id}
                            className={`w-36 p-4 rounded-2xl border flex flex-col justify-between text-center select-none cursor-pointer hover:scale-105 transition-all shadow-md ${colorClasses}`}
                            onClick={() => {
                              // Switch stats simulation table status on click!
                              const nextStatusMap: { [key: string]: TableStatus } = {
                                "LIBRE": TableStatus.OCUPADA,
                                "OCUPADA": TableStatus.POR_COBRAR,
                                "POR_COBRAR": TableStatus.EN_LIMPIEZA,
                                "EN_LIMPIEZA": TableStatus.RESERVADA,
                                "RESERVADA": TableStatus.LIBRE
                              };
                              const next = nextStatusMap[table.status];
                              setTables(tables.map(t => {
                                if (t.id === table.id) {
                                  return { ...t, status: next, occupiedSince: next === TableStatus.OCUPADA ? new Date().toISOString() : undefined };
                                }
                                return t;
                              }));
                            }}
                          >
                            <div>
                              <span className="text-xs uppercase font-bold text-neutral-400 block font-mono">SALÓN</span>
                              <span className="text-lg font-extrabold block mt-1">{table.name}</span>
                              <span className="text-[10px] text-neutral-400 font-mono">Capacidad: {table.capacity}</span>
                            </div>

                            <div className="mt-4 pt-2 border-t border-white/5 text-[10px] uppercase font-mono font-bold tracking-wider">
                              {table.status}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>

                  <div className="bg-[#161616] p-4 rounded-xl border border-white/10 text-xs text-neutral-400 flex items-center justify-between">
                    <span>💡 <strong>Consejo rápido de Salón:</strong> Haz click sobre cualquier mesa para simular el ciclo de atención del comensal. Los estados cambian de forma fluida: Libre ➔ Ocupada ➔ Por Cobrar ➔ En Limpieza.</span>
                  </div>

                </div>
              )}

              {/* ==================== KDS TAB ==================== */}
              {currentTab === "kds" && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Station selectors & info heading */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-widest font-mono">Kitchen Display System</p>
                      <h2 className="text-3xl font-extrabold text-white">Pantalla Ejecutiva de Pedidos</h2>
                    </div>

                    <div className="flex items-center gap-2">
                      {["todos", "kitchen", "bar", "dessert"].map(station => (
                        <button
                          key={station}
                          onClick={() => setActiveKdsType(station)}
                          className={`text-xs px-3.5 py-1.5 rounded-lg border font-bold capitalize transition-all ${
                            activeKdsType === station 
                              ? "bg-blue-600 border-blue-500 text-white" 
                              : "bg-[#161616] border-white/10 text-neutral-300"
                          }`}
                        >
                          Sección: {station}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* KDS Active Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders
                      .filter(o => o.status !== OrderStatus.ENTREGADO && o.status !== OrderStatus.ANULADO)
                      .map(order => {
                        // Check if order contains items for active KDS type
                        const filteredItems = order.items.filter(item => {
                          const menuI = menuItems.find(m => m.id === item.menuItemId);
                          return activeKdsType === "todos" || menuI?.preparationStation === activeKdsType;
                        });

                        if (filteredItems.length === 0) return null;

                        // Timer calculation simulation
                        const minElapsed = Math.round((new Date().getTime() - new Date(order.dateTime).getTime()) / 60000);
                        const isDelayed = minElapsed > 15;

                        return (
                          <div 
                            key={order.id} 
                            className={`bg-[#161616] border rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between ${
                              isDelayed ? "border-red-500/30 ring-1 ring-red-500/20" : "border-white/10"
                            }`}
                          >
                            
                            {/* Card Header */}
                            <div className="p-4 bg-black/40 border-b border-white/5 flex justify-between items-center">
                              <div>
                                <span className="text-xs text-neutral-400 block font-mono font-medium">PEDIDO #{order.orderNum}</span>
                                <span className="text-sm font-bold text-white capitalize">{order.tableName || `Delivery: ${order.deliveryPlatform}`}</span>
                              </div>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-1 ${
                                isDelayed ? "bg-red-500/15 text-red-400 border border-red-500/30" : "bg-neutral-800 text-neutral-300"
                              }`}>
                                <Clock className="w-3.5 h-3.5" />
                                {minElapsed} min
                              </span>
                            </div>

                            {/* Card Body - list of food items */}
                            <div className="p-4 flex-1 space-y-3.5">
                              {filteredItems.map(item => (
                                <div key={item.id} className="flex justify-between items-start text-xs">
                                  <div>
                                    <span className="font-extrabold text-white text-sm">{item.quantity}x</span>
                                    <span className="ml-2 font-bold text-neutral-200">{item.name}</span>
                                    {item.selectedModifiers.length > 0 && (
                                      <p className="text-[10px] text-neutral-400 pl-6 mt-0.5 italic">
                                        + {item.selectedModifiers.map(m => m.name).join(', ')}
                                      </p>
                                    )}
                                    {item.notes && (
                                      <p className="text-[10px] text-amber-400 pl-6 mt-1 font-mono">
                                        Nota: {item.notes}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Card Footer - Status Action Controller */}
                            <button
                              onClick={() => {
                                const nextStatusMap: { [key: string]: OrderStatus } = {
                                  "PENDIENTE": OrderStatus.PREPARANDO,
                                  "PREPARANDO": OrderStatus.LISTO,
                                  "LISTO": OrderStatus.ENTREGADO
                                };
                                const next = nextStatusMap[order.status] || OrderStatus.ENTREGADO;
                                setOrders(orders.map(o => o.id === order.id ? { ...o, status: next } : o));
                              }}
                              className="w-full py-3 bg-neutral-900 hover:bg-[#111] text-xs font-bold whitespace-nowrap uppercase tracking-wider text-emerald-400 border-t border-white/5 flex items-center justify-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Marcar como: {order.status === OrderStatus.PENDIENTE ? "Preparando" : order.status === OrderStatus.PREPARANDO ? "Listo" : "Entregado"}
                            </button>

                          </div>
                        );
                      })}
                  </div>

                </div>
              )}

              {/* ==================== INVENTORY TAB ==================== */}
              {currentTab === "inventory" && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Inventory Overview and Supplies actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-widest font-mono">Recetas e Ingredientes</p>
                      <h2 className="text-3xl font-extrabold text-white">Almacén de Materias Primas</h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setPoItems(rawMaterials.map(rm => ({ rawId: rm.id, quantity: rm.minStock * 2, cost: rm.unitPrice })));
                          setPurchaseOrderModal(true);
                        }}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide rounded-xl uppercase transition-all"
                      >
                        Crear Orden de Compra (Sugerido)
                      </button>
                    </div>
                  </div>

                  {/* Materials current listing table */}
                  <div className="bg-[#161616] border border-white/10 rounded-2xl overflow-hidden shadow-md">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-black/40 border-b border-white/5 text-neutral-400 font-mono uppercase text-[10px]">
                          <th className="p-4">Ingrediente / Insumo</th>
                          <th className="p-4">Categoría</th>
                          <th className="p-4">Stock Actual</th>
                          <th className="p-4">Stock Mínimo</th>
                          <th className="p-4">Precio Unitario</th>
                          <th className="p-4">Último Despacho</th>
                          <th className="p-4 text-center">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {rawMaterials.map(rm => {
                          const isLow = rm.stock <= rm.minStock;
                          return (
                            <tr key={rm.id} className="hover:bg-white/[0.02]">
                              <td className="p-4 font-bold text-white">{rm.name}</td>
                              <td className="p-4 text-neutral-400 capitalize">{rm.category}</td>
                              <td className="p-4 font-mono font-bold text-neutral-300">
                                {rm.stock} {rm.unit}
                              </td>
                              <td className="p-4 font-mono text-neutral-500">
                                {rm.minStock} {rm.unit}
                              </td>
                              <td className="p-4 font-mono text-neutral-400">${rm.unitPrice.toFixed(2)}</td>
                              <td className="p-4 font-mono text-neutral-500">{rm.lastSuppliedDate || "-"}</td>
                              <td className="p-4 text-center">
                                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                                  isLow ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-emerald-500/10 text-emerald-400"
                                }`}>
                                  {isLow ? "Abastecer urgente" : "Suficiente"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Master specs info and providers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Providers details card */}
                    <div className="bg-[#161616] border border-white/10 p-6 rounded-2xl">
                      <h4 className="text-base font-bold text-white mb-4 border-b border-white/5 pb-2 uppercase tracking-wide">Proveedores Homologados</h4>
                      <div className="space-y-4">
                        {providers.map(prov => (
                          <div key={prov.id} className="p-3 bg-black/40 border border-white/5 rounded-xl flex justify-between items-center">
                            <div>
                              <span className="text-sm font-bold block text-white">{prov.name}</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Contacto: {prov.contact} • {prov.phone}</span>
                            </div>
                            <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded font-mono font-bold">★ {prov.score}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recipe Matrix rules explanation card */}
                    <div className="bg-[#161616] border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
                      <div>
                        <h4 className="text-base font-bold text-white mb-4 border-b border-white/5 pb-2 uppercase tracking-wide">Fórmula de Descuento Maestra (Receta)</h4>
                        <div className="space-y-3 text-xs text-neutral-400 leading-relaxed">
                          <p>
                            Cada plato en RestaurantOS está ligado de forma relacional y matemática a un conjunto de materias primas.
                          </p>
                          <div className="p-3.5 bg-black/40 border border-white/5 rounded-xl font-mono text-[11px]">
                            <strong className="text-white block mb-1">Ejemplo: Pizza Margherita Artesanal</strong>
                            - Harina de Trigo: 300g (Merma directa)<br/>
                            - Queso Mozzarella: 250g (Merma directa)<br/>
                            - Salsa de Tomate: 150ml<br/>
                            - Tomates Orgánicos: 100g
                          </div>
                          <p>
                            Al emitir un ticket de comanda desde el POS, las celdas se actualizan en el acto evitando robos hormiga o descalces de auditorías físicas.
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex gap-4">
                        {/* Simulation trigger button to show recipe engine working live */}
                        <button
                          onClick={() => {
                            executeRecipeDeduction(1, "m1");
                            alert("Se descontó en vivo: 300g Harina, 250g Queso Mozzarella, 150ml Salsa de Tomate y 100g Tomate Riñón. ¡Revisa el stock actual en la tabla!");
                          }}
                          className="w-full py-2.5 bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-xs font-bold text-white rounded-xl"
                        >
                          Simular consumo de Pizza Margherita Artesanal (1 unidad)
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* ==================== SRI TAB (FACTURACION ELECTRONICA) ==================== */}
              {currentTab === "sri" && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Government integration Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-widest font-mono">Servicio de Rentas Internas - SRI Ecuador</p>
                      <h2 className="text-3xl font-extrabold text-white">Comprobantes Electrónicos Firmados</h2>
                    </div>

                    <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Ambiente de Producción: ACTIVO
                    </span>
                  </div>

                  {/* Sri invoices summary counters */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-[#161616] border border-white/10 p-4 rounded-xl font-mono text-center">
                      <span className="text-[10px] text-neutral-500 block uppercase font-bold">Establecimiento</span>
                      <span className="text-lg font-bold text-white block mt-1">001 - Principal Vía</span>
                    </div>
                    <div className="bg-[#161616] border border-white/10 p-4 rounded-xl font-mono text-center">
                      <span className="text-[10px] text-neutral-500 block uppercase font-bold">Punto Emisión</span>
                      <span className="text-lg font-bold text-white block mt-1">002 - Caja POS Central</span>
                    </div>
                    <div className="bg-[#161616] border border-white/10 p-4 rounded-xl font-mono text-center">
                      <span className="text-[10px] text-neutral-500 block uppercase font-bold">Impuesto Base</span>
                      <span className="text-lg font-bold text-teal-400 block mt-1">IVA 15% Vigente</span>
                    </div>
                    <div className="bg-[#161616] border border-white/10 p-4 rounded-xl font-mono text-center bg-emerald-500/5">
                      <span className="text-[10px] text-emerald-400 block uppercase font-bold">Firma Electrónica</span>
                      <span className="text-lg font-bold text-emerald-400 block mt-1">Válida (Exp. 2028)</span>
                    </div>
                  </div>

                  {/* SRI Listing */}
                  <div className="bg-[#161616] border border-white/10 rounded-2xl overflow-hidden shadow-md">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-black/40 border-b border-white/5 text-neutral-400 font-mono uppercase text-[10px]">
                          <th className="p-4">Fecha y Hora</th>
                          <th className="p-4">Cliente / Contribuyente</th>
                          <th className="p-4">Cédula / RUC</th>
                          <th className="p-4">Clave de Acceso SRI (49 dígitos)</th>
                          <th className="p-4">Total Retención/Factura</th>
                          <th className="p-4">Estado SRI</th>
                          <th className="p-4 text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {/* Static built invoices list for demo and interactive ones */}
                        {invoices.length === 0 && (
                          <tr>
                            <td colSpan={7} className="p-12 text-center text-neutral-500">
                              No se han creado facturas en esta sesión del sistema. Las facturas del SRI se procesan de inmediato al emitir un cobro en el POS.
                            </td>
                          </tr>
                        )}
                        {invoices.map(inv => (
                          <tr key={inv.id} className="hover:bg-white/[0.02]">
                            <td className="p-4 font-mono font-medium text-neutral-300">{inv.dateTime}</td>
                            <td className="p-4 font-bold text-white">{inv.customerName}</td>
                            <td className="p-4 font-mono text-neutral-400">{inv.customerIdDocument}</td>
                            <td className="p-4 font-mono text-neutral-500 truncate max-w-xs">{inv.accessKey}</td>
                            <td className="p-4 font-mono font-bold text-neutral-300">${inv.total.toFixed(2)}</td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {inv.status}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => setSelectedInvoiceForPdf(inv)}
                                className="text-xs bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-3 py-1.5 rounded-xl border border-white/5"
                              >
                                Ver PDF / RIDE
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {/* ==================== SRI INVOICE PDF/RIDE MODAL ==================== */}
              {selectedInvoiceForPdf && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                  <div className="bg-white text-neutral-900 rounded-3xl w-full max-w-2xl p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
                    <button 
                      onClick={() => setSelectedInvoiceForPdf(null)}
                      className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-neutral-950 rounded-full hover:bg-neutral-100"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {/* Simulated RIDE standard ticket Ecuador format */}
                    <div className="border-b border-neutral-200 pb-4 mb-4 text-center">
                      <h3 className="text-lg font-bold font-sans uppercase text-neutral-800 tracking-wide">COMPROBANTE AUTORIZADO DE EXPORTACIÓN ELECTRÓNICA</h3>
                      <p className="text-xs text-neutral-500 font-mono">RESTAURANTOS CORPORACIÓN ECUADOR S.A.S.</p>
                      <p className="text-xs text-neutral-500">Matriz: Vía Samborondón Km 2.5, Guayaquil, Ecuador</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 text-xs mb-6 font-mono border-b border-neutral-100 pb-4">
                      <div>
                        <p className="text-neutral-500 font-bold uppercase block">RUC Emisor:</p>
                        <p className="text-neutral-800 font-bold">1792415124001</p>
                        <p className="text-neutral-500 font-bold uppercase block mt-3">Número de Comprobante:</p>
                        <p className="text-neutral-800">001-002-000000142</p>
                      </div>
                      <div>
                        <p className="text-neutral-500 font-bold uppercase block">Clave de Acceso SRI:</p>
                        <p className="text-neutral-800 leading-tight break-all text-[10px]">{selectedInvoiceForPdf.accessKey}</p>
                        <p className="text-neutral-500 font-bold uppercase block mt-3">Estado SRI:</p>
                        <p className="text-emerald-600 font-bold">AUTORIZADO POR SRI EN LÍNEA</p>
                      </div>
                    </div>

                    <div className="text-xs space-y-2 mb-6 font-mono border-b border-neutral-100 pb-4">
                      <p><strong className="text-neutral-500">Razón Social:</strong> {selectedInvoiceForPdf.customerName}</p>
                      <p><strong className="text-neutral-500">Cédula / RUC:</strong> {selectedInvoiceForPdf.customerIdDocument}</p>
                      <p><strong className="text-neutral-500">Fecha de Emisión:</strong> {selectedInvoiceForPdf.dateTime}</p>
                    </div>

                    <table className="w-full text-left text-xs mb-6 font-mono border-b border-neutral-200 pb-4">
                      <thead>
                        <tr className="border-b border-neutral-200 text-neutral-400">
                          <th className="pb-2">Cant</th>
                          <th className="pb-2">Descripción Producto</th>
                          <th className="pb-2 text-right">Unitario</th>
                          <th className="pb-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        <tr>
                          <td className="py-2.5">1</td>
                          <td className="py-2.5">Consumo Alimentos en Establecimiento</td>
                          <td className="py-2.5 text-right">${selectedInvoiceForPdf.subtotal.toFixed(2)}</td>
                          <td className="py-2.5 text-right">${selectedInvoiceForPdf.subtotal.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="w-56 ml-auto font-mono text-xs space-y-1.5 border-t border-neutral-200 pt-3">
                      <div className="flex justify-between text-neutral-500">
                        <span>Subtotal 15%:</span>
                        <span>${selectedInvoiceForPdf.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-neutral-500">
                        <span>Subtotal 0%:</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between text-neutral-500">
                        <span>IVA 15%:</span>
                        <span>${selectedInvoiceForPdf.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-neutral-800 font-bold border-t border-neutral-300 pt-1.5 text-sm">
                        <span>Total de Factura:</span>
                        <span>${selectedInvoiceForPdf.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-8 text-center text-[10px] text-neutral-400 font-mono">
                      Este documento digital cuenta con firma de validez electrónica simulada de RestaurantOS.
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== CUSTOMERS / CRM TAB ==================== */}
              {currentTab === "crm" && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* CRM Customer section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-widest font-mono">CRM & Loyalty Engine</p>
                      <h2 className="text-3xl font-extrabold text-white">Base de Clientes Fieles</h2>
                    </div>

                    <button
                      onClick={() => {
                        const name = prompt("Nombre de nuevo cliente:");
                        const doc = prompt("Cédula / ID:");
                        const phone = prompt("Celular:");
                        if (name && doc) {
                          setCustomers([...customers, {
                            id: `cust_${Math.random().toString(36).substring(2, 9)}`,
                            name,
                            idDocument: doc,
                            phone: phone || "0999999999",
                            email: `${name.toLowerCase().replace(' ', '')}@mail.com`,
                            points: 50,
                            level: "Bronce",
                            totalSpent: 0,
                            visitsCount: 1
                          }]);
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide rounded-xl uppercase transition-all"
                    >
                      Registrar Nuevo Cliente
                    </button>
                  </div>

                  {/* Customer interactive listing cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {customers.map(cust => (
                      <div key={cust.id} className="bg-[#161616] border border-white/10 p-5 rounded-2xl relative flex flex-col justify-between">
                        
                        {/* Loyalty tier label top right banner */}
                        <span className={`absolute top-4 right-4 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                          cust.level === "Platino" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                          cust.level === "Oro" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                          cust.level === "Plata" ? "bg-slate-400/10 text-slate-300 border border-slate-500/20" :
                          "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                        }`}>
                          {cust.level}
                        </span>

                        <div>
                          <p className="text-xs text-neutral-400 font-mono block">CLIENTE ID</p>
                          <h4 className="text-base font-bold text-white mt-1">{cust.name}</h4>
                          
                          <div className="mt-4 pt-2 border-t border-white/5 space-y-1.5 font-mono text-xs">
                            <p><span className="text-neutral-500">Documento:</span> {cust.idDocument}</p>
                            <p><span className="text-neutral-500">Celular:</span> {cust.phone}</p>
                            <p><span className="text-neutral-500">Puntos:</span> <strong className="text-emerald-400">{cust.points} pts</strong></p>
                            <p><span className="text-neutral-500">Gastado:</span> ${cust.totalSpent.toFixed(2)}</p>
                          </div>
                        </div>

                        {/* Customer specific note input if any */}
                        {cust.notes && (
                          <p className="text-[11px] text-neutral-400 bg-black/40 p-2 border border-white/5 rounded-xl mt-3 leading-relaxed">
                            {cust.notes}
                          </p>
                        )}
                        
                        {/* Quick action reward points simulation */}
                        <div className="mt-4 pt-3 border-t border-white/5">
                          <button
                            onClick={() => {
                              setCustomers(customers.map(c => c.id === cust.id ? { ...c, points: c.points + 100 } : c));
                              alert(`Se acreditaron +100 puntos promocionales de fidelización a: ${cust.name}!`);
                            }}
                            className="w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 text-[10px] font-bold text-neural-300 rounded hover:text-white"
                          >
                            Otorgar +100 Puntos
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* ==================== RESERVATIONS TAB ==================== */}
              {currentTab === "reservations" && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Reservations Header layout */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-neutral-400 uppercase tracking-widest font-mono">Control de Turnos de Salón</p>
                      <h2 className="text-3xl font-extrabold text-white">Reservaciones y Horarios de Personal</h2>
                    </div>

                    <button
                      onClick={() => {
                        const customerName = prompt("Nombre comensal de reserva:");
                        const coversStr = prompt("Número de acompañantes:");
                        const time = prompt("Hora de llegada (HH:MM):");
                        if (customerName && coversStr) {
                          setReservations([...reservations, {
                            id: `res_${Math.random().toString(36).substring(2, 9)}`,
                            customerName,
                            covers: Number(coversStr) || 2,
                            time: time || "20:00",
                            date: "2026-06-07",
                            phone: "0999999999",
                            status: "Confirmada"
                          }]);
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide rounded-xl uppercase transition-all"
                    >
                      Agregar Reserva
                    </button>
                  </div>

                  {/* Calendar listing active reservations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reservations.map(res => (
                      <div key={res.id} className="bg-[#161616] border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs text-neutral-400 font-mono block">CALENDARIO {res.date}</span>
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                              res.status === "Confirmada" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                              res.status === "Pendiente" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                              "bg-yellow-500/10 text-yellow-500"
                            }`}>
                              {res.status}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-white">{res.customerName}</h4>
                          <div className="mt-4 pt-2 border-t border-white/5 space-y-1 text-xs text-neutral-400 font-mono">
                            <p>Hora Señalada: <span className="text-white font-bold">{res.time}hs</span></p>
                            <p>Cantidad de Cubiertos: <span className="text-white font-bold">{res.covers} comensales</span></p>
                            {res.tableName && <p>Mesa Vinculada: <span className="text-blue-400 font-bold">{res.tableName}</span></p>}
                          </div>
                        </div>

                        {res.notes && (
                          <p className="text-[11px] text-neutral-400 italic bg-black/40 p-2.5 border border-white/5 rounded-xl mt-3 leading-relaxed">
                            Notas: {res.notes}
                          </p>
                        )}

                        {/* Interactive WhatsApp notification alert emulation */}
                        <button
                          onClick={() => {
                            alert(`[WhatsApp Recordatorio Automatizado] Enviado con éxito de forma virtual a ${res.customerName} al número ${res.phone || 'registrado'}.`);
                          }}
                          className="w-full mt-4 py-2 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 text-xs font-bold rounded-xl transition-all uppercase hover:text-neutral-950"
                        >
                          Lanzar WhatsApp de Recordatorio
                        </button>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* ==================== AI COPILOT INTERACTIVE ASSISTANT TAB ==================== */}
              {currentTab === "assistant" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-fade-in max-w-5xl mx-auto">
                  
                  {/* Left Column: Asistente info and strategic pre-questions suggestions */}
                  <div className="col-span-1 lg:col-span-4 flex flex-col space-y-6">
                    <div>
                      <span className="text-xs text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">RestaurantOS Copilot IA</span>
                      <h2 className="text-3xl font-extrabold text-white mt-3 leading-tight">Asistente de Inteligencia Artificial</h2>
                      <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                        Nuestro motor integrado consulta los números exactos de tu base de ventas y de materias primas para darte respuestas sin conjeturas. Pregúntale lo que sea.
                      </p>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <h4 className="text-xs font-bold text-neutral-300 uppercase mb-3">Sugerencias Estratégicas</h4>
                      <div className="space-y-2">
                        {[
                          "¿Qué platos generan más ganancias?",
                          "¿Qué ingredientes estratégicos debo comprar hoy?",
                          "Analiza por qué bajaron las ventas el martes pasado.",
                          "¿Cuáles son las horas de mayor demanda?"
                        ].map(q => (
                          <button
                            key={q}
                            onClick={() => handleSendMessage(q)}
                            className="w-full text-left p-3 rounded-xl bg-black/40 hover:bg-white/5 text-xs text-neutral-300 hover:text-white border border-white/5 transition-all leading-normal"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Active chat portal */}
                  <div className="col-span-1 lg:col-span-8 bg-[#0d0d0d] border border-white/10 rounded-2xl h-[550px] flex flex-col justify-between shadow-2xl overflow-hidden relative">
                    
                    {/* Header bar of Chat */}
                    <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-sm font-bold text-white">Consola Copilot 4.0</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono bg-neutral-800 px-2 py-0.5 rounded whitespace-nowrap">
                        Alimentado por Gemini-3.5-Flash
                      </span>
                    </div>

                    {/* Messages stream view */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {messages.map(msg => (
                        <div 
                          key={msg.id} 
                          className={`flex gap-3 max-w-lg ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                            msg.role === "user" ? "bg-blue-600 text-white" : "bg-emerald-500 text-neutral-950"
                          }`}>
                            {msg.role === "user" ? "U" : "C"}
                          </div>
                          
                          <div className={`p-4 rounded-2xl text-xs space-y-1.5 ${
                            msg.role === "user" ? "bg-blue-600/10 border border-blue-500/20 text-neutral-200" : "bg-white/5 border border-white/10 text-neutral-100"
                          }`}>
                            {/* Simple split rendering format of markdown elements for beautiful visual details */}
                            <div className="whitespace-pre-wrap leading-relaxed select-text">
                              {msg.text}
                            </div>
                            <span className="text-[9px] text-neutral-500 block text-right font-mono mt-1.5">{msg.timestamp}</span>
                          </div>
                        </div>
                      ))}

                      {isAiLoading && (
                        <div className="flex gap-3 mr-auto items-center">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center font-bold text-xs">
                            C
                          </div>
                          <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl text-xs text-neutral-400 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                            Copilot está analizando el estado comercial del restaurante en tiempo real...
                          </div>
                        </div>
                      )}

                      <div ref={chatBottomRef}></div>
                    </div>

                    {/* Chat input box */}
                    <div className="p-4 border-t border-white/10 bg-black/40 flex gap-2 shrink-0">
                      <input
                        type="text"
                        placeholder="Pregúntale a Copilot sobre mermas, ventas, mermas sugeridas..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendMessage();
                        }}
                        className="flex-1 text-xs bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-white"
                      />
                      <button
                        onClick={() => handleSendMessage()}
                        className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              )}

            </div>

          </main>

        </div>
      )}

      {/* ==================== INVENTARIO COMPRA MODAL SIMULATION ==================== */}
      {purchaseOrderModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#161616] border border-white/10 rounded-3xl w-full max-w-xl p-6 relative">
            <h3 className="text-lg font-bold text-white mb-2">Previsualización de Orden de Compra Sugerida</h3>
            <p className="text-xs text-neutral-400 mb-4">Calculado automáticamente para reponer al doble del stock mínimo los ingredientes críticos.</p>

            <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-1 divide-y divide-white/5">
              {rawMaterials.filter(rm => rm.stock <= rm.minStock).map(rm => (
                <div key={rm.id} className="pt-3 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-white block">{rm.name}</span>
                    <span className="text-neutral-500">Stock actual: {rm.stock} {rm.unit} | Sugerido reponer: {rm.minStock * 2} {rm.unit}</span>
                  </div>
                  <span className="font-mono font-bold text-teal-400">${(rm.unitPrice * rm.minStock * 2).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setPurchaseOrderModal(false)}
                className="flex-1 py-2.5 bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-xs font-bold text-neutral-400 rounded-xl"
              >
                Volver
              </button>
              <button
                onClick={() => {
                  // Simulate restocking ingredients
                  setRawMaterials(rawMaterials.map(rm => {
                    if (rm.stock <= rm.minStock) {
                      return {
                        ...rm,
                        stock: rm.stock + (rm.minStock * 2),
                        lastSuppliedDate: new Date().toLocaleDateString("es-EC")
                      };
                    }
                    return rm;
                  }));
                  setPurchaseOrderModal(false);
                  alert("¡Órdenes de compra autorizadas y despachadas de inmediato de forma simulada! Las bodegas han actualizado sus existencias.");
                }}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl"
              >
                Autorizar y Abastecer Bodegas
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
