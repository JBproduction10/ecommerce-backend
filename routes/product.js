const express = require("express");
const router =  express.Router();
const {
        create,
        productById,
        read,
        remove,
        update,
        list,
        listRelated,
        listCategories,
        listBySearch,
        listSearch,
        photo}= require("../controllers/product");
const {requireSignin, isAuth, isAdmin} = require("../controllers/auth");
const {userById} = require("../controllers/user");


//return all produc route
//get all the products
router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/products/search", listSearch);
router.get("/product/photo/:productId", photo);

// get a single product
router.get("/product/:productId", read);
router.post("/product/create/:userId",requireSignin, isAdmin, isAuth,create);
// delete a product
router.delete("/product/:productId/:userId",requireSignin, isAdmin, isAuth,remove);
//update a product
router.put("/product/:productId/:userId",requireSignin, isAdmin, isAuth,update)

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;