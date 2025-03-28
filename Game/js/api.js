const table = "UGC";
const ApiURL = "https://guess-it-neon.vercel.app/api/tableApi";
// const ApiURL = "http://localhost:3000/api/tableApi";

export async function fetchUsers() {
    try {
      const res = await fetch(ApiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table })
      });

      return await res.json();
    } catch (err) {
      console.error("Error fetching users:", err);
      return [];
    }
}