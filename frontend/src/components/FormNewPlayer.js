import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Container,
  FormFeedback,
} from "reactstrap";
import { useState } from "react";
import { postPlayer } from "../utils/apicalls";
import { useNavigate } from "react-router-dom";

const FormNewPlayer = () => {
  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [edad, setEdad] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [zip, setZip] = useState("");
  const [equipo, setEquipo] = useState("");
  const [dorsal, setDorsal] = useState("");

  const navigate = useNavigate();

  const handleSave = async () => {
    const playerData = {
      nombre,
      apellido1,
      apellido2,
      edad,
      email,
      telefono,
      direccion,
      ciudad,
      provincia,
      zip,
      equipo,
      dorsal,
    };

    try {
      const response = await postPlayer(playerData);
      navigate("/players", {
        state: { alert: "¡Jugador registrado correctamente!" },
      }); // Redirige a /players con estado
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center mx-5">
      <Form className="m-3">
        <Row>
          <h3>Datos personales</h3>
          <hr />
          <Col md={4}>
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input className={(nombre.length > 0 && nombre.length < 30) ? 'valid' : 'invalid'}
                id="nombre"
                name="nombre"
                placeholder="Nombre del jugador"
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <FormFeedback valid></FormFeedback>
              <FormFeedback ></FormFeedback>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="apellido1">Primer apellido</Label>
              <Input
                id="apellido1"
                name="apellidos"
                onChange={(e) => setApellido1(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="apellido2">Segundo apellido</Label>
              <Input
                id="apellido2"
                name="apellido2"
                onChange={(e) => setApellido2(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={1}>
            <FormGroup>
              <Label for="edad">Edad</Label>
              <Input
                id="edad"
                name="edad"
                type="number"
                onChange={(e) => setEdad(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setTelefono(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <h3>Direccion del jugador</h3>
        <hr />
        <FormGroup>
          <Label for="direccion">Dirección de residencia</Label>
          <Input
            id="direccion"
            name="direccion"
            placeholder="C/ Ejemplo, 123"
            onChange={(e) => setDireccion(e.target.value)}
          />
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="ciudad">Ciudad</Label>
              <Input
                id="ciudad"
                name="ciudad"
                onChange={(e) => setCiudad(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="provincia">Provincia</Label>
              <Input
                id="provincia"
                name="provincia"
                onChange={(e) => setProvincia(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="zip">Código postal</Label>
              <Input
                id="zip"
                name="zip"
                type="number"
                onChange={(e) => setZip(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <h3>Información deportiva</h3>
          <hr />
          <Col md={4}>
            <FormGroup>
              <Label for="equipo">Equipo</Label>
              <Input
                id="equipo"
                name="equipo"
                type="select"
                onChange={(e) => setEquipo(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={1}>
            <FormGroup>
              <Label for="dorsal">Dorsal</Label>
              <Input
                id="dorsal"
                name="dorsal"
                type="number"
                onChange={(e) => setDorsal(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button onClick={handleSave}>Guardar</Button>
      </Form>
    </Container>
  );
};

export default FormNewPlayer;
