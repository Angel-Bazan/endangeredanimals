import "./App.css";
import Species from "./components/species";
import Sightings from "./components/sightings";

function App() {
  return (
    <div className="App">
      <h1>Fantastic Beasts</h1>
      <p>Include Beast Information</p>
      <Species />
      <Sightings />
    </div>
  );
}

export default App;
