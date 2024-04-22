import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postStaff, getTeams } from "../utils/apicalls";
import { tiposStaff } from "../utils/utils";

const FormNewStaff = () => {
  const [teams, setTeams] = useState([]);

  const [staffData, setStaffData] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    edad: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    zip: "",
    equipo: "",
    rol: "",
    titulo: "",
  });

  useEffect(() => {
    getTeams()
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStaffData({
      ...staffData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await postStaff(staffData);
      navigate("/staff", {
        state: { alert: "¡Personal registrado correctamente!" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const tiposStaffOptions = Object.values(tiposStaff);

  return (
    <Container className="d-flex justify-content-center mx-5">
      <Form className="m-3">
        <Row>
          <h3>Datos personales</h3>
          <hr />
          <Col md={4}>
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input
                id="nombre"
                name="nombre"
                onChange={handleChange}
                value={staffData.nombre}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="apellido1">Primer apellido</Label>
              <Input
                id="apellido1"
                name="apellido1"
                onChange={handleChange}
                value={staffData.apellido1}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="apellido2">Segundo apellido</Label>
              <Input
                id="apellido2"
                name="apellido2"
                onChange={handleChange}
                value={staffData.apellido2}
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
                value={staffData.edad}
                onChange={handleChange}
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
                value={staffData.email}
                onChange={handleChange}
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
                value={staffData.telefono}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <h3>Direccion del miembro del cuerpo tecnico</h3>
        <hr />
        <FormGroup>
          <Label for="direccion">Dirección de residencia</Label>
          <Input
            id="direccion"
            name="direccion"
            placeholder="C/ Ejemplo, 123"
            value={staffData.direccion}
            onChange={handleChange}
          />
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="ciudad">Ciudad</Label>
              <Input
                id="ciudad"
                name="ciudad"
                value={staffData.ciudad}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="provincia">Provincia</Label>
              <Input
                id="provincia"
                name="provincia"
                value={staffData.provincia}
                onChange={handleChange}
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
                value={staffData.zip}
                onChange={handleChange}
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
                value={staffData.equipo}
                onChange={handleChange}
              >
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.categoria}-{team.nombre}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="rol">Rol</Label>
              <Input
                id="rol"
                name="rol"
                type="select"
                value={staffData.rol}
                onChange={handleChange}
              >
                {tiposStaffOptions.map((categoria, index) => (
                  <option key={index} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="titulo">Titulos profesionales deportivos</Label>
              <Input
                id="titulo"
                name="titulo"
                value={staffData.titulo}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button onClick={handleSave}>Guardar</Button>
      </Form>
    </Container>
  );
};

export default FormNewStaff;
