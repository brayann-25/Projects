import { useState } from "react";
import "./Todolist.css";

export default function Todolist({ children }) {

  const [isCompleted, setIsCompleted] = useState(false);

  const liClassName = isCompleted ? "td-task-item completed" : "td-task-item";

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="td-task-item-container">
        <input className="td-task-input" type="checkbox" onClick={handleCheckboxChange} />
        <li className={liClassName}> {children} </li>
    </div>
  );
}
