const mongoose = require('mongoose')
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
  }
exports.connectDB = () => {
    return new Promise((resolve, reject) => {
      const mongoURL = `mongodb://localhost:27017`
      mongoose
        .connect(mongoURL, mongoOptions)
        .then((conn) => {
          console.log('connected')
          resolve(conn)
        })
        .catch((error) => reject(error))
    })
  }

  