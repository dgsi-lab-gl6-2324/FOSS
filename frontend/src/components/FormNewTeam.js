import React, { useState, useEffect } from "react";
import { getPlayers, postTeam, putTeam, getStaff } from "../utils/apicalls";
import { tiposStaff } from "../utils/utils";
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

import { useNavigate, useLocation } from "react-router-dom";
import { categorias } from "../utils/utils";

const FormNewTeam = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [searchStaff, setSearchStaff] = useState("");
  const [searchStaffType, setSearchStaffType] = useState("");
  const [players, setPlayers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const player = location.state?.selectedTeam;
    if (player) {
      setTeamData(player);
      setIsEditMode(true);
    }
  }, []);

  const [teamData, setTeamData] = useState({
    nombre: "",
    categoria: "",
    jugadores: [],
    staff: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Realizar la llamada a la API para obtener el staff
    getStaff()
      .then((data) => {
        // Actualizar el estado con los datos del staff
        setStaff(data);
      })
      .catch((error) => {
        console.error("Error fetching staff:", error);
      });
  }, []);

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
      jugadores: selectedPlayers,
      staff: selectedStaff,
    };
    try {
      let response;
      let alertMessage;
      if (isEditMode) {
        response = await putTeam(teamDataWithPlayers);
        alertMessage = "¡Equipo modificado correctamente!";
      } else {
        response = await postTeam(teamDataWithPlayers);
        alertMessage = "¡Equipo registrado correctamente!";
      }
      navigate("/teams", {
        state: { alert: { alertMessage } },
      });
    } catch (error) {
      console.error(error);
    }
    console.log(teamDataWithPlayers);
  };

  const handlePlayerSelection = (player, isSelected) => {
    if (isSelected) {
      setSelectedPlayers([...selectedPlayers, player]);
    } else {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
    }
  };

  const handleStaffSelection = (member, isSelected) => {
    if (isSelected) {
      setSelectedStaff([...selectedStaff, member]);
    } else {
      setSelectedStaff(selectedStaff.filter((m) => m.id !== member.id));
    }
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
                type="select"
                id="CategoriaEquipo"
                name="categoria"
                value={teamData.categoria}
                onChange={handleChange}
              >
                {Object.entries(categorias).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="nombreEquipo">Nombre del equipo</Label>
              <Input
                id="nombre"
                name="nombre"
                value={teamData.nombre}
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
                          onChange={(event) =>
                            handlePlayerSelection(player, event.target.checked)
                          }
                          checked={selectedPlayers.includes(player)}
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
              placeholder="Rol"
              type="select"
              value={searchStaffType}
              onChange={handleSearchStaffType}
            >
              <option value="">Ninguno</option>
              {Object.keys(tiposStaff).map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tiposStaff[tipo]}
                </option>
              ))}
            </Input>
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
                    (!searchStaff || member.nombre.includes(searchStaff)) &&
                    (!searchStaffType ||
                      searchStaffType === "Ninguno" ||
                      member.rol === searchStaffType)
                )
                .map((member, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{member.nombre}</td>
                    <td>{tiposStaff[member.rol]}</td>
                    <td>
                      <Input
                        type="checkbox"
                        onChange={(event) =>
                          handleStaffSelection(member, event.target.checked)
                        }
                        checked={selectedStaff.includes(member)}
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
