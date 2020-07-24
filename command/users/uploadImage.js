const { cloudinary } = require('../../config/cloudinary_config');
const { uploadImages } = require("./service");

module.exports = {
    uploadImg: (req, res) => {
      //  const body = req.body;
        console.log(body);
        const username = req.params.username;
        const fileStr = req.body.fileString;

        const uploadResponse = cloudinary.uploader.upload(
            fileStr, {
                upload_preset: 'askookie'
            })
        
        console.log("uploadResponse " + uploadResponse);

        const url = uploadResponse.url;

        console.log("uploadResponse2 " + url);

        uploadImages(username, url, (err, results) => {
            if(err) {
                console.log(err);
                return err;
            }
            return results;
        });

        // uploadImages(username, url, (err, results) => {
        //     if(err) {
        //         console.log(err);
        //         return res.status(500).json({
        //             message: "Database connection error"
        //         });
        //     }
        //     return res.status(200).json({
        //         data: results,
        //         message: "Image uploaded"
        //     });
        // });
    },
};