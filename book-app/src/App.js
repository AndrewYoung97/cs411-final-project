import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import BookMenu from './components/BookMenu';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="container mt-2">
        <Switch>
          <Route exact path="/" component={BookMenu} />
          <Route path="/edit/"
        </Switch>
        {/* <Switch>
          <Route exact path="/authors" component={AuthorMenu} />
        </Switch> */}
      </main>
    </BrowserRouter>
  )
}

export default App;
