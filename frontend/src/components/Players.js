import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Container, Button, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import TablaJugadores from "./TablaJugadores.jsx";
const Players = () => {
  const location = useLocation();
  const alertMessage = location.state?.alert;
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <>
      {alertMessage && (
        <Alert color="success" isOpen={visible} toggle={onDismiss} className="m-3">
          {alertMessage}
        </Alert>
      )}
      <Container>
        <TablaJugadores />
        <Link to="/addplayer" className="text-decoration-none">
          <Button color="primary">Agregar nuevo jugador</Button>
        </Link>
      </Container>
    </>
  );
};

export default Players;
