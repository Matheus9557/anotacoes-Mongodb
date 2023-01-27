const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  mongoose.set('strictQuery',true);
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
 
}

module.exports = mongoose;