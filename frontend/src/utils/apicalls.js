import API from './api';
export  {
    getPlayers, 
    getSinglePlayer, 
    getTeams,
    getSingleTeam, 
    getStaff,
    getSingleStaff,
    postPlayer,
    postTeam,
    postStaff,
    putPlayer,
    putTeam,
    putStaff,
    deletePlayer,
    deleteTeam,
    deleteStaff
};
function getPlayers(){
    return API.get('/jugadores').then(res => res.data);
}

function getSinglePlayer(id){
    return API.get(`/jugadores/${id}`).then(res => res.data);
}

function getTeams(){
    return API.get('/equipos').then(res => res.data);
}

function getSingleTeam(id){
    return API.get(`/equipos/${id}`).then(res => res.data);
}

function getStaff(){
    return API.get('/staff').then(res => res.data);
}

function getSingleStaff(id){
    return API.get(`/staff/${id}`).then(res => res.data);
}

function postPlayer(data){
    return API.post('/jugadores', data).then(res => res.data);
}

function postTeam(data){
    return API.post('/equipos', data).then(res => res.data);
}

function postStaff(data){
    return API.post('/staff', data).then(res => res.data);
}

function putPlayer(data){
    return API.put(`/jugadores/${data.id}`, data).then(res => res.data);
}

function putTeam(data){
    return API.put(`/equipos/${data.id}`, data).then(res => res.data);
}

function putStaff(data){
    return API.put(`/staff/${data.id}`, data).then(res => res.data);
}

function deletePlayer(id){
    return API.delete(`/jugadores/${id}`).then(res => res.data);
}

function deleteTeam(id){
    return API.delete(`/equipos/${id}`).then(res => res.data);
}

function deleteStaff(id){
    return API.delete(`/staff/${id}`).then(res => res.data);
}

