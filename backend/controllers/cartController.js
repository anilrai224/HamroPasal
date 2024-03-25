const Cart = require('../models/Cart');
const User = require('../models/userModel');

const cartItems = async(req,res)=>{
    try {
        const userId = req?.body?.userId;
        const cartItems = await Cart.findOne({userId:userId})
        
        if(!cartItems){
            return res.json({message:'Cart is Empty!!',success:false})
        }
        return res.status(200).json({items:cartItems.items,success:true})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const addToCart = async (req, res) => {
    try {
        const { productId, qty, productPrice } = req.body;
        const userId = req.body.userId;

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found!!', success: false });
        }

        let existingCartItem = await Cart.findOne({ userId: userId });
        if (existingCartItem) {
            const itemToUpdate = existingCartItem.items.find(item => item.productId.equals(productId));
            if(itemToUpdate){
                itemToUpdate.quantity+=qty;
                itemToUpdate.price = productPrice;
            }else{
                existingCartItem.items.push({
                    productId:productId,
                    price:productPrice,
                    quantity:qty,
                })
            }
        } else {
            existingCartItem = new Cart({
                userId,
                items: [{
                    productId,
                    price: productPrice,
                    quantity: qty,
                }]
            });
        }

        await existingCartItem.save();

        res.status(200).json(existingCartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeFromCart = async(req,res)=>{
    try {
        const { productId } = req.body;
        const userId = req.body.userId;

        const itemInCart = await Cart.findOne({ userId: userId });
        if (!itemInCart) {
            return res.status(404).json({ message: 'Cart is Empty!!', success: false });
        }
        itemInCart.items = itemInCart.items.filter((item)=>item.productId!=productId);
        await itemInCart.save();
        return res.status(200).json(itemInCart.items)
        // const index = itemInCart.items.findIndex(item => item.productId.equals(productId));
        // if (index !== -1) {
        //     if (itemInCart.items[index].quantity > 0) {
        //         itemInCart.items[index].quantity -= 1;
        //     }
        //     if (itemInCart.items[index].quantity === 0) {
        //         itemInCart.items.splice(index, 1);
        //     }
        //     await itemInCart.save();
        //     return res.status(200).json({ message: 'Product Removed Successfully!!', success: true });
        // } else {
        //     return res.status(404).json({ message: 'Product not found in the cart!!', success: false });
        // }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { addToCart,removeFromCart,cartItems };
