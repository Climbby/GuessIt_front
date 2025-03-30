const ApiURL = "https://guess-it-neon.vercel.app/api";

export async function fetchUsers(table) {
  const endpoint = `${ApiURL}/tableApi`;
  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table })
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => {
      console.log("Could not fetch users:", error);
      return [];   
    });
}

export async function generateDailyUser(users) {
  const endpoint = `${ApiURL}/randomUser`;
  return fetch(endpoint)
  .then(res => res.json())
  .then(data => {
    const index = data.index % users.length;
    return users[index]
  })
  .catch(error => {
    console.log("Could not fetch random user:", error);
    return null;
  });
}