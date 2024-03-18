const Store = require('../models/storeModel')

class StoreController {
    getAll(){
        return Store.find();
    }

    getStoreByUser(userId){
        return Store.findOne({userId: userId});
    }

    save(body, imageFile){
        body = {...body, image: imageFile.destination + imageFile.filename}
        return new Store(body).save();
    }
}

module.exports = new StoreController();