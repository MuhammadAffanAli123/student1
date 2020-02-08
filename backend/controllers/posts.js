const HttpStatus = require('http-status-codes');
const tmp = require('tmp');
const fs = require('fs');
let {PythonShell} = require('python-shell');

exports.convert = (req, res, next) => {
    console.log("controller-posts::convert");
    const url = req.protocol + '://' + req.get('host');

    const data = {
        format: req.body.format
    };

    if (req.body.content) {
        console.log('controller-posts::creating input tmp file');
        // STORE IN A TMP FILE
        const tmpobj = tmp.fileSync();

        data.inputFile = tmpobj.name
    } else {
        data.inputFile = req.file.path; //url + '/files/' + req.file.filename;
    }

    const tmpOutObj = tmp.fileSync();

    data.outputFile = tmpOutObj.name;

    console.log('controller-posts::about to call python script');
    console.log('python converter.py ' + data.format + ' ' + data.inputFile + ' ' + data.outputFile);


    let options = {
        // mode: 'text',
        // pythonPath: 'path/to/python',
        // pythonOptions: ['-u'], // get print results in real-time
        scriptPath: 'backend/',
        args: [data.format, data.inputFile, data.outputFile]
    };

    PythonShell.run('converter.py', options, function (err, results) {
        if (err){
            throw err;
        }

        console.log('controller-posts::python script called with success');

        const output = {
            result: fs.readFileSync(data.outputFile, 'utf8')
        };

        const outputFileName = Date.now() + '-'+data.format;
        fs.writeFileSync('backend/files/' + outputFileName, output.result, 'utf8');


        output.resultPath = outputFileName;
        console.log('controller-posts::read output file content');

        res
            .status(HttpStatus.OK)
            .json(output);

    });
};