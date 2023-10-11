import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Cart from '../models/Cart.js'

// We can encrypt user information if we want? seems extra for project
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
            validate( value ){
                // TODO: create ìsUserEmail()``
                // -> checks passed `value` against saved user email 
                if( !validator.isUserEmail( value )) {
                    throw new Error('Email invalid');
                }
            }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('404: Try again.');
            }
        }
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    },
    // Generated tokens by 'jwt' used to authn. user(s)
    tokens: [{
        token: {
        type: String,
        required: true
          }
        }]
      }, {
    timestamps: true
});

userSchema.methods.genAuthToken() = async function() {
    const user = this;
    // gen token
    const token = jwt.sign({_id: user._id.toString()}, // TODO: is toString() predefined?
        'testToken');

    user.tokens = user.tokens.concat({token}); // assign token to users 'tokens'
    await user.save();

    return token;
}   

//TODO: Not sure if implementation is correct
userSchema.statics.findByCredentials = async (email, password) => {
    const User = this;
    const userCheck = await User.findOne({email});
   // const user = await userSchema.findOne({email});

    if (!userCheck) {
        throw new Error('Error logging in.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
};


// Hash user password before saving
userSchema.pre('save', async function(next){
    const user = this;

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();

});


export default mongoose.model('User', userSchema);