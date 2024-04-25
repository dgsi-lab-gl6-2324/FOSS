import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useState, useEffect } from "react";
import { deleteTeam, getTeams } from "../utils/apicalls";
import { useNavigate } from "react-router-dom";

const TablaEquipos = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleRowClick = (team) => {
    setSelectedTeam(team);
    setModalOpen(true);
  };

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Realizar la llamada a la API para obtener los jugadores
    getTeams()
      .then((data) => {
        // Actualizar el estado con los datos de los jugadores
        setTeams(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  }, []); // Ejecutar solo una vez al montar el componente

  const closeModal = () => {
    setSelectedTeam(null);
    setModalOpen(false);
  };

  const handleEdit = () => {
    navigate("/editteam", { state: { selectedTeam: selectedTeam } });
  };

  const handleDelete = async () => {
    try {
      await deleteTeam(selectedTeam._id);
      // Actualiza la lista de jugadores después de eliminar uno
      (teams.filter((team) => team._id !== selectedTeam._id));
      // Cierra el modal y muestra un mensaje de éxito
      closeModal();
      navigate("/teams", {
        state: { alert: "¡Equipo eliminado correctamente!" },
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
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id} onClick={() => handleRowClick(team)}>
              <th scope="row">{team._id}</th>
              <td>{team.nombre}</td>
              <td>{team.categoria}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedTeam && (
        <Modal isOpen={modalOpen} toggle={closeModal} centered={true}>
          <ModalHeader toggle={closeModal}>Información del Equipo</ModalHeader>
          <ModalBody>
            Nombre: {selectedTeam.nombre} <br />
            Categoria: {selectedTeam.categoria} <br />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleEdit}>
              Modificar
            </Button>
            <Button color="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default TablaEquipos;