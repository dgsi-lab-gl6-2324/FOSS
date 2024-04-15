import API from './api';
export  {
    getPlayers, 
    getSinglePlayer, 
    getTeams,
    getSingleTeam, 
    postPlayer,
    postTeam,
};
function getPlayers(){
    return API.get('/players').then(res => res.data);
}

function getSinglePlayer(id){
    return API.get(`/players/${id}`).then(res => res.data);
}

function getTeams(){
    return API.get('/teams').then(res => res.data);
}

function getSingleTeam(id){
    return API.get(`/teams/${id}`).then(res => res.data);
}

function postPlayer(data){
    return API.post('/addplayer', data).then(res => res.data);
}

function postTeam(data){
    return API.post('/addteam', data).then(res => res.data);
}
