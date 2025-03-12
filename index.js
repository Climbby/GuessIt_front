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

button.addEventListener('click', () => {

  const inputText = document.getElementById('myInput').value;

  users.forEach(nome => {
    if (nome[0] == inputText){
      const newParagraph = document.createElement('p');
      newParagraph.textContent = inputText;
  
      container.appendChild(newParagraph);
    }
  });
});