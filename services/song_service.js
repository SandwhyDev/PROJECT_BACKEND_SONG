import multer from "multer";
import path from "path"


const song_storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, path.join(__dirname, `../static/uploads/songs`))
    },
    filename : (req,file,cb)=>{
        
        cb(null, Date.now() + "." + file.originalname)
    }
})

export const song_upload = multer({storage : song_storage})