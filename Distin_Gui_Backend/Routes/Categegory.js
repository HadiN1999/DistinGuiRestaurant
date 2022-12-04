const express = require('express');
const { 
    createCategory,
    createItem,
    deleteCategory,
    getCategories,
    getItems,
    reorderCategory,
    reorderItem,
    updateCategory,
    login,
    deleteItem,
    updateItem } 
    = 
    require("../Controller/Category/Category")
const router = express.Router();

router.route('/login').post(login);
router.route('/createCategory').post(createCategory);
router.route('/createItem/:categoryID').post(createItem);
router.route('/deleteCategory/:categoryID').delete(deleteCategory);
router.route('/deleteItem/:categoryID/:itemID').delete(deleteItem);
router.route('/fetchCategory').get(getCategories);
router.route('/fetchCategory/:categoryID').get(getItems);
router.route('/reorderCategory').patch(reorderCategory);
router.route('/reorderItem/:categoryID').patch(reorderItem);
router.route('/updateCategory/:categoryID').put(updateCategory);
router.route('/updateItem/:itemID').put(updateItem);


module.exports = router;