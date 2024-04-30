import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import Players from "./components/Players";
import Teams from "./components/Teams";
import Satff from "./components/Staff";
import Login from "./components/Login";
import FormNewPlayer from "./components/FormNewPlayer";
import FormNewTeam from "./components/FormNewTeam";
import FormNewStaff from "./components/FormNewStaff";
import {UserContextProvider} from "./context/UserContext";

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <UserContextProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
            <Route path="/players" element={<Players />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/staff" element={<Satff />} />
            <Route path="/addplayer" element={<FormNewPlayer />} />
            <Route path="/addteam" element={<FormNewTeam />} />
            <Route path="/addstaff" element={<FormNewStaff />} />
            <Route path="/editplayer" element={<FormNewPlayer />} />
            <Route path="/editteam" element={<FormNewTeam />} />
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
    </UserContextProvider>
  );
}

export default App;
