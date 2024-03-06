const path = require('path');
const url = require('url')
const querystring = require('querystring');

const dayTourimg = async(req,res) =>{
    const urlString = req.url;
    const parsedUrl = url.parse(urlString);
    const queryParams = querystring.parse(parsedUrl.query);
    const parameter = queryParams.file;
    // console.log(parameter)

    if(!parameter||parameter === null || parameter === undefined|| parameter === 'undefined' || parameter === "" || parameter==='null')
    {
        res.send("No file")
        // console.log('no filename found!!')
    }else{
        
        res.sendFile(path.join(__dirname, `../../uploads/day_tour/${parameter}`))
        // console.log(queryParams)
    }
}

module.exports = dayTourimg;