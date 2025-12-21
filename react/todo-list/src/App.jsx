import "./App.css";
import Todolist from "./Todolist.jsx";

function App() {
  const date = new Date();
  const monthShort = date.toLocaleString("es-ES", { month: "short" });

  const tasks = [
    { id: 1, name: "task-1", content: "Buy groceries" },
    { id: 2, name: "task-2", content: "Walk the dog" },
    { id: 3, name: "task-3", content: "Read a book" },
    { id: 4, name: "task-4", content: "Exercise for 30 minutes" },
    { id: 5, name: "task-5", content: "Call a friend" },
    { id: 6, name: "task-6", content: "Exercise for 30 minutes" },
    { id: 7, name: "task-7", content: "Call a friend gay" },
    { id: 8, name: "task-8", content: "Call a friend" },
    { id: 9, name: "task-9", content: "Call a friend" },
    { id: 10, name: "task-10", content: "Call a friend" },
  ];

  return (
    <>
      <article className="td-container">
        <header className="td-header">
          <h1>Todolist</h1>
          <span className="td-today">
            Today, {date.getDate() + 1}{" "}
            <span className="td-month">{monthShort}</span>
          </span>
        </header>
        <section className="td-section-tabs">
          <button>Today</button>
          <button>Tomorrow </button>
          <button>Week</button>
        </section>
        <section className="td-section-tasks">
          <ul className="td-task-list">
            {tasks.map(({ id, name, content }) => (
              <Todolist key={id} name={name}>
                {content}
              </Todolist>
            ))}
          </ul>
        </section>
        <menu className="td-menu-bar">
          <button className="td-task-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
              />
            </svg>
            Task
          </button>
          <button className="td-calendar-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            Calendar
          </button>
          <button className="td-profile-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            Profile
          </button>
        </menu>
      </article>
    </>
  );
}

export default App;
