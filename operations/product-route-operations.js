const User = require('../models/user');
const Cart = require('../models/cart');


module.exports =   {

    findOrCreateActiveCart: async function(id_user) {
        var nbUsers = await User.countDocuments({ _id: id_user }).exec()
    
        if (nbUsers == 1) {
            const cart = await Cart.findOneAndUpdate({ id_user: id_user, active: true },
                { active: true, id_user: id_user }, { upsert: true })
        }
    },


    makeid: function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }




}
