const User = require('../models/user');
const Cart = require('../models/cart');


// Method to find or create the active cart
function findOrCreateActiveCart(id_user) {
    var nbUsers = await User.countDocuments({_id : id_user}).exec()

    if(nbUsers == 1) {
        const cart = await Cart.findOneAndUpdate({id_user: id_user, active: true},
            {active: true, id_user: id_user}, {upsert: true})
    }



}