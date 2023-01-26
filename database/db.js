const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  mongoose.set('strictQuery',true);
  await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE},`,{useNewUrlParser: true});
}

module.exports = mongoose;