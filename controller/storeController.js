const Store = require('../models/storeModel');
const Item = require('../controller/itemController');
const deleteImage = require('../util/utilMatters');

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

    async update(id, body, imageFile){
        const prevStore = await Store.findById(id);
        body = {...body, image: imageFile.destination + imageFile.filename}
        return Store.findByIdAndUpdate(id, body).then(data => {
            deleteImage(prevStore.image);
            return data;
        });
    }

    async delete(id){
        // set availability to false for store items
        await Item.inactiveItemsByStoreId(id);
        return Store.findByIdAndDelete(id);
    }
}

module.exports = new StoreController();