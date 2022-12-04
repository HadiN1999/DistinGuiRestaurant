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
        return res.status(200).json({ success: true, user })
});

// Delete Category
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
        // return user
        return res.status(200).json({ success: true, user })
});

// Reorder Category
exports.reorderCategory = catchAsyncErrors(async (req, res, next) => {
        // return user
        return res.status(200).json({ success: true, user })
});

// create item under category
exports.createItem = catchAsyncErrors(async (req, res, next) => {
        // return user
        return res.status(200).json({ success: true, user })
});

// update item under category
exports.updateItem = catchAsyncErrors(async (req, res, next) => {
        // return user
        return res.status(200).json({ success: true, user })
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
        return res.status(200).json({ success: true, user })
});