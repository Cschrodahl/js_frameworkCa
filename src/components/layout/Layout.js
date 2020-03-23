import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Home from "../home/Home";
import Contact from "../contact/Contact";
import GameDetail from "../games/GameDetail";
import FavoritePage from "../favorite/FavoritePage";

function Layout() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <NavLink to="/" exact>
            <Navbar.Brand>react Ca</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <NavLink to="/" exact className="nav-link">
                Home
              </NavLink>
              <NavLink to="/favorite" exact className="nav-link">
                Favorite
              </NavLink>
              <NavLink to="/contact" exact className="nav-link">
                Contact
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/favorite" exact component={FavoritePage} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/game/:id" component={GameDetail} />
        </Switch>
      </Container>
    </Router>
  );
}
export default Layout;
