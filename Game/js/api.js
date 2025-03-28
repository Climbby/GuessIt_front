const table = "databases";
const ApiURL = `https://guess-it-neon.vercel.app/api/UGC?table=${table}`;
// const ApiURL = "http://localhost:3000/api/users";

export async function fetchUsers() {

    console.log(ApiURL);

    try {
      const res = await fetch(`https://guess-it-neon.vercel.app/api/UGC?table=databases`);
      return await res.json();
    } catch (err) {
      console.error("Error fetching users:", err);
      return [];
    }
}