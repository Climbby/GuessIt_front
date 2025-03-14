const ApiURL = "https://guess-it-neon.vercel.app/api/users";
// const ApiURL = "http://localhost:3000/api/users";

export async function fetchUsers() {
    try {
      const res = await fetch(ApiURL);
      return await res.json();
    } catch (err) {
      console.error("Error fetching users:", err);
      return [];
    }
}