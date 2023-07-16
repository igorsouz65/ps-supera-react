import './App.css';
import Transferencias from './components/Transferencias';

function App() {
  return (
    <div className="App">
      <h1>Olá, React</h1>
      <scene is="x3d" p1></scene>

      <Transferencias className="App" />

    </div>

  );
}

export default App;
