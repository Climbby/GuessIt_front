import { fetchUsers } from './api.js';
import { list } from './domElements.js';
import { setupGame } from './gameLogic.js';

let users = [];
let randomUser = null;
let numCharacteristicas = 0;

fetchUsers().then(data => {
  data.forEach(user => {
    const caracteristicas = {
      nome: user.nome,
      beleza: user.beleza,
      altura: user.altura,
      vibe: user.vibe,
      corpo: user.corpo,
      socializacao: user.socializacao,
      ocupacao: user.ocupacao,
      grupo: user.grupo,
    };

    users.push(caracteristicas);
    const li = document.createElement('li');
    li.textContent = user.nome;
    list.appendChild(li);
  });

  numCharacteristicas = Object.values(users[0]).length;
  const randomIndex = Math.floor(Math.random() * users.length);
  randomUser = users[randomIndex];

  setupGame(users, randomUser, numCharacteristicas);
});
