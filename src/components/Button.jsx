const Button = ({ label, type, onClick }) => (
  <button
    className={`calc-btn calc-btn--${type}`}
    onClick={() => onClick(label)}
    aria-label={label}
  >
    {label}
  </button>
)

export default Button
