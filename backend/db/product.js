const mongoose = require("mongoose");

const productSchema =new mongoose.Schema({
  sku:Number,
  image:{
    type:String,
    require:true
  },
  name:String,
  price:Number,
  model:String,
  manufacturer:String,
  quantity:{
    type:Number,
    default:1
  }
});
module.exports = mongoose.model('product',productSchema)





// sku,images,name,price,model,manufacturer