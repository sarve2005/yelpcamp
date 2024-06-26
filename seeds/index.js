const mongoose = require("mongoose");
const cities = require('./cities');
const { places , descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i =0;i<300;i++){
        const random1000 = Math.floor(Math.random() *1000);
        const camp = new Campground({
            author: '6672b950fa080de9f65b7049',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/doni90vmm/image/upload/v1719072963/YelpCamp/nbkhmknp77hzqc8pq9an.jpg',
                  filename: 'YelpCamp/nbkhmknp77hzqc8pq9an'
                },
                {
                  url: 'https://res.cloudinary.com/doni90vmm/image/upload/v1719072963/YelpCamp/m8fewyd1uobet0apsewr.jpg',
                  filename: 'YelpCamp/whct3zpvi4kt1tc4jod8'
                }
              ],
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A corrupti voluptas ratione architecto minus velit facilis voluptatibus aliquid tempore consequatur numquam vitae, reiciendis voluptate! Atque vitae vel perspiciatis dolorum ipsum.',
            price: Math.floor(Math.random() *20) + 10,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            }
        });
        await camp.save();
    }
}
seedDB().then(() =>{
    db.close()
})