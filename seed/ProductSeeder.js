var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping');


var products = [
    new Product({
        imagePath: 'https://media.gettyimages.com/photos/dhoni-of-india-celebrates-his-century-during-' +
        'the-2011-icc-world-cup-picture-id109175269?s=612x612',
        title: 'Dhoni Wallpaper',
        description: 'Captain Cool!',
        price: 20
    }),

    new Product({
        imagePath: 'http://shfcs.org/en/wp-content/uploads/2015/11/MedRes_Product-presentation-2.jpg',
        title: 'Rubics Cube',
        description: 'Brand new colourful rubics cube',
        price: 7
    }),

    new Product({
        imagePath: 'https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg',
        title: 'Cooking Vessels',
        description: 'Set of 6 cokking vessels',
        price: 15
    }),

    new Product({
        imagePath: 'http://oneeyevisionphotography.com/wp-content/uploads/2017/03/One-Eye-Vision-Professional-Editorial-Sports-Food-Product-Photography-commercial-branding-photos-Ahmedabad-Gujarat-India-5.jpg',
        title: 'Adidas perfume',
        description: 'La lola perfume fragrant',
        price: 12
    }), 

    new Product({
        imagePath: 'https://www.gannett-cdn.com/-mm-/d37358aa1fa2d85e468c0413c964cf7d3e333810/c=0-120-1224-812&r=1280x720/local/-/media/2018/04/13/USATODAY/USATODAY/636592215455207223-VPC-DESKTOP-MAYOCHUP.jpg?quality=10',
        title: 'Ketchup',
        description: 'Pack of 3 ketchups',
        price: 8
    }),

    new Product({
        imagePath: 'https://pcbonlineshop.com/photos/product/2/174/2.jpg',
        title: 'Shoes',
        description: 'Converse black shoes',
        price: 25
    })



];

var done = 0;
for(var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
