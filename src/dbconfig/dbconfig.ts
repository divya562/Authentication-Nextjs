import mongoose from  'mongoose';


type ConnectionObject={
    isConnected?: boolean
}

const connection: ConnectionObject={}

export async function connect() {
    if(connection.isConnected){
        console.log('Already Connected to Database')
        return
    }

    try{
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('mongodb connected');
        })

        connection.on('error',(err)=>{
            console.log('mongodb connection error' + err);
            process.exit();
        })
    }catch(error){
        console.log('something goes wrong!');
        console.log(error);
    }
}