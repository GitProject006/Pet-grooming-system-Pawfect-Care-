const User = require("../models/User/UserSchema")
const  Grooming = require('../models/Admin/GroomingSchema')
const Wellness = require("../models/Admin/WellnessSchema")
const Additional = require('../models/Admin/AdditionalShema')
const Products = require('../models/Admin/ProductsSchema')

const Users = (req,res)=>{
    User.find()
    .then((user)=>{
        res.status(200).json(user)
    })
    .catch(() => {
        res.sendStatus(500)
    })
}

const userId = (req,res)=>{
    const id =req.params.id;
    User.findById({_id:id})
    .then((user)=>{
        res.status(200).json(user)
    })
    .catch(() => {
        res.sendStatus(500)
    })
}
const userEdit=(req,res)=>{
    const id =req.params.id;
    const { name, email, password } = req.body;
    User.findByIdAndUpdate(id, { name, email, password }, { new: true })
    .then(updatedUser => {
        res.json(updatedUser);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
}

const userDelete = (req,res)=>{
    let id=req.params.id;
       User.deleteOne({ _id: id })
       .then((user)=>{
        res.status(200).json(user)
         })
       .catch(() => {
        res.sendStatus(500)
       })
}

const createGroom = async (req, res) => {
    const { name, description, price, duration, includesBath, includesHairTrimming, includesNailTrimming, includesEarCleaning, includesTeethBrushing } = req.body;
    try {
        const newGroomingService = new Grooming({ name, description, price, duration, includesBath, includesHairTrimming, includesNailTrimming, includesEarCleaning, includesTeethBrushing });
        await newGroomingService.save();
        res.status(201).json(newGroomingService);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create' });
    }
}

const getGroom = (req, res) => {
    Grooming.find()
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            console.log("error in getting")
        });
} 

const getGroomId = (req, res) => {
    const id = req.params.id;
    Grooming.findById(id)
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            console.log("error in getting")
        });
}
const updateGroom = (req, res) => {
    const id = req.params.id;
    const { name, description, price, duration, includesBath, includesHairTrimming, includesNailTrimming, includesEarCleaning, includesTeethBrushing } = req.body;
    Grooming.findByIdAndUpdate(id, { name, description, price, duration, includesBath, includesHairTrimming, includesNailTrimming, includesEarCleaning, includesTeethBrushing }, { new: true })
        .then((response) => {
            res.json(response)
        })
        .catch((err) => {
            console.log("error in updating")
            res.status(500).send('Internal Server Error');
        });
}

const deleteGroom = (req, res) => {
    const { id } = req.params;
    Grooming.findByIdAndDelete(id)
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            console.log("error in getting")
        });
}

const createWellness =  (req, res) => {
    const { name, description, price, duration, nutritionCounselling, exerciseRecommendations, preventiveHealthcare, regularCheckUps, vaccinations } = req.body;
    const newService = new Wellness({ name, description, price, duration, nutritionCounselling, exerciseRecommendations, preventiveHealthcare, regularCheckUps, vaccinations });
    newService.save()
        .then((data) => {
            res.status(201).json(data);
        })
        .catch(() => {
            res.status(400).json({ error: 'Failed to create' });
        })
}

const getwellness = (req, res) => {
    Wellness.find()
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            console.log("error in getting")
        });
}

const getWellnessById = (req, res) => {
    const id = req.params.id;
    Wellness.findById(id)
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            console.log("error in getting")
        });
}

const updatewellness =  (req, res) => {
    const id = req.params.id;
    const { name, description, price, duration, nutritionCounselling, exerciseRecommendations, preventiveHealthcare, regularCheckUps, vaccinations } = req.body;
    Wellness.findByIdAndUpdate(id, { name, description, price, duration, nutritionCounselling, exerciseRecommendations, preventiveHealthcare, regularCheckUps, vaccinations }, { new: true })
        .then((response) => {
            res.json(response)
        })
        .catch((err) => {
            console.log("error in updating")
            res.status(500).send('Internal Server Error');
        });
}

const deletewellness = (req, res) => {
    const { id } = req.params;
    Wellness.findByIdAndDelete(id)
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            console.log("error in getting")
        });
}

const createAdditional = (req, res) => {
    const { name, description, price, boardingAndDaycare, trainingClasses, } = req.body;
    const newService = new Additional({ name, description, price, boardingAndDaycare, trainingClasses, });
    newService.save()
        .then((data) => {
            res.status(201).json(data);
        })
        .catch(() => {
            res.status(400).json({ error: 'Failed to create' });
        })
}

const getadditional = (req, res) => {
    Additional.find()
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            console.log("error in getting")
        });
}

const getadditionalById = (req, res) => {
    const id = req.params.id;
    Additional.findById(id)
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            console.log("error in getting")
        });
}

const updateadditional = (req, res) => {
    const id = req.params.id;
    const { name, description, price, boardingAndDaycare, trainingClasses } = req.body;
    Additional.findByIdAndUpdate(id, { name, description, price, boardingAndDaycare, trainingClasses, }, { new: true })
        .then((response) => {
            res.json(response)
        })
        .catch((err) => {
            console.log("error in updating")
            res.status(500).send('Internal Server Error');
        });
}

const deleteadditional =  (req, res) => {
    const { id } = req.params;
    Additional.findByIdAndDelete(id)
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            console.log("error in getting")
        });
}

const createProduct = (req, res) => {
    const { name, description, price, category, imageURL } = req.body;
    const newService = new Products({ name, description, price, category, imageURL });
    newService.save()
        .then((data) => {
            res.status(201).json(data);
        })
        .catch(() => {
            res.status(400).json({ error: 'Failed to create' });
        })
}

const getProduct = (req, res) => {
    Products.find()
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            console.log("error in getting")
        });
}

const getProductById = (req, res) => {
    const id = req.params.id;
    Products.findById(id)
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            console.log("error in getting")
        });
}

const updateProduct = (req, res) => {
    const id = req.params.id;
    const { name, description, price, category, imageURL } = req.body;
    Products.findByIdAndUpdate(id, { name, description, price, category, imageURL }, { new: true })
        .then((response) => {
            res.json(response)
        })
        .catch((err) => {
            console.log("error in updating")
            res.status(500).send('Internal Server Error');
        });
}

const deleteProduct = (req, res) => {
    const { id } = req.params;
    Products.findByIdAndDelete(id)
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            console.log("error in getting")
        });
}

module.exports = {Users,userId,userEdit,userDelete,
                createGroom,getGroom,getGroomId,updateGroom,deleteGroom,
                createWellness,getwellness,getWellnessById,updatewellness,deletewellness,
                createAdditional,getadditional,getadditionalById,updateadditional,deleteadditional,
                createProduct,getProduct,getProductById,updateProduct,deleteProduct}