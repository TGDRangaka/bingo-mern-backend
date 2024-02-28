const Item = require('../models/itemModel')

class ItemModel {
    getAll(){
        return Item.find();
    }

    getItem(id){
        return Item.findById(id);
    }

    save(item){
        return new Item(item).save();
    }

    getDiscounts() {
        return Item.find({ discount: { $gte: 20 } });
    }
}

module.exports = new ItemModel();