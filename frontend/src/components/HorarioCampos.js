import CalendarioHorarios from "./CalendarioHorarios";
import { Button } from "reactstrap";

const HorarioCampos = ({ horario, setHorario }) => {
  return (
    <div>
      <h1 className="text-center mb-4">Horario de Campos</h1>
      <CalendarioHorarios />
      
      <div className="d-flex justify-content-center">
        <Button className="m-4 me-4" color="success">Agregar entreno</Button>
        <Button className="m-4 ms-4" color="danger ">Eliminar entreno</Button>
      </div>
    </div>
  );
};

export default HorarioCampos;