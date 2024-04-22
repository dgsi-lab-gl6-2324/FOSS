import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Players from "./components/Players";
import Teams from "./components/Teams";
import Satff from "./components/Staff";
import FormNewPlayer from "./components/FormNewPlayer";
import FormNewTeam from "./components/FormNewTeam";
import FormNewStaff from "./components/FormNewStaff";

function App() {
  
  const location = useLocation();
  const selectedPlayer = location.state.selectedPlayer;


  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/staff" element={<Satff />} />
          <Route path="/addplayer" element={<FormNewPlayer />} />
          <Route path="/addteam" element={<FormNewTeam />} />
          <Route path="/addstaff" element={<FormNewStaff />} />
          <Route path="/editplayer" element={<FormNewPlayer selectedPlayer={selectedPlayer} />} />
          <Route
            path="*"
            element={
              <Container>
                <h1>404 Not Found</h1>
              </Container>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
