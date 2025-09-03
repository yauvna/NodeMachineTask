const db = require('../config/db');

exports.list = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const [products] = await db.query(`
    SELECT p.id AS ProductId, p.name AS ProductName, c.id AS CategoryId, c.name AS CategoryName
    FROM products p
    LEFT JOIN categories c ON p.categoryId = c.id
    LIMIT ? OFFSET ?
  `, [limit, offset]);

  const [[{ count }]] = await db.query('SELECT COUNT(*) AS count FROM products');

  res.render('products/list', {
    products,
    currentPage: page,
    totalPages: Math.ceil(count / limit)
  });
};

exports.showCreateForm = async (req, res) => {
  const [categories] = await db.query('SELECT * FROM categories');
  res.render('products/form', { product: {}, categories });
};

exports.create = async (req, res) => {
  await db.query('INSERT INTO products (name, categoryId) VALUES (?, ?)', [
    req.body.name,
    req.body.categoryId
  ]);
  res.redirect('/products');
};

exports.showEditForm = async (req, res) => {
  const [productRows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
  const [categories] = await db.query('SELECT * FROM categories');
  res.render('products/form', { product: productRows[0], categories });
};

exports.update = async (req, res) => {
  await db.query('UPDATE products SET name = ?, categoryId = ? WHERE id = ?', [
    req.body.name,
    req.body.categoryId,
    req.params.id
  ]);
  res.redirect('/products');
};

exports.delete = async (req, res) => {
  await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
  res.redirect('/products');
};
