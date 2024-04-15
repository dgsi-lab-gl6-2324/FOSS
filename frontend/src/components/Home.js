import React from "react";
import { Button, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Slider from "./Slider";

const Home = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Row className="text-center mt-3">
        <h4 className="display-9">
          Bienvenido al sistema de soporte de clubes de Fútbol
        </h4>
      </Row>
      <Row className="mt-4 col-8">
        <Slider />
      </Row>
      <Row className="d-flex justify-content-center mt-4">
        <Link to="/players" className="text-decoration-none">
          <Button color="primary" style={{ width: "300px" }}>
            VER JUGADORES
          </Button>
        </Link>
      </Row>
      <Row className="d-flex justify-content-center mt-4">
        <Link to="/teams" className="text-decoration-none">
          <Button color="success" style={{ width: "300px" }}>
            VER EQUIPOS
          </Button>
        </Link>
      </Row>
    </Container>
  );
};

export default Home;
