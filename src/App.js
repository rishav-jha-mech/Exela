import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from './Pages/Home/index'
import AddBill from './Pages/AddBill/index'
import ShowBill from './Pages/ShowBill/index'
import './App.css'

function App() {
  console.clear()
  return (
    <>
      <BrowserRouter>
          <Switch>
          <Route path="/" component={HomePage} exact/>
          <Route path="/addBill" component={AddBill} />
          <Route path="/bill/:id" component={ShowBill} />
          
          </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;