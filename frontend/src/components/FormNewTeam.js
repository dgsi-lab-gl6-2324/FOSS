import React, { useState, useEffect } from "react";
import { getPlayers, postTeam } from "../utils/apicalls";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";

import { useNavigate } from "react-router-dom";
import {categorias} from "../utils/utils";

const FormNewTeam = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [searchStaff, setSearchStaff] = useState("");
  const [searchStaffType, setSearchStaffType] = useState("");
  const [players, setPlayers] = useState([]);
  const [staff, setStaff] = useState([]);

  const [teamData, setTeamData] = useState({
    nombreEquipo: "",
    categoria: "",
    jugadores: [],
    staff: [],
  });

  const navigate = useNavigate();

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
 
  const handleChange = (e) => {
    setTeamData({
      ...teamData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const teamDataWithPlayers = {
      ...teamData,
      players: selectedPlayers, staff: selectedStaff,
    };
    try {
      const response = await postTeam(teamDataWithPlayers);
      navigate("/teams", {
        state: { alert: "¡Equipo registrado correctamente!" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayerSelection = (player, isSelected) => {
    if (isSelected) {
      setSelectedPlayers((prevPlayers) => [...prevPlayers, player]);
    } else {
      setSelectedPlayers((prevPlayers) =>
        prevPlayers.filter((p) => p.id !== player.id)
      );
    }
  };

  // Función para manejar la selección del cuerpo técnico
  const handleSelectStaff = (member) => {
    setSelectedStaff([...selectedStaff, member]);
  };

  // Función para manejar la búsqueda
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Función para manejar la búsqueda del cuerpo técnico
  const handleSearchStaff = (event) => {
    setSearchStaff(event.target.value);
  };

  // Función para manejar la búsqueda del tipo de cuerpo técnico
  const handleSearchStaffType = (event) => {
    setSearchStaffType(event.target.value);
  };

  return (
    <Container>
      <Form className="m-3" onSubmit={handleSave}>
        <Row>
          <h3>Datos del equipo</h3>
          <hr />
          <Col md={4}>
            <FormGroup>
              <Label for="CategoriaEquipo">Categoria del equipo</Label>
              <Input
                id="CategoriaEquipo"
                name="CategoriaEquipo"
                value={teamData.categoria}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <h3>Jugadores del equipo</h3>
          <hr />
          <Col>
            <Input
              className="m-2"
              type="text"
              placeholder="Buscar jugadores"
              value={search}
              onChange={handleSearch}
            />
            <Table bordered className="m-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Primer apellido</th>
                  <th>Segundo Apellido</th>
                  <th>Edad</th>
                  <th>Agregar al equipo</th>
                </tr>
              </thead>
              <tbody>
                {players
                  .filter((player) => !search || player.nombre.includes(search))
                  .map((player, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{player.nombre}</td>
                      <td>{player.apellido1}</td>
                      <td>{player.apellido2}</td>
                      <td>{player.edad}</td>
                      <td>
                        <Input
                          type="checkbox"
                          onChange={handlePlayerSelection}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <h3>Cuerpo técnico del equipo</h3>
          <hr />
          <Col>
            <Input
              className="m-2"
              type="text"
              placeholder="Nombre"
              value={searchStaff}
              onChange={handleSearchStaff}
            />
          </Col>
          <Col md={4}>
            <Input
              className="m-2"
              placeholder="Categoria"
              type="select"
              value={searchStaff}
              onChange={handleSearchStaff}
            />
          </Col>
          <Table bordered className="m-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Tipo de staff</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {staff
                .filter(
                  (member) =>
                    member.name.includes(searchStaff) &&
                    member.type.includes(searchStaffType)
                )
                .map((member, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{member.name}</td>
                    <td>
                      <Input
                        type="checkbox"
                        onChange={() => handleSelectStaff(member)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Row>
        <Button type="submit">Registrar equipo</Button>
      </Form>
    </Container>
  );
};

export default FormNewTeam;
