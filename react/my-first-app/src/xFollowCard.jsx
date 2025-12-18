import "./App.css";
import { useState } from "react";

export function XFollowCard({ children, userName }) {
  // * No modicamos las props

  // Estado local para manejar si se está siguiendo o no
  const [isFollowing, setIsFollowing] = useState(false);
  /*
   *  Otra forma de escribirlo
   * const [name, setName] = useState('Brayan');
   *
   *  const handleClick = () => {
   *    setName('Astrid');
   *  }
   */

  const text = isFollowing ? "Siguiendo" : "Seguir";

  const buttonClassName = isFollowing
    ? "x-followCard-button is-following"
    : "x-followCard-button";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <article className="x-followCard">
      <header className="x-followCard-header">
        <img
          className="x-followCard-avatar"
          src="https://media-bcn1-1.cdn.whatsapp.net/v/t61.24694-24/586739587_1488308329124665_4476067750708660254_n.jpg?stp=dst-jpg_s96x96_tt6&ccb=11-4&oh=01_Q5Aa3QFDrZrKlO0uVIiXvZfdebZZ-nokYE6EkxLbW-P_6DcYRA&oe=69505EB5&_nc_sid=5e03e0&_nc_cat=107"
          alt="foto-perfil"
        />
        <div className="x-followCard-info">
          <strong>{children}</strong>
          <span className="x-followCard-userName">@{userName}</span>
        </div>
      </header>

      <aside>
        <button onClick={handleClick} className={buttonClassName}>
          {text}
        </button>
      </aside>
    </article>
  );
}
