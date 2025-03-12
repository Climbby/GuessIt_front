const users = [];
const button = document.getElementById('myButton');
const container = document.getElementById('container');

fetch("https://guess-it-neon.vercel.app/api/users")
  .then((res) => res.json())
  .then((data) => {

    const list = document.getElementById("users");

    data.forEach((user) => {
      const caracteristicas = [user.nome, user.idade, user.beleza, user.altura, user.vibe, user.corpo, user.socializacao, user.ocupacao, user.grupo];
      users.push(caracteristicas);
      const li = document.createElement("li");
      li.textContent = `${user.nome}`;
      list.appendChild(li);

      // console.log(`${user.nome}: ${user.idade} anos, beleza ${user.beleza}, ${user.altura}cm, vibe: ${user.vibe}, ${user.corpo}, ${user.socializacao}, ${user.ocupacao}, ${user.grupo}`);

    });
  })
  .catch((err) => console.error("Error fetching users:", err));

console.log("Button is:", button);
const randomUser = users[Math.floor(Math.random() * users.length)];
console.log(randomUser);
console.log(randomUser[0]);

button.addEventListener('click', () => {

  const inputText = document.getElementById('myInput').value;

  users.forEach(nome => {
    if (nome[0] == inputText){
      const newParagraph = document.createElement('p');
      newParagraph.textContent = nome.join(' | ');
      container.appendChild(newParagraph);
      if(nome[3] < randomUser[3]){
        const newParagraph = document.createElement('p');
        newParagraph.textContent = `Ele é mais alto`;
        container.appendChild(newParagraph);  
      }
      if(nome[3] == randomUser[3]){
        const newParagraph = document.createElement('p');
        newParagraph.textContent = `Tem esse tamanho`;
        container.appendChild(newParagraph);
      }
      if(nome[3] > randomUser[3]){
        const newParagraph = document.createElement('p');
        newParagraph.textContent = `Ele é mais baixo`;
        container.appendChild(newParagraph); 
      }
    }
    if (nome[0] == randomUser[0]){
      const newParagraph = document.createElement('p');
      newParagraph.textContent = `GANHASTE!! Era o ${randomUser}`;
      container.appendChild(newParagraph);
    }
  });

});