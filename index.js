const ApiURL = "https://guess-it-neon.vercel.app/api/users";
// const ApiURL = "http://localhost:3000/api/users";
const button = document.getElementById('myButton'); 
const answers_container = document.getElementById('answers-container');
const list = document.getElementById("users");
const inputText = document.getElementById('myInput');

const users = [];
let randomUser;
let caracteristicas = {};
let numCharacteristicas = 0;

fetch(ApiURL)
  .then((res) => res.json())
  .then((data) => {

    data.forEach((user) => {

      caracteristicas = { nome: user.nome, beleza: user.beleza, altura: user.altura, vibe: user.vibe, 
                          corpo: user.corpo, socializacao: user.socializacao, ocupacao: user.ocupacao, grupo: user.grupo};
      users.push(caracteristicas);

      numCharacteristicas = Object.values(caracteristicas).length;
      
      const li = document.createElement("li");
      li.textContent = `${user.nome}`;
      list.appendChild(li);
    });

    const randomIndex = Math.floor(Math.random() * users.length);
    randomUser = users[randomIndex];

  })
  .catch((err) => console.error("Error fetching users:", err));

function autoShrinkText(containerSelector, textSelector){
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach(container => {
    const texts = container.querySelectorAll(textSelector);

    texts.forEach(text => {
      let fontSize = 16;
      text.style.fontSize = fontSize + 'px';
      
      // Shrink until it fits — no min cap
      while (text.scrollWidth > 80 || text.scrollHeight > 80) {
        fontSize--;
        text.style.fontSize = fontSize + 'px';
      }
    });
  });
};

button.addEventListener('click', () => {

  users.forEach(person => {

    if (person.nome == inputText.value){
      const newAnswer = document.createElement('div');
      newAnswer.classList.add('newAnswer');

      for(let i = 0; i < numCharacteristicas; i++){

        const caracteristicaPessoa = Object.values(person)[i];
        const caracteristicaRandom = Object.values(randomUser)[i];

        const newCharacteristic = document.createElement('div');
        newCharacteristic.classList.add('newCharacteristic');
        newCharacteristic.textContent = caracteristicaPessoa;

        if (caracteristicaPessoa == person.vibe){
          newCharacteristic.textContent = caracteristicaPessoa.join(', ');

          caracteristicaPessoa.forEach(caracteri => {
            if(caracteristicaRandom.includes(caracteri)){
              newCharacteristic.classList.add('contem');
            }

          });

        }

        if (caracteristicaPessoa == person.altura){
          if (caracteristicaPessoa > caracteristicaRandom){
            newCharacteristic.textContent = caracteristicaPessoa + ' ↓';
          }
          else if (caracteristicaPessoa < caracteristicaRandom){
            newCharacteristic.textContent = caracteristicaPessoa + ' ↑';
          }
          else{
            newCharacteristic.textContent = caracteristicaPessoa; 
          }

        }

        if(caracteristicaPessoa == caracteristicaRandom){
          newCharacteristic.classList.remove('contem');
          newCharacteristic.classList.add('certo');
        };

        newAnswer.appendChild(newCharacteristic);
      }
  
      answers_container.appendChild(newAnswer);
      autoShrinkText('.newAnswer', '.newCharacteristic');

    }
  });

  if (inputText.value == randomUser.nome){
    const winner = document.createElement('p');
    winner.classList.add('ganhador');
    winner.textContent = `GANHASTE!! Era o ${randomUser.nome}`;
    answers_container.appendChild(winner);
  }

  inputText.value = "";

});