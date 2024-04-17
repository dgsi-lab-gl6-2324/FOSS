import React, { useState, useEffect } from "react";
import { Table, Container, Button } from "reactstrap";
import { getPlayers } from "../utils/apicalls";
import { Link } from "react-router-dom";  
const Players = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Realizar la llamada a la API para obtener los jugadores
    getPlayers()
      .then((data) => {
        // Actualizar el estado con los datos de los jugadores
        setPlayers(data);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <Container>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido 1</th>
            <th>Apellido 2</th>
            <th>Age</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <th scope="row">{player.id}</th>
              <td>{player.nombre}</td>
              <td>{player.apellido1}</td>
              <td>{player.apellido2}</td>
              <td>{player.edad}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/addplayer" className="text-decoration-none">
        <Button color="primary">
          Agregar nuevo jugador
        </Button>
      </Link>
    </Container>
  );
}

export default Players;
