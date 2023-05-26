const { pool } = require('../config/db');

exports.getPortfolio = async () => {
    const result = await pool.query('SELECT * FROM portfolio');
    return result.rows;
};

exports.getProjetoById = async (id) => {
    const result = await pool.query('SELECT * FROM portfolio WHERE id = $1', [id]);
    return result.rows[0];
};

exports.createProjeto = async (projeto) => {
    const result = await pool.query(`
    INSERT INTO portfolio (link, image, description)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [projeto.link, projeto.image, projeto.description]);
    return result.rows[0];
};

exports.updateProjeto = async (id, projeto) => {
    const result = await pool.query(`
    UPDATE portfolio
    SET link = $1, image = $2, description = $3
    WHERE id = $4
    RETURNING *
    `, [projeto.link, projeto.image, projeto.description, id]);
    return result.rows[0];
};

exports.deleteProjeto = async (id) => {
    await pool.query('DELETE FROM portfolio WHERE id = $1', [id]);
};
