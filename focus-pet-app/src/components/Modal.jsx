function Modal({ children, title }) {
  return (
    <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      {title ? <h1 id="modal-title">{title}</h1> : null}
      {children}
    </section>
  );
}

export default Modal;
