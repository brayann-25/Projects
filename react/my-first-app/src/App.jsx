import "./App.css";
import { XFollowCard } from "./xFollowCard";

export function App() {
  // *const format = (userName) => `@${userName}`;
  // * Componente: elemento que devuelve otro elemento
  // * Prop: información que se le pasa a un componente
  // * Elemento: lo que se renderiza en pantalla
  // * const formatedUserName = <span>@brayanarvelo</span>;
  //  * Los children son los elementos que se encuentran entre las etiquetas de un componente

  
  return (
    <section className="App">
      <XFollowCard // * Esto es un componente que devuelve un elemento
        // formatUsername={format}  Pasamos la función como prop
        userName="brayanarvelo"
      >
        Brayan Arvelo Balbbuena
      </XFollowCard>

      <XFollowCard
        // formatUsername={format}
        userName="astridortegaa"
      >
        Astrid Ortega
      </XFollowCard>
    </section>
  );
}
