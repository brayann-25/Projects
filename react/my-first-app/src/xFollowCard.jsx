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
          src={`https://unavatar.io/tiktok/${userName}`}
          alt="foto-perfil"
        />
        <div className="x-followCard-info">
          <strong>{children}</strong>
          <span className="x-followCard-userName">@{userName}</span>
        </div>
      </header>

      <aside>
        <button onClick={handleClick} className={buttonClassName}>
          <span className="x-followCard-follow"> {text}</span>
          <span className="x-followCard-stopFollow"> Dejar de seguir</span>
        </button>
      </aside>
    </article>
  );
}
