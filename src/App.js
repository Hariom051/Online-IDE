import { AllRoutes } from "./Routes/AllRoutes";

function App() {
  document.addEventListener('contextmenu', event => event.preventDefault());      
  return (
    <div  className="App">
      <AllRoutes/>
    </div>
  );
}

export default App;
