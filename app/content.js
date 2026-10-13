// Contenido y datos del tablero. Para ajustar textos o cifras, editar solo este archivo.
// Datos: Userflow (canal) + Databricks / NuvemLens (conversión). Corte de datos: 13 oct 2026.

export const data = {
  "views": 41608,
  "viewsUnicas": 41607,
  "clicks": 2269,
  "clickMerchants": 2252,
  "impactados": 37946,
  "previo": 3009,
  "previoUso": 2264,
  "previoCfg": 745,
  "base": 34937,
  "conv": 480,
  "convUso": 263,
  "convCfg": 217,
  "paquetes": 456,
  "despacharon": 120,
  "mediana": 1.0,
  "top10": 0.5746,
  "top1": 0.2018,
  "top1Paq": 92,
  "sinDespacho": 360,
  "endReasons": {
    "dismissed": 27506,
    "missing": 9655,
    "action": 2269,
    "unpub": 2178
  },
  "missing": {
    "stores": 8006,
    "base": 7665,
    "conv": 71,
    "visBase": 27272,
    "visConv": 409
  },
  "click": {
    "yesBase": 1884,
    "yesConv": 75,
    "noBase": 33053,
    "noConv": 405
  },
  "cohort": {
    "w1": {
      "n": 24783,
      "c": 409
    },
    "w2": {
      "n": 10154,
      "c": 71
    }
  },
  "multiSession": 2076,
  "medianDays": 4.0,
  "days": [
    {
      "label": "Mismo día",
      "n": 77
    },
    {
      "label": "1 día",
      "n": 64
    },
    {
      "label": "2 a 3 días",
      "n": 95
    },
    {
      "label": "4 a 7 días",
      "n": 114
    },
    {
      "label": "8 a 14 días",
      "n": 130
    },
    {
      "label": "15 días o más",
      "n": 0
    }
  ],
  "daily": [
    {
      "d": "28/9",
      "views": 6839,
      "clicks": 376,
      "act": 14
    },
    {
      "d": "29/9",
      "views": 9237,
      "clicks": 470,
      "act": 27
    },
    {
      "d": "30/9",
      "views": 4093,
      "clicks": 219,
      "act": 38
    },
    {
      "d": "1/10",
      "views": 3854,
      "clicks": 205,
      "act": 32
    },
    {
      "d": "2/10",
      "views": 2824,
      "clicks": 176,
      "act": 40
    },
    {
      "d": "3/10",
      "views": 1868,
      "clicks": 113,
      "act": 35
    },
    {
      "d": "4/10",
      "views": 1331,
      "clicks": 81,
      "act": 22
    },
    {
      "d": "5/10",
      "views": 2837,
      "clicks": 151,
      "act": 27
    },
    {
      "d": "6/10",
      "views": 2493,
      "clicks": 139,
      "act": 38
    },
    {
      "d": "7/10",
      "views": 2492,
      "clicks": 135,
      "act": 33
    },
    {
      "d": "8/10",
      "views": 2480,
      "clicks": 127,
      "act": 38
    },
    {
      "d": "9/10",
      "views": 1260,
      "clicks": 77,
      "act": 39
    },
    {
      "d": "10/10",
      "views": 0,
      "clicks": 0,
      "act": 32
    },
    {
      "d": "11/10",
      "views": 0,
      "clicks": 0,
      "act": 23
    },
    {
      "d": "12/10",
      "views": 0,
      "clicks": 0,
      "act": 34
    },
    {
      "d": "13/10",
      "views": 0,
      "clicks": 0,
      "act": 8
    }
  ],
  "postFlowAct": 97,
  "sameDay": 77
};

export const meta = {
  eyebrow: 'Lifecycle AR, Envío Nube',
  title: 'Resultados: cupones de descuento de Correo Argentino',
  lead:
    'Campaña in-app (tooltip) que avisa a merchants de Argentina sin Envío Nube que los envíos de Correo Argentino con Envío Nube están hasta un 10% más baratos, para que activen alguna modalidad de envío.',
  owner: 'Alan Lelli',
  activation: '28 sep 2026',
  end: '9 oct 2026',
  cut: '13 oct 2026',
  flowName: '[LCY AR Envío Nube] Q4-26 Cupones Correo Argentino',
  criterion:
    'Activó Envío Nube: configuró Envío Nube o tuvo su primera señal de uso (pedido con Envío Nube elegido en el checkout o primera etiqueta) desde su primera view',
};

export const tooltip = {
  title: 'Envíos más baratos para vender más',
  body1: 'Hasta el 18 de octubre los envíos de Correo Argentino con Envío Nube',
  bold: 'están hasta un 10% más baratos',
  body2: 'Más accesible para tus clientes, más ventas para tu tienda.',
  cta: 'Activar Envío Nube',
  where:
    'Tooltip anclado al ítem “Envío Nube” del menú del admin. Aparece en Inicio y en Pedidos.',
  audience:
    'Merchants de Argentina con onboarding completo y sin Envío Nube en sus opciones de envío (según HubSpot). Se excluyen cuentas internas.',
};

export const preview = {
  button: 'Ver comunicación',
  title: 'Así ve el merchant el tooltip',
  src: '/previews/tooltip-cupones-ca.png',
  alt: 'Tooltip “Envíos más baratos para vender más” anclado al ítem Envío Nube del menú, con el botón Activar Envío Nube.',
};
