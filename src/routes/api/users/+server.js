import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export async function GET() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
  });

    const [rows] = await db.execute("SELECT * FROM users");
    await db.end();

    return new Response(JSON.stringify(rows), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // @ts-ignore
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
