const { pool } = require('../config/db');

exports.getAllExperiencias = async (tipo) => {
    let query = 'SELECT * FROM experiencias';

    if (tipo) {
        query += ` WHERE tipo = '${tipo}'`;
    }
    
    const result = await pool.query(query);
    return result.rows;
};

exports.getExperienciaById = async (id) => {
    const result = await pool.query('SELECT * FROM experiencias WHERE id = $1', [id]);
    return result.rows[0];
};

exports.createExperiencia = async (experiencia) => {
    const result = await pool.query(`
        INSERT INTO experiencias (tipo, titulo, descricao, local, "dataInicio", "dataFim")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `, [experiencia.tipo, experiencia.titulo, experiencia.descricao, experiencia.local, experiencia.dataInicio, experiencia.dataFim]);
    return result.rows[0];
};

exports.updateExperiencia = async (id, experiencia) => {
    const result = await pool.query(`
        UPDATE experiencias
        SET tipo = $1, titulo = $2, descricao = $3, local = $4, "dataInicio" = $5, "dataFim" = $6
        WHERE id = $7
        RETURNING *
    `, [experiencia.tipo, experiencia.titulo, experiencia.descricao, experiencia.local, experiencia.dataInicio, experiencia.dataFim, id]);
    return result.rows[0];
};

exports.deleteExperiencia = async (id) => {
    await pool.query('DELETE FROM experiencias WHERE id = $1', [id]);
};
