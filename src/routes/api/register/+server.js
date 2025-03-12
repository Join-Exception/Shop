// @ts-nocheck
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

/**
 * @param {import('@sveltejs/kit').RequestEvent} event
 */
export async function POST({ request }) {
    try {
        const { email, password, firstname, lastname } = await request.json();

        export const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        const [existingUsers] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUsers.length > 0) {
            return new Response(
                JSON.stringify({ error: 'Email is already taken' }),
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            'INSERT INTO users (email, password, firstname, lastname) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, firstname, lastname]
        );

        const token = jwt.sign(
            { userId: result.insertId, email },
            'Dario.2009', 
            { expiresIn: '1h' }
        );

        return new Response(
            JSON.stringify({ message: 'Registration successful', token }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Error registering user:", err);
        return new Response(
            JSON.stringify({ error: 'Error registering, please try again later' }),
            { status: 500 }
        );
    }
}
