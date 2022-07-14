import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from './Pages/Home/index'
import AddBill from './Pages/AddBill/index'

import './App.css'

function App() {
  console.clear()
  return (
    <>
      <BrowserRouter>
          <Switch>
          <Route path="/" component={HomePage} exact/>
          <Route path="/addBill" component={AddBill} />
          {/* <Route path="/" component={ComingSoon} /> */}
          {/* <Route path="/blogs" component={ComingSoon} /> */}
          {/* <Route component={Error404} /> */}
          </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;