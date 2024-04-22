import {
  Table,
  Modal,
  Button,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import { useState, useEffect } from "react";
import { getPlayers, getSingleTeam } from "../utils/apicalls";
import { useNavigate } from "react-router-dom";
import { deletePlayer } from "../utils/apicalls";

const TablaJugadores = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState({});

  useEffect(() => {
    // Realizar la llamada a la API para obtener los jugadores
    getPlayers()
      .then((data) => {
        // Actualizar el estado con los datos de los jugadores
        setPlayers(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  }, []); // Ejecutar solo una vez al montar el componente

  useEffect(() => {
    const fetchTeams = async () => {
      const newTeams = {};
      for (const player of players) {
        if (!teams[player.equipo]) {
          newTeams[player.equipo] = await getSingleTeam(player.equipo);
        }
      }
      setTeams((prevTeams) => ({ ...prevTeams, ...newTeams }));
    };

    fetchTeams();
  }, [players]);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = (player) => {
    setSelectedPlayer(player);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlayer(null);
    setModalOpen(false);
  };

  const handleEdit = () => {
    navigate("/editplayer", { state: { selectedPlayer: selectedPlayer } });
  };

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deletePlayer(selectedPlayer._id);
      // Actualiza la lista de jugadores después de eliminar uno
      // Esto puede variar dependiendo de cómo estés manejando el estado de los jugadores
      setPlayers(players.filter((player) => player.id !== selectedPlayer._id));
      // Cierra el modal y muestra un mensaje de éxito
      closeModal();
      navigate("/players", {
        state: { alert: "¡Jugador eliminado correctamente!" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Table hover bordered className="m-3">
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
            <tr
              key={player.id}
              onClick={() => handleRowClick(player)}
            >
              <th scope="row">{player._id}</th>
              <td>{player.nombre}</td>
              <td>{player.apellido1}</td>
              <td>{player.apellido2}</td>
              <td>{player.edad}</td>
              <td>{teams[player.equipo]?.nombre}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedPlayer && (
        <Modal isOpen={modalOpen} toggle={closeModal} centered={true}>
          <ModalHeader toggle={closeModal}>Información del Jugador</ModalHeader>
          <ModalBody>
            Nombre: {selectedPlayer.nombre} <br />
            Primer Apellido: {selectedPlayer.apellido1} <br />
            Segundo Apellido: {selectedPlayer.apellido2} <br />
            Edad: {selectedPlayer.edad} <br />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleEdit}>
              Modificar
            </Button>{" "}
            <Button color="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default TablaJugadores;
