function Input({ error, label, id, className = '', ...props }) {
  return (
    <label className={`field ${className}`.trim()} htmlFor={id}>
      <span className="field__label">{label}</span>
      <input className="field__input" id={id} {...props} />
      {error ? <span className="field__error">{error}</span> : null}
    </label>
  );
}

export default Input;
