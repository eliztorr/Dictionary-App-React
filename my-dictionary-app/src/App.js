import Dictionary from "./Dictionary";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <h1>Dictionary App</h1>
        </header>
        <Dictionary defaultKeyword="chocolate" />
        <footer>
          This project was coded by Elizabeth Torralbo for {" "}
          <a
            href="https://www.shecodes.io/users/59109-elizabeth-torralbo-valenzuela/"
            target="_blank"
            rel="noopener noreferrer"
          >
            SheCodes
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/eliztorr/Dictionary-App-React"
            target="_blank"
            rel="noopener noreferrer"
          >
            open-sourced on GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://dictionary-app-react-addon.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            hosted on Netlify
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;