import React from 'react';
import { data as D, meta, tooltip, preview } from './content';
import CommunicationModal from './CommunicationModal';

// Helper de render sin JSX: mantiene este archivo idéntico en Next.js y en la vista previa.
const h = React.createElement;

const fmt = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const pct = (x, d = 1) => (x * 100).toFixed(d).replace('.', ',') + '%';

// ---- Derivados (todo sale de content.js) ----
const ctr = D.clicks / D.views;
const cvr = D.conv / D.base;
const shareDispatch = D.despacharon / D.conv;
const clickRate = D.click.yesConv / D.click.yesBase;
const noClickRate = D.click.noConv / D.click.noBase;
const noClickShare = D.click.noConv / D.conv;
const dismissShare = D.endReasons.dismissed / D.views;
const missingShare = D.endReasons.missing / D.views;
const missingCvr = D.missing.conv / D.missing.base;
const visibleCvr = D.missing.visConv / D.missing.visBase;
const coh1 = D.cohort.w1.c / D.cohort.w1.n;
const coh2 = D.cohort.w2.c / D.cohort.w2.n;
const postShare = D.postFlowAct / D.conv;
const previoShare = D.previo / D.impactados;
const maxDays = Math.max(...D.days.map((x) => x.n));

// ---- Piezas ----
function Section(props) {
  return h(
    'section',
    { className: 'section', id: props.id },
    h('h2', null, props.title),
    props.lead ? h('p', { className: 'lead' }, props.lead) : null,
    props.children
  );
}

function Kpi(props) {
  return h(
    'div',
    { className: 'kpi' + (props.tone ? ' kpi--' + props.tone : '') },
    h('span', { className: 'kpi__label' }, props.label),
    h('strong', { className: 'kpi__value' }, props.value),
    h('span', { className: 'kpi__sub' }, props.sub)
  );
}

function Funnel() {
  const rows = [
    { label: 'Merchants impactados', value: D.impactados, note: 'Store IDs únicos que vieron el tooltip' },
    { label: 'Sin Envío Nube previo', value: D.base, note: pct(D.base / D.impactados) + ' de los impactados · base elegible' },
    { label: 'Activaron Envío Nube', value: D.conv, note: pct(cvr) + ' de la base' },
    { label: 'Despacharon al menos un paquete', value: D.despacharon, note: pct(shareDispatch) + ' de los que activaron' },
  ];
  return h(
    'div',
    { className: 'funnel' },
    rows.map((r, i) =>
      h(
        'div',
        { className: 'funnel__row', key: r.label },
        h('div', { className: 'funnel__head' }, h('span', null, r.label), h('strong', null, fmt(r.value))),
        h(
          'div',
          { className: 'funnel__track' },
          h('div', { className: 'funnel__bar funnel__bar--' + i, style: { width: Math.max((r.value / D.impactados) * 100, 2.5) + '%' } })
        ),
        h('span', { className: 'funnel__note' }, r.note)
      )
    )
  );
}

function TooltipMock() {
  return h(
    'figure',
    { className: 'mock', 'aria-label': 'Así ve el merchant el tooltip' },
    h(
      'div',
      { className: 'mock__menu', 'aria-hidden': 'true' },
      ['Inicio', 'Pedidos', 'Productos', 'Envío Nube', 'Marketing'].map((t) =>
        h('span', { key: t, className: 'mock__item' + (t === 'Envío Nube' ? ' mock__item--on' : '') }, t)
      )
    ),
    h(
      'div',
      { className: 'mock__tip' },
      h('h4', null, tooltip.title),
      h('p', null, tooltip.body1 + ' ', h('strong', null, tooltip.bold), '.'),
      h('p', null, tooltip.body2),
      h('span', { className: 'btn' }, tooltip.cta)
    ),
    h('figcaption', null, 'Tooltip “' + tooltip.title + '”')
  );
}

function Bars(props) {
  const max = Math.max(...props.items.map((x) => x.v), 1);
  return h(
    'div',
    { className: 'bars', role: 'img', 'aria-label': props.label },
    props.items.map((x) =>
      h(
        'div',
        { className: 'bars__col' + (x.muted ? ' bars__col--muted' : ''), key: x.k, title: x.k + ': ' + fmt(x.v) },
        h('span', { className: 'bars__val' }, fmt(x.v)),
        h('div', { className: 'bars__plot' }, h('div', { className: 'bars__bar', style: { height: Math.max((x.v / max) * 100, 1.5) + '%' } })),
        h('span', { className: 'bars__key' }, x.k)
      )
    )
  );
}

function Insight(props) {
  return h('article', { className: 'insight' }, h('h3', null, props.title), h('p', null, props.body));
}

// ---- Página ----
export default function Page() {
  const viewDays = D.daily.filter((x) => x.views > 0);
  const insights = [
    {
      title: pct(cvr) + ' activó Envío Nube y ' + pct(shareDispatch, 0) + ' de ellos ya despacha',
      body:
        fmt(D.conv) + ' de ' + fmt(D.base) + ' merchants sin Envío Nube previo activaron, y ' + fmt(D.despacharon) + ' ya generaron ' + fmt(D.paquetes) +
        ' paquetes. El valor está concentrado: los 10 que más despachan suman ' + pct(D.top10, 0) + ' y uno solo, ' + pct(D.top1, 0) + '.',
    },
    {
      title: 'El clic más que triplica la conversión, pero la mayoría activa sin clic',
      body:
        pct(clickRate) + ' de quienes hicieron clic en Activar activó, contra ' + pct(noClickRate) + ' de quienes no. Aun así, ' + pct(noClickShare, 0) +
        ' de las activaciones llegó sin clic y el CTR es de ' + pct(ctr) + ': ' + pct(dismissShare, 0) + ' de las views se cerró con la X.',
    },
    {
      title: pct(missingShare, 0) + ' de las views no encontró dónde anclarse',
      body:
        fmt(D.endReasons.missing) + ' sesiones terminaron en “Missing tooltip target” (el tooltip se ancla al ítem Envío Nube del menú) y ' + fmt(D.missing.stores) +
        ' merchants solo tuvieron sesiones así. Su CVR fue ' + pct(missingCvr) + ', contra ' + pct(visibleCvr) + ' del resto. Es una diferencia observada, no causal; vale revisar el selector o usar un modal.',
    },
    {
      title: 'La activación sigue después de despublicar el flow',
      body:
        fmt(D.postFlowAct) + ' activaciones (' + pct(postShare, 0) + ') ocurrieron del 10 al 13 de octubre, sin in-app y con el cupón vigente hasta el 18/10. Los que vieron el tooltip del 28/9 al 4/10 convirtieron ' +
        pct(coh1) + ', los del 5 al 9/10, ' + pct(coh2) + ': tuvieron menos tiempo. Conviene volver a medir.',
    },
    {
      title: pct(previoShare) + ' de los impactados ya usaba o tenía configurado Envío Nube',
      body:
        fmt(D.previo) + ' merchants (' + fmt(D.previoUso) + ' con uso previo y ' + fmt(D.previoCfg) + ' solo configurado) pasaron la segmentación, que se apoya en un atributo de HubSpot. Conviene excluirlos con una lista armada desde Databricks.',
    },
  ];

  return h(
    'main',
    null,
    h(
      'header',
      { className: 'hero' },
      h(
        'div',
        { className: 'wrap' },
        h('span', { className: 'pill' }, meta.eyebrow),
        h('h1', null, meta.title),
        h('p', { className: 'hero__lead' }, meta.lead),
        h(
          'dl',
          { className: 'hero__meta' },
          h('div', null, h('dt', null, 'Responsable'), h('dd', null, meta.owner)),
          h('div', null, h('dt', null, 'Activación'), h('dd', null, meta.activation + ' al ' + meta.end)),
          h('div', null, h('dt', null, 'Corte de datos'), h('dd', null, meta.cut)),
          h('div', { className: 'hero__crit' }, h('dt', null, 'Criterio de conversión'), h('dd', null, meta.criterion))
        )
      )
    ),
    h(
      'div',
      { className: 'wrap' },
      h(
        Section,
        {
          id: 'generales',
          title: 'Resultados generales',
          lead: meta.activation + ' al ' + meta.end + ' para views y clics; conversiones y paquetes hasta el ' + meta.cut + '. Audiencia: merchants de Argentina sin Envío Nube configurado.',
        },
        h(
          'div',
          { className: 'kpis' },
          h(Kpi, { label: 'Views totales', value: fmt(D.views), sub: 'Sesiones del tooltip' }),
          h(Kpi, { label: 'Views únicas', value: fmt(D.viewsUnicas), sub: 'Usuarios únicos' }),
          h(Kpi, { label: 'Clics en Activar', value: fmt(D.clicks), sub: pct(D.clicks / D.views) + ' de las views · ' + fmt(D.clickMerchants) + ' merchants' }),
          h(Kpi, { label: 'CTR', value: pct(ctr), sub: fmt(D.clicks) + ' clics en Activar / ' + fmt(D.views) + ' views' }),
          h(Kpi, { label: 'Merchants únicos impactados', value: fmt(D.impactados), sub: 'Store IDs únicos' }),
          h(Kpi, { label: 'Sin Envío Nube previo', value: fmt(D.base), sub: 'Base elegible para convertir · ' + fmt(D.previo) + ' ya lo tenían' }),
          h(Kpi, { label: 'Conversiones', value: fmt(D.conv), sub: 'Merchants que activaron Envío Nube desde su primera view', tone: 'accent' }),
          h(Kpi, { label: 'CVR', value: pct(cvr), sub: fmt(D.conv) + ' / ' + fmt(D.base) + ' sin Envío Nube previo', tone: 'accent' }),
          h(Kpi, { label: 'Paquetes despachados', value: fmt(D.paquetes), sub: fmt(D.despacharon) + ' de los ' + fmt(D.conv) + ' merchants que activaron ya despacharon', tone: 'accent' })
        ),
        h('h3', { className: 'sub' }, 'Qué pasó con los merchants impactados'),
        h(Funnel)
      ),
      h(
        Section,
        { id: 'comunicacion', title: 'La comunicación', lead: 'Campaña “' + meta.flowName + '”, en Userflow.' },
        h('div', { className: 'actions' }, h(CommunicationModal, preview)),
        h(
          'div',
          { className: 'split' },
          h(TooltipMock),
          h(
            'ul',
            { className: 'facts' },
            h('li', null, h('strong', null, 'Dónde aparece. '), tooltip.where),
            h('li', null, h('strong', null, 'Audiencia. '), tooltip.audience),
            h('li', null, h('strong', null, 'Ventana. '), meta.activation + ' al ' + meta.end + '. El cupón de Correo Argentino rige hasta el 18 de octubre.'),
            h('li', null, h('strong', null, 'Acción. '), 'El botón Activar Envío Nube lleva a la configuración de Envío Nube en el admin.')
          )
        )
      ),
      h(
        Section,
        {
          id: 'activaron',
          title: 'Quiénes activaron Envío Nube a partir del flow',
          lead:
            fmt(D.conv) + ' merchants sin Envío Nube previo activaron desde su primera view: ' + fmt(D.convUso) + ' ya tuvieron su primera señal de uso (pedido con Envío Nube o etiqueta) y ' +
            fmt(D.convCfg) + ' lo configuraron y todavía no registran pedidos ni etiquetas.',
        },
        h('h3', { className: 'sub' }, 'Conversión según interacción'),
        h(
          'table',
          { className: 'table' },
          h('thead', null, h('tr', null, h('th', null, ''), h('th', null, 'Merchants de la base'), h('th', null, 'Activaron'), h('th', null, 'CVR'))),
          h(
            'tbody',
            null,
            h('tr', null, h('th', null, 'Hicieron clic en Activar'), h('td', null, fmt(D.click.yesBase)), h('td', null, fmt(D.click.yesConv)), h('td', { className: 'strong' }, pct(clickRate))),
            h('tr', null, h('th', null, 'No hicieron clic'), h('td', null, fmt(D.click.noBase)), h('td', null, fmt(D.click.noConv)), h('td', { className: 'strong' }, pct(noClickRate)))
          )
        ),
        h('p', { className: 'note' }, pct(noClickShare, 0) + ' de las activaciones (' + fmt(D.click.noConv) + ' de ' + fmt(D.conv) + ') ocurrió sin clic en el tooltip.'),
        h('h3', { className: 'sub' }, 'Días desde la primera view hasta activar'),
        h('p', { className: 'note' }, 'Mediana: ' + String(D.medianDays).replace('.', ',') + ' días.'),
        h(
          'div',
          { className: 'hbars' },
          D.days
            .filter((x) => x.n > 0)
            .map((x) =>
              h(
                'div',
                { className: 'hbars__row', key: x.label },
                h('span', { className: 'hbars__label' }, x.label),
                h('div', { className: 'hbars__track' }, h('div', { className: 'hbars__bar', style: { width: (x.n / maxDays) * 100 + '%' } })),
                h('strong', null, fmt(x.n))
              )
            )
        ),
        h('h3', { className: 'sub' }, 'Evolución diaria'),
        h('p', { className: 'note' }, 'Views por día de la campaña.'),
        h(Bars, { label: 'Views por día', items: viewDays.map((x) => ({ k: x.d, v: x.views })) }),
        h('p', { className: 'note' }, 'Activaciones por día. En gris, los días posteriores a despublicar el flow (el 13/10 es un día parcial).'),
        h(Bars, { label: 'Activaciones por día', items: D.daily.map((x) => ({ k: x.d, v: x.act, muted: x.views === 0 })) })
      ),
      h(
        Section,
        {
          id: 'paquetes',
          title: 'Paquetes despachados por Envío Nube',
          lead: 'Paquetes con fecha de posteo desde la activación de cada merchant que convirtió, hasta el ' + meta.cut + '.',
        },
        h(
          'div',
          { className: 'kpis kpis--4' },
          h(Kpi, { label: 'Paquetes', value: fmt(D.paquetes), sub: 'Consolidado' }),
          h(Kpi, { label: 'Merchants que despacharon', value: fmt(D.despacharon), sub: pct(shareDispatch) + ' de los que activaron' }),
          h(Kpi, { label: 'Mediana por merchant', value: String(D.mediana).replace('.', ','), sub: 'Paquetes por merchant que despachó' }),
          h(Kpi, { label: 'Activaron sin despachar todavía', value: fmt(D.sinDespacho), sub: pct(D.sinDespacho / D.conv, 0) + ' de los que activaron' })
        ),
        h('p', { className: 'note' }, 'Los 10 merchants que más despachan concentran ' + pct(D.top10, 0) + ' de los paquetes; el primero, ' + fmt(D.top1Paq) + ' paquetes (' + pct(D.top1, 0) + ').')
      ),
      h(
        Section,
        { id: 'insights', title: 'Insights' },
        h('div', { className: 'insights' }, insights.map((x) => h(Insight, { key: x.title, title: x.title, body: x.body })))
      ),
      h(
        Section,
        { id: 'metodologia', title: 'Metodología' },
        h(
          'ul',
          { className: 'method' },
          h('li', null, h('strong', null, 'Canal. '), 'Views, usuarios únicos y clics salen del export de sesiones de Userflow del flow “' + meta.flowName + '”, del 28 sep 2026 18:00 UTC al 9 oct 2026 18:00 UTC (' + fmt(D.views) + ' sesiones). Views totales = sesiones; views únicas = usuarios únicos. El clic en Activar es la sesión cerrada por la acción del botón (“Ended through action”), la única acción del tooltip. CTR = clics en Activar / views totales.'),
          h('li', null, h('strong', null, 'Cruce. '), 'Por Store ID (columna Company: ID del export) con la tabla de envíos de Argentina en Databricks (NuvemLens), con datos hasta el ' + meta.cut + '.'),
          h('li', null, h('strong', null, 'Envío Nube previo. '), 'Merchant con Envío Nube habilitado en su configuración, un pedido pagado donde el comprador eligió Envío Nube, o una etiqueta de Envío Nube, anterior al día de su primera view. Base elegible = impactados menos previos.'),
          h('li', null, h('strong', null, 'Conversión. '), 'Merchant de la base que configuró Envío Nube o tuvo su primera señal de uso (pedido con Envío Nube elegido o primera etiqueta) en la fecha de su primera view o después. CVR = conversiones / merchants sin Envío Nube previo. No hay atribución causal: incluye activaciones que podrían haber ocurrido igual.'),
          h('li', null, h('strong', null, 'Paquetes. '), 'Envíos de Envío Nube (con orden de entrega) con fecha de posteo desde el día de activación del merchant, de los merchants convertidos. Incluye envíos asociados a pedidos y envíos avulsos.'),
          h('li', null, h('strong', null, 'Límites. '), 'La fecha de configuración no está disponible: se infiere de la primera orden con Envío Nube habilitado, por lo que un merchant que configuró y aún no tuvo pedidos no se detecta. Las fechas son diarias (UTC): una activación el mismo día de la primera view cuenta como conversión (' + fmt(D.sameDay) + ' casos). Userflow cuenta como view las ' + fmt(D.endReasons.missing) + ' sesiones sin ancla de tooltip, y ' + fmt(D.multiSession) + ' merchants tuvieron más de una sesión.')
        )
      )
    ),
    h('footer', { className: 'footer' }, h('div', { className: 'wrap' }, 'Lifecycle AR, Envío Nube. Datos de Userflow y Databricks (NuvemLens). Corte: ' + meta.cut + '.'))
  );
}
