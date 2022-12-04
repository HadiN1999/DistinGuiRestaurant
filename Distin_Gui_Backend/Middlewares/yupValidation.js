const Yup = require('yup')

exports.itemSchema = Yup.object({
    name: Yup.string()
        .required('Item Name is required'),
});

exports.categorySchema = Yup.object({
    name: Yup.string()
        .required('Category Name is required'),
});

exports.userSchema = Yup.object({
    user_name: Yup.string()
        .required('User Name is required'),
    password: Yup.string()
    .required('Password is required'),
});