import API from './api';
export  {
    getPlayers, 
    getSinglePlayer, 
    getTeams,
    getSingleTeam, 
    postPlayer,
    postTeam,
    getStaff,
    getSingleStaff,
    postStaff
};
function getPlayers(){
    return API.get('/jugadores').then(res => res.data);
}

function getSinglePlayer(id){
    return API.get(`/jugadores/${id}`).then(res => res.data);
}

function getTeams(){
    return API.get('/teams').then(res => res.data);
}

function getSingleTeam(id){
    return API.get(`/teams/${id}`).then(res => res.data);
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
    return API.post('/addteam', data).then(res => res.data);
}

function postStaff(data){
    return API.post('/addstaff', data).then(res => res.data);
}
