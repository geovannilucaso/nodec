const express = require('express');
const car = require('../models/cars');

const router = express.Router();


router.get('/',async (req, res)=>{
    const cars = await car.find();
    res.json(cars);
});

router.get('/:id',async (req, res)=>{
    const c = await car.findById(req.params.id);
    console.log(c);
      res.json(c);
});

router.post('/', async (req, res)=>{
    const {description, make,  model, estimatedate,  id,  image, km, maintenance, person} = req.body;
    const c = new car ({description, make,  model, estimatedate,  id,  image, km, maintenance,person});
    await c.save();
    res.json({status:'Car Saved'});
});

router.put('/:id',async (req, res)=>{
    const {description, make,  model, estimatedate,  id,  image, km, maintenance,person} = req.body;
    const newCar = {description, make,  model, estimatedate,  id,  image, km, maintenance,person};

    console.log(newCar);
    console.log("Mainddd:"+maintenance);
    await car.findByIdAndUpdate(req.params.id, newCar,{useFindAndModify: false} );

    res.json({status:"Car Updated"});
});
router.delete('/:id',async (req, res)=>{
    await car.findByIdAndDelete(req.params.id);

    res.json({status:"Car Deleted"});
});



module.exports = router;