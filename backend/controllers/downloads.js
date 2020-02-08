const HttpStatus = require('http-status-codes');

exports.download = (req, res, next) => {
    console.log("downloads-posts::download");
    const file = 'backend/files/'+req.params.fileName;

    console.log("req.params.fileName: "+req.params.fileName);

    res
        .status(HttpStatus.OK)
        .download(file);
};