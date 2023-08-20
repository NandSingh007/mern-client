import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import img from '../Image/alma.png'
import '../styles/header.css'
function Header() {
  return (
    <>
      <Navbar className="navbar-style sticky-top"> {/* Add the "navbar-style" class */}
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={img}
              width="120"
              height="60"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;