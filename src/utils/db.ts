import mongoose,{ConnectOptions} from 'mongoose'

const connectToDatabase = async()=>{
    const mongoose_link = process.env.MONGOOSE_URL
    if(!mongoose_link)
    {
        console.log('Please enter the database link')
    }
    else
    {
        try {
            await mongoose.connect(mongoose_link, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" } as ConnectOptions);
            console.log("connected to database")
        }
        catch (err) {
            console.error('Mongoose connection error : ', err)
        }
    }
    
}

export default connectToDatabase;