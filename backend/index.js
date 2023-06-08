const express = require('express');
const cors = require('cors');
require('./db/config');
const Product = require('./db/product')

const app = express()

app.use(express.json());
app.use(cors());



const multer = require('multer');

// upload file on local
const storage = multer.diskStorage({
    destination: '../frontend/public/uploads',
    filename: (req, file, cb) => {
        console.log("File" , file)
     
      const filename = file.originalname;
      cb(null, filename);
    }
  });

const upload = multer({
    storage: storage,
    
  });
  
  app.post('/register', upload.single('image'), async (req, res) => {
    try {
        console.log("req",req.file)

        const sku = req.body.sku
        const image = `uploads/${req.file.originalname}`
        const name = req.body.name
        const price = req.body.price
        const model = req.body.model
        const manufacturer = req.body.manufacturer
        console.log(image)

        const product ={sku,image,name,price,model,manufacturer};
      console.log(req.file)
      const result = await Product.insertMany(product);
  
      res.redirect('http://localhost:3000/add');
    } catch (error) {
      console.log(error);
    }
  });


// app.post('/register',async(req,res)=>{
//     try {
//         const product = req.body;
//         const result = await Product.insertMany(product);
//         res.send(result)
        
//     } catch (error) {
//         console.log(error)
//     }
// })

app.get('/list',async(req,res)=>{
    try {
        const product = await Product.find();
        res.send(product)
    } catch (error) {
        console.log(error)
    }
});


app.delete('/delete/:id',async(req,res)=>{
    console.log( req.params.id)
   try {
    const product = await Product.deleteOne({ _id: req.params.id })
    res.send(product)
   } catch (error) {
    console.log(error)
   }

})




app.get('/update/:id',async(req,res)=>{
    console.log( req.params.id)
   try {
    const product = await Product.findOne({ _id: req.params.id })
   if(product){
    res.send(product)
   }else{
    res.send("Sorry!")
   }
   } catch (error) {
    console.log(error)
   }

})




app.put('/update/:id',async(req,res)=>{
    // console.log(req.body)
    // console.log( req.params.id)
   try {
    const product = await Product.updateOne(
        { _id : req.params.id },
        { $set : req.body}
        )
   res.send(product)
   } catch (error) {
    console.log(error)
   }

})




app.listen(4000)
