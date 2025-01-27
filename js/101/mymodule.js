const fs = require('fs');
const path = require('path');



module.exports = function filteredFiles (directory, extention, callback){
    extention = `.${extention}`;
     fs.readdir(directory, (err, files)=>{
        if(err){
            return callback(err);
        }
        callback(null, files.filter( f => path.extname(f)=== extention));
     });
};
