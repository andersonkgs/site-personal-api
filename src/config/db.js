const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const initDatabase = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS experiencias (
            id SERIAL PRIMARY KEY,
            tipo VARCHAR(255) NOT NULL,
            titulo VARCHAR(255) NOT NULL,
            descricao TEXT NOT NULL,
            local VARCHAR(255) NOT NULL,
            "dataInicio" VARCHAR(255) NOT NULL,
            "dataFim" VARCHAR(255) NOT NULL
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS portfolio (
            id SERIAL PRIMARY KEY,
            link VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS informacoes (
            id INT PRIMARY KEY,
            foto VARCHAR(255) NOT NULL,
            nome VARCHAR(255) NOT NULL,
            cargo VARCHAR(255) NOT NULL,
            sobre TEXT NOT NULL            
        );
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL            
        );
    `);

    console.log('Banco de dados inicializado com sucesso!');
}

module.exports = { pool, initDatabase };
