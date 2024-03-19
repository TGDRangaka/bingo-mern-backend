const Item = require('../models/itemModel')

class ItemModel {
    getAll(){
        return Item.find({isActive: true});
    }

    getItem(id){
        return Item.findById(id).populate('store', 'name');
    }

    save(body, imageFile){
        body = {...body, image: imageFile.filename}
        return new Item(body).save();
    }

    getDiscounts() {
        return Item.find({ discount: { $gte: 20 }, isActive: true});
    }

    inactiveItemsByStoreId(storeId){
        return Item.updateMany({store: storeId, isActive: false});
    }

    setItemsActive(){
        return Item.updateMany({isActive: true});
    }
}

module.exports = new ItemModel();