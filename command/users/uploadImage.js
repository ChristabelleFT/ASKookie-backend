const { cloudinary } = require('../../config/cloudinary_config');
const { uploadImages } = require("./service");

module.exports = {
    uploadImg: async (req, res) => {
        try {
            const fileStr = req.body.data;
            const username = req.params.username;

            const uploadResponse = await cloudinary.uploader.upload(
                fileStr, {
                    upload_preset: 'askookie'
                })

            const url = uploadResponse.url;

            await uploadImages(username, url, (err, results) => {
                if(err) {
                    console.log(err);
                    return err;
                }
                return results;
            });
        } catch (error) {
            console.error(error); 
        }
    },
};