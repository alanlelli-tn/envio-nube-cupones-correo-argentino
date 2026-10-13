# Envío Nube AR: cupones de descuento de Correo Argentino

Tablero público (noindex) con los resultados del tooltip in-app "Q4-26 Cupones Correo Argentino".
Next.js 14 (App Router), sin base de datos ni llamadas a terceros: es una página estática.

- Contenido y cifras: `app/content.js` (único archivo a editar para actualizar datos o textos).
- Maquetado: `app/page.js` y `app/globals.css`.
- Encabezados de seguridad: `next.config.mjs`.

## Correr local

```bash
npm install
npm run dev
```

Después del primer `npm install`, commitear `package-lock.json` para que los deploys sean deterministas.

## Fuentes de datos

- Userflow: export de sesiones del flow (views, usuarios únicos, clics).
- Databricks (NuvemLens): `data_products_prd.data_logistics.s__operations__shipment__event`, cruce por Store ID.

Corte de datos: 13 oct 2026.
