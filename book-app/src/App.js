import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from './components/navBar';
import BookMenu from './components/bookMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBook from "./components/addBook";
import Login from './components/login';
import Register from './components/register';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="container mt-2">
        <Switch>
          <Route exact path="/" component={BookMenu} />
          <Route path="/books/new" component={AddBook} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App;
