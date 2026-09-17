<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# RestaurantOS — Demo pública

Demo interactiva de un sistema operativo para restaurantes: POS, mesas, KDS de cocina, inventario por receta, clientes, reservas, facturación SRI simulada y un copiloto operativo local.

## Probar localmente

```bash
npm install
npm run dev
```

## Alcance de esta demo

Esta versión es deliberadamente estática y no requiere cuentas, claves ni backend. Todas las operaciones ocurren únicamente en memoria del navegador y se reinician al recargar la página. Las facturas SRI, avisos de WhatsApp, pagos y órdenes de compra son simulaciones visuales.

La arquitectura productiva, integraciones reales y servicios privados no forman parte de este repositorio público.

## Stack

React, TypeScript, Vite, Tailwind CSS, Recharts y Lucide.
