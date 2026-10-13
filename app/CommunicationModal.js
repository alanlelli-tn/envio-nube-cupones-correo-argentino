'use client';

import React from 'react';

const h = React.createElement;

// Botón "Ver comunicación" + modal con la imagen del tooltip.
export default function CommunicationModal(props) {
  const [open, setOpen] = React.useState(false);
  const closeRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return h(
    React.Fragment,
    null,
    h('button', { type: 'button', className: 'btn btn--outline', onClick: () => setOpen(true), 'aria-haspopup': 'dialog' }, props.button),
    open
      ? h(
          'div',
          { className: 'modal', onClick: () => setOpen(false) },
          h(
            'div',
            { className: 'modal__box', role: 'dialog', 'aria-modal': 'true', 'aria-label': props.title, onClick: (e) => e.stopPropagation() },
            h('button', { type: 'button', className: 'modal__close', ref: closeRef, 'aria-label': 'Cerrar', onClick: () => setOpen(false) }, '×'),
            h('p', { className: 'modal__title' }, props.title),
            h('img', { src: props.src, alt: props.alt, className: 'modal__img' })
          )
        )
      : null
  );
}
