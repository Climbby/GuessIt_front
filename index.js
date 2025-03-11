fetch("https://guess-it-neon.vercel.app/api/users")
  .then((res) => res.json())
  .then((data) => {
    console.log("Users from database:", data);
    // Display them in HTML (example):
    const list = document.getElementById("users");
    data.forEach((user) => {
      console.log("user.id:", user.id);
      console.log("user.name:", user.name);
      const li = document.createElement("li");
      li.textContent = `ID: ${user.id} | Username: ${user.name}`;
      list.appendChild(li);
    });
  })
  .catch((err) => console.error("Error fetching users:", err));