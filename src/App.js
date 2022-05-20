import './App.css';
import InputForm from './components/InputForm';
require('dotenv').config()
const apiKey = process.env.REACT_APP_AI_APIKEY

const App = () => {

  return (
    <div className="App">
      <h1>Hello world!</h1>
      <InputForm/>
    </div>
  );
}

export default App;
