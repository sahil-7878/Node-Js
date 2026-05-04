const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const upload = require('../multerConfig');

router.get('/', bookController.getAllBooks);
router.get('/add', bookController.getAddForm);
router.post('/add', upload.single('coverImage'), bookController.addBook);
router.get('/edit/:id', bookController.getEditForm);
router.put('/edit/:id', upload.single('coverImage'), bookController.updateBook);
router.delete('/delete/:id', bookController.deleteBook);
router.get('/:id', bookController.getBook);

module.exports = router;