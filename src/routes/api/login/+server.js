// @ts-nocheck
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import jsonwebtoken
import dotenv from "dotenv";

/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
export async function POST({ request }) {
    try {
        const { email, password } = await request.json();

        export const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return new Response(
                JSON.stringify({ error: 'Invalid email or password' }),
                { status: 400 }
            );
        }

        const user = rows[0]; 
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return new Response(
                JSON.stringify({ error: 'Invalid email or password' }),
                { status: 400 }
            );
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'Dario.2009', 
            { expiresIn: '1h' } 
        );

        return new Response(
            JSON.stringify({ message: 'Login successful', token }), // Include the token
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Error logging in user:", err);
        return new Response(
            JSON.stringify({ error: 'Error logging in, please try again later' }),
            { status: 500 }
        );
    }
}
