const Item = require('../models/itemModel');
const Cart = require('../controller/cartController');
const deleteImage = require('../util/utilMatters');

class ItemModel {
    getAll(){
        return Item.find({isActive: true, stock: { $gte: 1}});
    }

    getItem(id){
        return Item.findById(id).populate('store', 'name');
    }

    getDiscounts() {
        return Item.find({ discount: { $gte: 20 }, stock: { $gte: 1} , isActive: true});
    }

    getStoreItems(storeId){
        return Item.find({store: storeId});
    }

    save(body, imageFile){
        body = {...body, image: imageFile.filename}
        return new Item(body).save();
    }

    async update(itemId, body, imageFile){
        const prevItem = await Item.findById(itemId);
        body = {...body, image: imageFile.filename}
        return Item.findByIdAndUpdate(itemId, body).then(data => {
            deleteImage(prevItem.image);
            return data;
        })
    }

    inactiveItemsByStoreId(storeId){
        return Item.updateMany({store: storeId}, {$set: {isActive: false}});
    }

    setItemActive(itemId){
        return Item.findById(itemId).then(data => {
            return Item.updateOne({_id: itemId}, { $set: {isActive: !data.isActive }});
        })
    }

    setItemsActiveAll(){
        return Item.updateMany({isActive: false}, {$set: {isActive: true}});
    }

    delete(itemId){
        return Cart.removeItemFromAllCarts(itemId).then(data => {
            return Item.findById(itemId).then(item => {
                deleteImage(item.image);
                return Item.findByIdAndDelete(itemId);
            });
        })
    }
}

module.exports = new ItemModel();