const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/lagou_admin', { useNewUrlParser: true ,useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("mongo connected!")
});

const userSchema = mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('Users', userSchema);

module.exports = {
    User
}
