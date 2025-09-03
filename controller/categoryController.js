const db = require('../config/db');

exports.list = async (req, res) => {
  const [categories] = await db.query('SELECT * FROM categories');
  res.render('categories/list', { categories });
};

exports.showCreateForm = (req, res) => res.render('categories/form', { category: {} });

exports.create = async (req, res) => {
  await db.query('INSERT INTO categories (name) VALUES (?)', [req.body.name]);
  res.redirect('/categories');
};

exports.showEditForm = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
  res.render('categories/form', { category: rows[0] });
};

exports.update = async (req, res) => {
  await db.query('UPDATE categories SET name = ? WHERE id = ?', [req.body.name, req.params.id]);
  res.redirect('/categories');
};

exports.delete = async (req, res) => {
  await db.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
  res.redirect('/categories');
};
