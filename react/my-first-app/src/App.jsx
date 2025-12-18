import "./App.css";
import { XFollowCard } from "./xFollowCard";

export function App() {
  // *const format = (userName) => `@${userName}`;
  // * Componente: elemento que devuelve otro elemento
  // * Prop: información que se le pasa a un componente
  // * Elemento: lo que se renderiza en pantalla
  // * const formatedUserName = <span>@brayanarvelo</span>;
  // * Los children son los elementos que se encuentran entre las etiquetas de un componente

  /*
  <XFollowCard // * Esto es un componente que devuelve un elemento
        formatUsername={format}  // * Pasamos la función como prop
        userName="brayan_25"
      >
        Brayan Arvelo Balbbuena
      </XFollowCard>

      <XFollowCard
        formatUsername={format}
        userName="astridortegaa"
      >
        Astrid Ortega                                             
      </XFollowCard>
  */

  const users = [
    {
      userName: "brayan__25",
      name: "Brayan Arvelo",
      isFolowing: false,
    },
    { userName: "astridortega2", 
      name: "Astrid Ortega",
      isFolowing: true },
    {
      userName: "carlitos123",
      name: "Carlitos Perez",
      isFolowing: false,
    },
  ];

  return (
    <section className="App">
      {users.map(({ userName, name }) => (
        <XFollowCard
          key={userName} // * Siempre que se usa un map se debe agregar una key única
          // formatUsername={format}
          userName={userName}
        >
          {name}
        </XFollowCard>
      ))}
    </section>
  );
}
