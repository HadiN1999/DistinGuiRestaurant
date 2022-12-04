const catchAsyncErrors = require('../../Middlewares/catshAsynErrors');
const Category = require('../../Models/Categories');
const User = require('../../Models/Users');
const Item = require('../../Models/Items');
const { userSchema } = require('../../Middlewares/yupValidation');


//login User
exports.login = catchAsyncErrors(async (req, res, next) => {

        if(await userSchema.validate(req.body))
        {
        let {user_name, password} = req.body

        const user = await User.findOne({ user_name })
        if (!user) return res.status(200).json({ success: false, message: 'Invalid Email or Password' });
        const isPassword = password === user.password
        if(!isPassword) return res.status(200).json({ success: false, message: 'Invalid Email or Password' });

        return res.status(200).json({ success: true, user })

        }else{
                return next(new ErrorHandler('Please enter email & password', 400)); 
        }
});

// Create Category
exports.createCategory = catchAsyncErrors(async (req, res, next) => {

        let category = await Category.create(req.body)

        if(category) return res.status(200).json({ success: true, category })
        else return res.status(200).json({ success: false, message:'Category was not created' })
});

// Update Category
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
        // return user
        console.log(req.params.categoryID)
        let category = await Category.findOneAndUpdate({_id:req.params.categoryID}, req.body);
        if(category) return res.status(200).json({ success: true, message:'Updated' })
        else return res.status(200).json({ success: false, message:'Not Updated' })
});

// Delete Category
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
        let category = await Category.findOneAndRemove({_id: req.params.categoryID})
        if(category)
        {
                return res.status(200).json({ success: true, message:'Category removed' })
        }
        return res.status(200).json({ success: false, message:'No Category Found' })
});

// Delete Item
exports.deleteItem = catchAsyncErrors(async (req, res, next) => {
        let item = await Item.findByIdAndRemove({_id: req.params.itemID})
        if(item)
        {
                let cat = await Category.findOne({_id:req.params.categoryID})
                let itemtt = cat.items.filter(i=>i.toHexString()!==req.params.itemID)
                cat.items = itemtt
                cat.save()
                return res.status(200).json({ success: true, message:'Item removed' })
        }
        return res.status(200).json({ success: false, message:'No Item Found' })
});

// Reorder Category
exports.reorderCategory = catchAsyncErrors(async (req, res, next) => {
        // return user
        return res.status(200).json({ success: true, user })
});

// create item under category
exports.createItem = catchAsyncErrors(async (req, res, next) => {
        // return user
        console.log('req', req.params)
        let item = await Item.create(req.body)
        if(item) 
        {
                let category = await Category.findOne({_id:req.params.categoryID})
                console.log(category)
                let items = category.items
                items.push(item)
                category.items = items 
                await category.save()
                return res.status(200).json({ success: true, message:'Item Created Successfully' })

        }
        return res.status(200).json({ success: false, message:'failed to create Item' })
});

// update item under category
exports.updateItem = catchAsyncErrors(async (req, res, next) => {
        // return user
        let category = await Item.findOneAndUpdate({_id:req.params.itemID}, req.body);
        if(category) return res.status(200).json({ success: true, message:'Updated' })
        else return res.status(200).json({ success: false, message:'Not Updated' })
});


// reorder items under category
exports.reorderItem = catchAsyncErrors(async (req, res, next) => {
        // return user
        return res.status(200).json({ success: true, user })
});

// get Categories
exports.getCategories = catchAsyncErrors(async (req, res, next) => {
        // return user
        let Categories = await Category.find()
        return res.status(200).json({ success: true, Categories })
});

// get Items under Categories
exports.getItems = catchAsyncErrors(async (req, res, next) => {
        // return user
        let items = await Item.find({category:req.params.categoryID})
        return res.status(200).json({ success: true, items })
});