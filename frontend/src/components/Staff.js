import React from "react";
import TablaStaff from "./TablaStaff.jsx";
import { Button, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

const Staff = () => {
  return (
    <Container>
      <Row>
        <h3>Entrenadores</h3>
        <hr />
        <TablaStaff tipoStaff="entrenador" />
      </Row>
      <Row>
        <h3>Segundos entrenadores</h3>
        <hr />
        <TablaStaff tipoStaff="entrenador2" />
      </Row>
      <Row>
        <h3>Otros</h3>
        <hr />
        <TablaStaff tipoStaff="" />
      </Row>
      <Row>
        <Link to="/addstaff" className="text-decoration-none">
          <Button color="primary">
            Agregar nuevo miembro del cuerpo técnico
          </Button>
        </Link>
      </Row>
    </Container>
  );
};

export default Staff;
