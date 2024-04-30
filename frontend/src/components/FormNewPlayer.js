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
  Alert,
} from "reactstrap";

import { useState, useEffect } from "react";
import { postPlayer, getTeams, putPlayer } from "../utils/apicalls";
import { useNavigate, useLocation } from "react-router-dom";
import Validation from "../utils/utils";

const FormNewPlayer = () => {
  const [playerData, setPlayerData] = useState({
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
    equipo: null,
    dorsal: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const player = location.state?.selectedPlayer;
    if (player) {
      setPlayerData(player);
      setIsEditMode(true);
    }
  }, []);

  useEffect(() => {
    setErrors(Validation(playerData));
  }, [playerData]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({
      ...playerData,
      [name]: value === "" ? null : value, // o "" en lugar de null
    });
  };

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = async (event) => {
    event.preventDefault();
    let alertMessage;

    
    if (Object.keys(errors).length > 0) {
      setShowAlert(true);
      return;
    }

    try {
      let response;

      if (isEditMode) {
        response = await putPlayer(playerData);
        console.log("put");
        alertMessage = "¡Jugador modificado correctamente!";
      } else {
        response = await postPlayer(playerData);
        console.log("post");
        alertMessage = "¡Jugador registrado correctamente!";
      }

      navigate("/players", { state: { alert: alertMessage } });

    } catch (error) {
      console.error(error);
    }
  };

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams()
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, []);

  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  return (
    <Container className="d-flex justify-content-center mx-5">
      <Form className="m-3" onSubmit={handleSave}>
        {showAlert && (
          <Alert
            color="danger"
            isOpen={visible}
            toggle={onDismiss}
            className="m-3"
          >
            Por favor, corrija los errores antes de enviar el formulario.
          </Alert>
        )}
        <Row>
          <h3>Datos personales</h3>
          <hr />
          <Col md={4}>
            <FormGroup>
              <Label for="nombre">Nombre *</Label>
              <Input
                id="nombre"
                name="nombre"
                placeholder="Nombre del jugador"
                value={playerData.nombre}
                onChange={handleChange}
                invalid={errors.nombre ? true : false}
              />
              {errors.nombre && <FormFeedback>{errors.nombre}</FormFeedback>}
            </FormGroup>
            <FormFeedback>{errors.nombre}</FormFeedback>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="apellido1">Primer apellido *</Label>
              <Input
                id="apellido1"
                name="apellido1"
                value={playerData.apellido1}
                onChange={handleChange}
                invalid={errors.apellido1 ? true : false}
              />
              {errors.apellido1 && <FormFeedback>{errors.apellido1}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="apellido2">Segundo apellido</Label>
              <Input
                id="apellido2"
                name="apellido2"
                value={playerData.apellido2}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={1}>
            <FormGroup>
              <Label for="edad">Edad *</Label>
              <Input
                id="edad"
                name="edad"
                type="number"
                value={playerData.edad}
                onChange={handleChange}
                invalid={errors.edad ? true : false}
              />
              {errors.edad && <FormFeedback>{errors.edad}</FormFeedback>}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label for="email">Email *</Label>
              <Input
                id="email"
                name="email"
                placeholder="user@gmail.com"
                type="email"
                value={playerData.email}
                onChange={handleChange}
                invalid={errors.email ? true : false}
              />
              {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="telefono">Telefono de contacto *</Label>
              <Input
                id="telefono"
                name="telefono"
                placeholder="123456789"
                type="tel"
                value={playerData.telefono}
                onChange={handleChange}
                invalid={errors.telefono ? true : false}
              />
              {errors.telefono && <FormFeedback>{errors.telefono}</FormFeedback>}
            </FormGroup>
          </Col>
        </Row>
        <h3>Direccion del jugador</h3>
        <hr />
        <FormGroup>
          <Label for="direccion">Dirección de residencia *</Label>
          <Input
            id="direccion"
            name="direccion"
            placeholder="C/ Ejemplo, 123"
            value={playerData.direccion}
            onChange={handleChange}
            invalid={errors.direccion ? true : false}
          />
          {errors.direccion && <FormFeedback>{errors.direccion}</FormFeedback>}
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="ciudad">Ciudad *</Label>
              <Input
                id="ciudad"
                name="ciudad"
                value={playerData.ciudad}
                onChange={handleChange}
                invalid={errors.ciudad ? true : false}
              />
              {errors.ciudad && <FormFeedback>{errors.ciudad}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="provincia">Provincia *</Label>
              <Input
                id="provincia"
                name="provincia"
                value={playerData.provincia}
                onChange={handleChange}
                invalid={errors.provincia ? true : false}
              />
              {errors.provincia && <FormFeedback>{errors.provincia}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="zip">Código postal</Label>
              <Input
                id="zip"
                name="zip"
                type="number"
                value={playerData.zip}
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
                value={playerData.equipo}
                onChange={handleChange}
                invalid={errors.equipo ? true : false}
              >
                <option key={""} value={""}>
                  Ninguno
                </option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.categoria}-{team.nombre}
                  </option>
                ))}
              </Input>
              {errors.equipo && <FormFeedback>{errors.equipo}</FormFeedback>}
            </FormGroup>
          </Col>
          <Col md={1}>
            <FormGroup>
              <Label for="dorsal">Dorsal</Label>
              <Input
                id="dorsal"
                name="dorsal"
                type="number"
                value={playerData.dorsal}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit">Guardar</Button>
      </Form>
    </Container>
  );
};

export default FormNewPlayer;
