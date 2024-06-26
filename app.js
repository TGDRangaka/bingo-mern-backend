const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const colors = {reset: "\x1b[0m",green: "\x1b[32m",yellow: "\x1b[33m" };

const userRoute = require('./routes/userRoute');
const itemRoute = require('./routes/itemRoute');
const cartRoute = require('./routes/cartRoute');
const storeRoute = require('./routes/storeRoute');
const orderRoute = require('./routes/orderRoute');

const app = express();
const port = 3000;
const uri = 'mongodb+srv://tgdilshanrangaka:wOuteCwo34Xolw15@cluster0.vllnh4g.mongodb.net/bingo1?retryWrites=true&w=majority&appName=Cluster0';

app.use(function(req, res, next) {
    console.log(colors.yellow + req.method + '  ' + colors.green + req.url + colors.reset);
    next();
});

app.use(cors());
app.use(express.json());

app.use('/images', express.static('./assets/images/'));
app.use('/api/user', userRoute)
app.use('/item', itemRoute)
app.use('/cart', cartRoute)
app.use('/store', storeRoute)
app.use('/order', orderRoute);


mongoose.connect(uri)
.then(()=> console.log('Connected to MongoDB'))
.catch(err => console.log('Error connecting : ' + err.message));

app.listen(port, () => console.log('Server listening on port ' + port));

const fs = require('fs');
const path = require('path');

function deleteImage(imagePath) {
    const fullPath = path.join(__dirname, 'assets', 'images', imagePath);

    // Check if the file exists
    if (fs.existsSync(fullPath)) {
        // Delete the file
        fs.unlinkSync(fullPath);
        console.log(`Image ${imagePath} deleted successfully.`);
    } else {
        console.log(`Image ${imagePath} does not exist.`);
    }
}

// deleteImage('1710759395066-sun.jpg');