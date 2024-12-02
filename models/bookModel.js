import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
        },
        author:{
            type:String,
            required:true,
            trim:true,
    },
        genre: {
            type: String,
            required: true,
            trim: true,
    },
        availability: {
            type: Boolean,
            default: true,
    },
},
{
    timestamps:true,
}
);

const Book = mongoose.model('Book', bookSchema);

export default Book;