import { initAutoComplete, submitAnswer } from './utils/events.js';
import { fetchUsers } from './api.js';

fetchUsers().then(data => {
  
  const users = data
  const randomIndex = Math.floor(Math.random() * users.length);
  const randomUser = users[randomIndex];

  //events
  initAutoComplete(users, randomUser);
  submitAnswer(users, randomUser);

});
