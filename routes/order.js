const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const { create, listOrders,orderById,updateOrderStatus,getStatusValues } = require("../controllers/order");
const {decreaseQuantity} =require("../controllers/product");

router.post('/order/create/:userId', requireSignin, isAuth,addOrderToUserHistory,decreaseQuantity, create);

//this route get list all the products to the admin
router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders);
router.get(
    "/order/status-values/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    getStatusValues
);
router.put(
    "/order/:orderId/status/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateOrderStatus
);

router.param("userId", userById);
router.param("orderId", orderById)

module.exports = router;