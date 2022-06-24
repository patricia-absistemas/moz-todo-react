import React from "react";

function FilterButton(props) {
  /*estados dos filtros:
    -Cada um deve ter seu nome;
    -Cada um deve ter seu comportamento;
  */
  const [filter, setFilter] = useState('All');

  return (
    <button type="button" className="btn toggle-btn" aria-pressed={props.isPressed} onClick={props.setFilter()}>
      <span className="visually-hidden">Show </span>
      <span>{props.name} </span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
