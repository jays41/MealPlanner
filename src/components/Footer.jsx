import { Container, Row, Col, Stack, Image, Nav, NavLink } from "react-bootstrap";
import "../layouts/layouts.css";

const Footer = () => {
  return (
    <footer className="footer">
        <Container fluid style={{backgroundColor: "cornflowerblue"}} className="text-white p-4">
            <Row>
                Footer
            </Row>
            <Row>              
              <li>Add content</li>             
            </Row>
            <Row><li>Put at the bottom of the page</li></Row>
        </Container>
    </footer>
  )
}

export default Footer