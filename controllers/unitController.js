
const db = require('../models/db');

const createUnit = async (req, res) => {
  try {
    const { unit_name, unit_number } = req.body;
    const sql = 'INSERT INTO unit (unit_name, unit_number) VALUES (?, ?)';
    
    const result = await db.queryAsync(sql, [unit_name, unit_number]);
    res.status(201).json({ message: 'Unit created successfully', id: result.insertId });
  } catch (error) {
    console.error('Error creating unit:', error);
    res.status(500).json({ error: 'Error creating unit' });
  }
};

const getAllUnits = async (req, res) => {
  try {
    const sql = 'SELECT * FROM unit';
    const results = await db.queryAsync(sql);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching units:', error);
    res.status(500).json({ error: 'Error fetching units' });
  }
};

const getUnitById = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = 'SELECT * FROM unit WHERE id = ?';
    const result = await db.queryAsync(sql, [id]);

    if (result.length === 0) {
      res.status(404).json({ error: 'Unit not found' });
    } else {
      res.status(200).json(result[0]);
    }
  } catch (error) {
    console.error('Error fetching unit:', error);
    res.status(500).json({ error: 'Error fetching unit' });
  }
};

const updateUnit = async (req, res) => {
  const { id } = req.params;
  const { unit_name, unit_number } = req.body;
  try {
    const sql = 'UPDATE unit SET unit_name = ?, unit_number = ? WHERE id = ?';
    const result = await db.queryAsync(sql, [unit_name, unit_number, id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Unit not found' });
    } else {
      res.status(200).json({ message: 'Unit updated successfully' });
    }
  } catch (error) {
    console.error('Error updating unit:', error);
    res.status(500).json({ error: 'Error updating unit' });
  }
};

const deleteUnit = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = 'DELETE FROM unit WHERE id = ?';
    const result = await db.queryAsync(sql, [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Unit not found' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error('Error deleting unit:', error);
    res.status(500).json({ error: 'Error deleting unit' });
  }
};

module.exports = {
  createUnit,
  getAllUnits,
  getUnitById,
  updateUnit,
  deleteUnit
};
