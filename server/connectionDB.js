const mongoose = require('mongoose');

async function connectionDb(url){
    return mongoose.connect(url);
 
}

module.exports = {
    connectionDb,
}