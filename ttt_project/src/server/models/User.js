import mongoose from 'mongoose'
import validator from 'validator'


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
                if( !validator.isEmail( value )) {
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



export default mongoose.model('User', userSchema);