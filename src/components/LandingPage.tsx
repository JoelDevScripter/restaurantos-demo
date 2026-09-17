import { useState } from "react";
import { 
  Utensils,
  ShoppingCart,
  Layers,
  ChefHat,
  Users,
  ChevronRight, 
  TrendingUp, 
  Calculator, 
  CheckCircle, 
  ShieldAlert, 
  Flame, 
  Percent, 
  HelpCircle, 
  Zap, 
  Sparkles, 
  Globe
} from "lucide-react";
import restaurantServiceImage from "../assets/restaurant-service.png";

interface LandingPageProps {
  onEnterApp: () => void;
}

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  // ROI Calculator state
  const [tablesCount, setTablesCount] = useState<number>(15);
  const [dailyOrders, setDailyOrders] = useState<number>(65);
  const [waitersCount, setWaitersCount] = useState<number>(4);
  const [branchesCount, setBranchesCount] = useState<number>(1);
  const [averageTicket, setAverageTicket] = useState<number>(14);

  // ROI calculations
  const monthlyRevenue = dailyOrders * averageTicket * 30 * branchesCount;
  const timeSavedHours = Math.round((dailyOrders * 2.5 * 30 * branchesCount) / 60); // 2.5 minutes saved per order
  const lossesStopped = Math.round(monthlyRevenue * 0.045); // 4.5% losses stopped (inventarios rotos, pedidos perdidos)
  const waiterEfficiencyIncrease = Math.round(waitersCount * 230); // USD value in productivity
  const annualRoi = Math.round((lossesStopped * 12) + (waiterEfficiencyIncrease * 12));

  return (
    <div id="landing-page-root" className="min-h-screen bg-[#0a0a0a] text-neutral-100 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* Upper Navigation and Branding Bar */}
      <header className="border-b border-white/10 bg-[#0a0a0a]/85 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Utensils className="w-4 h-4" />
            </div>
            <span className="font-semibold text-xl tracking-tight text-white">Restaurant<span className="text-blue-400">OS</span></span>
            <span className="hidden lg:inline text-[10px] text-neutral-500 ml-1">Demo interactiva</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-400 font-medium">
            <a href="#producto" className="text-white hover:text-blue-300 transition-colors">Producto</a>
            <a href="#modulos" className="hover:text-white transition-colors">Módulos</a>
            <a href="#impacto" className="hover:text-white transition-colors">Impacto</a>
            <a href="#empresa" className="hover:text-white transition-colors">Acerca de</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              id="header-demo-btn"
              onClick={onEnterApp}
              className="px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 font-bold text-sm transition-all hover:scale-105 active:scale-95"
            >
              Solicitar Demo
            </button>
          </div>
        </div>
      </header>

      {/* Hero Content Section */}
      <section id="producto" className="relative pt-24 pb-20 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/80 via-[#0a0a0a] to-[#0a0a0a]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-400 text-xs font-semibold mb-6 uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Operación diaria, en un solo lugar
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter leading-[1.1] max-w-4xl mx-auto mb-6">
            Controla todo tu restaurante <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">desde una sola plataforma.</span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Toma pedidos, visualiza mesas, envía comandas a cocina y controla inventario desde una misma operación. Explora el flujo completo en esta demo.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <button
              id="hero-primary-cta"
              onClick={onEnterApp}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base tracking-wide transition-all shadow-xl shadow-blue-500/20 hover:scale-105"
            >
              Abrir demo
            </button>
            <a 
              href="#impacto"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm tracking-wide transition-all text-center flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4 text-blue-400" />
              Calculadora ROI
            </a>
          </div>

          <div className="mt-16 relative rounded-3xl border border-white/10 bg-[#161616] shadow-2xl p-4 max-w-5xl mx-auto overflow-hidden">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="hidden md:flex w-40 flex-col gap-2 pt-2 border-r border-white/5 pr-4 shrink-0 text-[10px] text-neutral-500">
                <div className="flex items-center gap-2 text-white font-bold px-2 mb-3"><Utensils className="w-3.5 h-3.5 text-blue-400" /> RestaurantOS</div>
                <div className="flex items-center gap-2 px-2 py-2"><TrendingUp className="w-3.5 h-3.5" /> Dashboard</div><div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-white/10 text-white"><ShoppingCart className="w-3.5 h-3.5 text-blue-400" /> POS & Comandas</div><div className="flex items-center gap-2 px-2 py-2"><Layers className="w-3.5 h-3.5" /> Mapa de mesas</div><div className="flex items-center gap-2 px-2 py-2"><ChefHat className="w-3.5 h-3.5" /> Cocina</div><div className="flex items-center gap-2 px-2 py-2"><Users className="w-3.5 h-3.5" /> Clientes</div>
              </div>
              <div className="flex-1 text-left"><div className="flex justify-between items-center mb-4 pt-2"><h3 className="text-base font-bold text-white">POS & Comandas</h3><span className="bg-white/5 text-neutral-400 border border-white/10 px-2.5 py-0.5 rounded text-[10px]">Vista previa</span></div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4"><div className="md:col-span-8 bg-white/[0.02] border border-white/10 rounded-xl p-4"><div className="flex gap-2 mb-4 text-[9px] font-bold"><span className="bg-blue-600 px-2 py-1 rounded">Pizzas</span><span className="bg-white/5 px-2 py-1 rounded text-neutral-400">Carnes</span><span className="bg-white/5 px-2 py-1 rounded text-neutral-400">Bebidas</span></div><div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-3 max-w-[180px]"><span className="text-2xl">🍕</span><p className="text-xs font-bold text-white mt-3">Pizza Margherita</p><p className="text-[9px] text-neutral-500 mt-1">Mozzarella, tomate y albahaca</p><div className="flex justify-between mt-3 text-xs"><span className="font-bold">$13.50</span><span className="bg-blue-600 px-2 rounded">+</span></div></div><button onClick={onEnterApp} className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] rounded-lg">Probar POS real</button></div><div className="md:col-span-4 bg-[#0d0d0d] border border-white/10 rounded-xl p-3.5 space-y-3"><span className="text-[10px] font-bold text-white">Comanda activa</span><div className="flex justify-between text-[10px] text-neutral-400"><span>Pizza Margherita</span><span>$13.50</span></div><div className="border-t border-white/10 pt-3 flex justify-between text-xs font-bold"><span>Total</span><span>$15.53</span></div><div className="bg-emerald-500 text-black text-center py-1.5 rounded text-[9px] font-bold">COBRAR</div></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Problems Section */}
      <section id="modulos" className="py-24 border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">El trabajo detrás del servicio</span>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">El salón, caja y cocina tienen que hablar el mismo idioma.</p>
            <p className="text-neutral-400 mt-4">RestaurantOS conecta los momentos que suelen quedar repartidos entre papel, chat y varias pantallas.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <figure className="lg:col-span-5 relative min-h-96 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900"><img src={restaurantServiceImage} alt="Equipo de restaurante coordinando el servicio" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent"><p className="text-sm font-bold text-white">Una orden no termina cuando se toma.</p><p className="text-xs text-neutral-300 mt-1">Sigue por cocina, inventario, mesa y cobro.</p></div></figure>
            <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
              <div className="grid grid-cols-[2rem_1fr] gap-5 py-6"><span className="text-blue-400 font-mono">01</span><div><h3 className="text-lg font-bold text-white">Tomar la orden sin perder contexto</h3><p className="text-sm text-neutral-400 mt-2">El POS conserva mesa, cliente, modificadores y notas en la misma comanda.</p></div></div>
              <div className="grid grid-cols-[2rem_1fr] gap-5 py-6"><span className="text-emerald-400 font-mono">02</span><div><h3 className="text-lg font-bold text-white">Preparar con una cola clara</h3><p className="text-sm text-neutral-400 mt-2">Cocina y barra ven lo que les corresponde y pueden actualizar el estado del pedido.</p></div></div>
              <div className="grid grid-cols-[2rem_1fr] gap-5 py-6"><span className="text-amber-400 font-mono">03</span><div><h3 className="text-lg font-bold text-white">Cerrar y aprender del turno</h3><p className="text-sm text-neutral-400 mt-2">Al cobrar, la demo actualiza ventas e inventario para que el tablero tenga una historia coherente.</p></div></div>
              <button onClick={onEnterApp} className="mt-6 text-sm font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-2">Recorrer el flujo en la demo <ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section id="impacto" className="py-24 border-t border-white/10 bg-[#161616]/20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="col-span-1 lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-semibold mb-4 font-mono">
                <Calculator className="w-3.5 h-3.5" />
                <span>Simulador Financiero</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Calcula cuánto dinero recupera <span className="text-blue-400">RestaurantOS</span>
              </h2>
              <p className="text-neutral-400 mt-4 leading-relaxed text-sm">
                Ajusta las variables de tu operación (comandas promedio, mesas y meseros). Nuestro algoritmo calcula el retorno anual neto recuperado por menor pérdida de insumos y agilidad en salón.
              </p>

              <div className="mt-8 border border-white/10 p-5 rounded-2xl bg-[#0d0d0d]">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-300">
                    <strong className="text-white">Almacén Inteligente:</strong> Detiene de inmediato el desperdicio estimado de un 4.5% de tus consumos brutos de cocina.
                  </p>
                </div>
                <div className="flex items-start gap-3 mt-4">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-300">
                    <strong className="text-white">Productividad de Mesa:</strong> Incrementa hasta en un 32% la velocidad de cobro y rotación sin contratar personal extra.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-7 bg-[#0d0d0d] border border-white/10 md:p-8 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4 uppercase tracking-wider font-mono">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Configuración Operativa
              </h3>

              <div className="space-y-6">
                {/* Tables Count */}
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-neutral-400 font-medium font-mono">Número de Mesas</span>
                    <span className="text-white font-bold font-mono">{tablesCount} mesas</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="100" 
                    value={tablesCount}
                    onChange={(e) => setTablesCount(Number(e.target.value))}
                    className="w-full accent-blue-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Daily Orders */}
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-neutral-400 font-medium font-mono">Pedidos o Comandas Diarias Directos</span>
                    <span className="text-white font-bold font-mono">{dailyOrders} órdenes</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="500" 
                    value={dailyOrders}
                    onChange={(e) => setDailyOrders(Number(e.target.value))}
                    className="w-full accent-blue-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Ticket Promedio */}
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-neutral-400 font-medium font-mono">Ticket Promedio por Cliente</span>
                    <span className="text-white font-bold font-mono">${averageTicket} USD</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="100" 
                    value={averageTicket}
                    onChange={(e) => setAverageTicket(Number(e.target.value))}
                    className="w-full accent-blue-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Waiters & Branches inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-400 text-[10px] uppercase block mb-1 font-mono">Cantidad de Meseros</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="40" 
                      value={waitersCount}
                      onChange={(e) => setWaitersCount(Math.max(1, Number(e.target.value)))}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white font-bold focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-[10px] uppercase block mb-1 font-mono">Sucursales Activas</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="10" 
                      value={branchesCount}
                      onChange={(e) => setBranchesCount(Math.max(1, Number(e.target.value)))}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white font-bold focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* ROI Results Display */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase block mb-1 font-mono">Merma Evitada</span>
                  <span className="text-lg font-extrabold text-blue-400 font-mono">${lossesStopped.toLocaleString()}</span>
                  <span className="text-[9px] text-neutral-500 block mt-1 font-mono">al mes de ahorro</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                  <span className="text-[10px] text-neutral-400 font-bold uppercase block mb-1 font-mono">Tiempo Liberado</span>
                  <span className="text-lg font-extrabold text-[#22d3ee] font-mono">+{timeSavedHours}h</span>
                  <span className="text-[9px] text-neutral-500 block mt-1 font-mono">despacho más ágil</span>
                </div>
                <div className="bg-blue-500/5 p-4 rounded-xl border border-blue-500/20 text-center relative overflow-hidden">
                  <span className="text-[10px] text-blue-300 font-bold uppercase block mb-1 font-mono">Impacto anual</span>
                  <span className="text-2xl font-extrabold text-emerald-400 font-mono">${annualRoi.toLocaleString()}</span>
                  <span className="text-[9px] text-neutral-500 block mt-1 font-mono">beneficio proyectado</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={onEnterApp}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl hover:scale-[1.02] tracking-wide transition-all uppercase text-xs"
                >
                  Probar Software en Vivo Gratis (Ver Demo)
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic regional footer highlights */}
      <section id="empresa" className="py-16 bg-[#0a0a0a] text-center relative border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10">Demo de portfolio</span>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10">Datos temporales</span>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10">Sin registro</span>
          </div>
          <h3 className="text-lg font-bold text-white">RestaurantOS es una demostración de producto para el sector gastronómico.</h3>
          <p className="text-xs text-neutral-400 mt-2 max-w-2xl mx-auto font-medium">
            Los pagos, comprobantes e integraciones que aparecen aquí son simulados y se reinician cuando recargas la página.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/10 py-12 text-neutral-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white w-7 h-7 rounded-lg flex items-center justify-center">
              <Utensils className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white">Restaurant<span className="text-blue-400">OS</span></span>
            <span className="text-[11px] text-neutral-600 block sm:inline ml-2">© 2026 RestaurantOS Inc. Todos los derechos reservados.</span>
          </div>

          <div className="text-xs text-neutral-600 font-mono flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-neutral-500" />
            <span>Demo web interactiva</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
