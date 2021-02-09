const mongoose = require('mongoose');
const validator = require('validator')
const bcrypyt = require('bcryptjs')
const jwt = require('jsonwebtoken');

// seperate schema is used for taking advantage of middleware

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (validator.contains(value, 'password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },

    tokens:[{
        token : {
            type: String,
            required: true
        }
    }]
})


//generating auth token - this is created on instance rather than with model
userSchema.methods.generateAuthToken = async function(){
    const user=this;
    const token = jwt.sign({_id:user._id.toString()},'thisisNode')

    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

// Validating Login - statics can be used with user model
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        return `User with ${email} doesn't exists`
    }

    const validPassword = await bcrypyt.compare(password, user.password)
    if (!validPassword) {
        return "Wrong Password"
    }

    return user
}



// Hashing the password - Middleware
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypyt.hash(user.password, 8)
    }
    next() // correspond to next function after this middleware fn
})

const User = mongoose.model('User', userSchema)

module.exports = User

