const path = require('path');
const url = require('url')
const querystring = require('querystring');

const tourimg = async(req,res) =>{
    const urlString = req.url;
    const parsedUrl = url.parse(urlString);
    const queryParams = querystring.parse(parsedUrl.query);
    const parameter = queryParams.file;
    // console.log(queryParams)

    if(!parameter||parameter === null || parameter === undefined|| parameter === 'undefined' || parameter === "" || parameter==='null')
    {
        res.send("No file")
        // console.log('no filename found!!')
    }else{
        
        res.sendFile(path.join(__dirname, `../../uploads/tour/${parameter}`))
        // console.log(queryParams)
    }
}

module.exports = tourimg;