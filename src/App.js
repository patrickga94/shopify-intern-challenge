import './App.css';
import InputForm from './components/InputForm';
require('dotenv').config()


const App = () => {

  return (
    <div className="App">
      <h1>Fun With AI</h1>
      <InputForm/>
    </div>
  );
}

export default App;
