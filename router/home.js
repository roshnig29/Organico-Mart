//const { Router } = require('express');
const express=require('express');
const Router =express.Router();
const homeSchema=require('../models/homeSchema')
const farmerschema=require('../models/farmerSchema')
const Item=require('../models/itemSchema')
Router.get('/',(err,res)=>{
    res.render('choice',{title:'Fill Form',password:'',email:''})
})
Router.get('/cart',(err,res)=>{
    res.render('cart',{title:'Fill Form',password:'',email:''})
})
Router.post('/cart', async (req, res) => {
    var { list } = req.body;
    list = JSON.parse(list)
    const items = await Item.find({ _id: { $in: list } });
    res.render('cart', {items});
});
Router.post('/payment', async (req, res) => {
    var { total } = req.body;
    total = JSON.parse(total)
    res.render('payment', {total});
});
Router.get('/payment', async (req, res) => {
    res.render('ordered', {});
});
Router.post('/rating', async (req, res) => {
    const items = await Item.find();
    // handle store rating here
    res.render('index', {items});
});
Router.get('/login', async (req, res) => {
    const items = await Item.find();
    // handle store rating here
    res.render('index', {items});
});
Router.get('/farmer',(err,res)=>{
    res.render('farmer',{title:'Fill Form',password:'',email:''})
})
Router.get('/customer',(err,res)=>{
    res.render('register',{title:'Fill Form',password:'',email:''})
})
Router.get('/main',(err,res)=>{
    res.render('main',{title:'Fill Form',password:'',email:''})
})
Router.post('/register',async(req,res)=>{
    try{
        const{
            name,
            email,
            password
        }=req.body;
        //console.log(name);
        const userData= new homeSchema({
            name,
            email,
            password 
        })
        userData.save(err=>{
            if(err)
            {
                console.log('Error')
            }
            else{
                res.render('register',{title:'Done',password:'',email:''})
            }
        })
    }catch(error){
        res.render('register',{title:'Error Form',password:'',email:''});
    }
})
//sign-in
Router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const result = await homeSchema.findOne({ email: email });
        if (result && result.password === password) {
            // Fetch items from the MongoDB collection
            const items = await Item.find();
            
            // Render the cart.ejs template with the items data
            res.render('index', { items });
        } else {
            res.send('Invalid email'); // or handle the mismatched email
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

Router.post('/f_register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userData = new farmerschema({
            name,
            email,
            password
        });

        await userData.save();

        res.render('register', { title: 'Done', password: '', email: '' });
    } catch (error) {
        console.error(error);
        res.render('register', { title: 'Error Form', password: '', email: '' });
    }
});

//sign-in
Router.post('/f_login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await farmerschema.findOne({ email: email });

        if (result && result.email === email) {
            // Fetch items from the MongoDB collection
            const items = await Item.find();

            // Render the dashboard.ejs template with the items data
            res.render('dashboard', { items });
        } else {
            res.send('Invalid email'); // or handle the mismatched email
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
Router.get('/addItem', async (req, res) =>{
    res.render('addItem',{})
})
Router.post('/addItem', async (req, res) => {
    try {
        const { title, src, desc, price, quantity } = req.body;
        // Convert price to float and quantity to integer
        const parsedPrice = parseFloat(price);
        const parsedQuantity = parseInt(quantity);

        // Create a new item object
        const newItem = new Item({
            title,
            src,
            desc,
            price: parsedPrice,
            quantity: parsedQuantity
        });

        await newItem.save();

        res.status(201).json({ message: 'Item added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add item' });
    }
});
Router.post('/updateItem', async (req, res) => {
    try {
        const { itemId, newPrice, quantityToAdd } = req.body;

        // Find the item by ID
        const itemToUpdate = await Item.findById(itemId);

        if (!itemToUpdate) {
            return res.status(404).send('Item not found');
        }

        // Increment quantity and update price
        itemToUpdate.quantity += parseInt(quantityToAdd, 10);
        itemToUpdate.price = parseFloat(newPrice);

        // Save the updated item
        await itemToUpdate.save();

        // Redirect back to the dashboard or handle as needed
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
Router.get('/dashboard', async (req, res) => {
    try {
        // Fetch items from the MongoDB collection
        const items = await Item.find();

        // Render the dashboard.ejs template with the items data
        res.render('dashboard', { title: 'Dashboard', items });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports=Router;