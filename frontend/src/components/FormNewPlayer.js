import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useState } from "react";
import { postPlayer } from "../utils/apicalls";
const FormNewPlayer = () => {
  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [edad, setEdad] = useState("");

  const handleSave = async () => {
    const playerData = {
      nombre,
      apellido1,
      apellido2,
      edad,
    };

    try {
      const response = await postPlayer(playerData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form className="m-3">
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="nombre">Nombre</Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Nombre del jugador"
              onChange={(e) => setNombre(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="apellido1">Apellido 1</Label>
            <Input
              id="apellido1"
              name="apellidos"
              placeholder="Primer apellido del jugador"
              onChange={(e) => setApellido1(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="apellido2">Apellido 2</Label>
            <Input
              id="apellido2"
              name="apellido2"
              placeholder="Segundo apellido del jugador"
              onChange={(e) => setApellido2(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="edad">Edad</Label>
            <Input id="edad" name="edad" type="number" onChange={(e) => setEdad(e.target.value)}/>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="user@gmail.com"
              type="email"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="telefono">Telefono de contacto</Label>
            <Input
              id="telefono"
              name="telefono"
              placeholder="123456789"
              type="tel"
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="direccion">Dirección</Label>
        <Input id="direccion" name="direccion" placeholder="C/ Ejemplo, 123" />
      </FormGroup>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="ciudad">Ciudad</Label>
            <Input id="ciudad" name="ciudad" />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="provincia">Provincia</Label>
            <Input id="provincia" name="provincia" />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="zip">Código postal</Label>
            <Input id="zip" name="zip" type="number" />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label for="equipo">Equipo</Label>
            <Input id="equipo" name="equipo" type="select" />
          </FormGroup>
        </Col>
        <Col md={1}>
          <FormGroup>
            <Label for="dorsal">Dorsal</Label>
            <Input id="dorsal" name="dorsal" type="number" />
          </FormGroup>
        </Col>
      </Row>
      <Button onClick={handleSave}>Guardar</Button>
    </Form>
  );
};

export default FormNewPlayer;
