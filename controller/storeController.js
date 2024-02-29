const Store = require('../models/storeModel')

class StoreController {
    getAll(){
        return Store.find();
    }

    getStoreByUser(userId){
        return Store.findOne({userId: userId});
    }

    save(store){
        return new Store(store).save();
    }
}

module.exports = new StoreController();