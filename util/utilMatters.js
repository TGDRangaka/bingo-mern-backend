const fs = require('fs');
const path = require('path');

function deleteImage(imagePath) {
    const fullPath = path.join(__dirname, '..', 'assets', 'images', imagePath);
    if (fs.existsSync(fullPath)) {
        // Delete the file
        fs.unlinkSync(fullPath);
        console.log(`Image ${imagePath} deleted successfully.`);
    } else {
        console.log(`Image ${imagePath} does not exist.`);
    }
}

module.exports = deleteImage;