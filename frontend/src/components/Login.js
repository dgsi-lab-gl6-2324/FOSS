import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import  useUser  from "../hooks/useUser";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login, isLogged } = useUser();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al servidor
    console.log("Username:", username);
    console.log("Password:", password);
    // También podrías hacer una solicitud HTTP para autenticar al usuario
  };

  useEffect(() => {
    
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mt-5">Iniciar sesión</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Usuario:</Label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Contraseña:</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </FormGroup>
            <Button color="primary" type="submit" block>
              Iniciar sesión
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
