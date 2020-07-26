const { cloudinary } = require('../../config/cloudinary_config');
const { uploadProfiles, answer, getProfilePicture } = require("./service");

module.exports = {
    uploadProfile: async (req, res) => {
        try {
            const fileStr = req.body.data;
            const username = req.params.username;

            const uploadResponse = await cloudinary.uploader.upload(
                fileStr, {
                    upload_preset: 'askookie'
                })

            const url = uploadResponse.url;
            const publicID = uploadResponse.public_id;

            await uploadProfiles(username, publicID, url, (err, results) => {
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
    answer: async(req, res) => {
        try {
            const body = req.body;
            const fileStr = req.body.image;

            if(fileStr != '') {
                const uploadResponse = await cloudinary.uploader.upload(
                    fileStr, {
                        upload_preset: 'askookie'
                    })

                const publicID = uploadResponse.public_id;
                const url = uploadResponse.url;

                console.log(publicID);

                await answer(body, publicID, url, (err, results) =>{
                    if(err) {
                        console.log(err);
                        return res.status(500).json({
                            message: "Database connection error"
                        });
                    }
                    return res.status(200).json({
                        data: results,
                        message: "Answer added"
                    });
                });
            } else {
                await answer(body, null, null, (err, results) =>{
                    if(err) {
                        console.log(err);
                        return res.status(500).json({
                            message: "Database connection error"
                        });
                    }
                    return res.status(200).json({
                        data: results,
                        message: "Answer added"
                    });
                });
            }
        } catch (error) {
            console.error(error); 
        }
    },
    getProfilePicture:(req, res) => {
        const username = req.params.username;
        getProfilePicture(username, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    message: "Record not found"
                });
            }
            return res.json({
                data: results
            });
        });
    }
    
};