// @ts-nocheck
import mysql from "mysql2/promise";
import dotenv from "dotenv";

/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
export async function POST({ request }) {
    try {
        const { email, name, price, color, keycaps, switches } = await request.json();

        export const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        const [result] = await db.execute(
            'INSERT INTO users (email, name, price, color, keycaps, switches) VALUES (?, ?, ?, ?, ?, ?)',
            [email, name, price, color, keycaps, switches]
        );
        
        } catch (err) {
        console.error("Error: Sending order contact support", err);
        }
    }   

