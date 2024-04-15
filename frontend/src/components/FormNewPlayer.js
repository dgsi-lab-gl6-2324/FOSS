import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const FormNewPlayer = () => {
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
              type="email"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="apellidos">Apellidos</Label>
            <Input
              id="apellidos"
              name="apellidos"
              placeholder="Apellidos del jugador"
            />
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
      <Button>Guardar</Button>
    </Form>
  );
};

export default FormNewPlayer;
