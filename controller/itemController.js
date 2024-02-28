const Item = require('../models/itemModel')

class ItemModel {
    getAll(){
        return Item.find();
    }

    save(item){
        return new Item(item).save();
    }

    getSaleItems(){
        return 
    }
}

module.exports = new ItemModel();