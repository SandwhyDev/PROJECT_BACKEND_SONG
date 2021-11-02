import express from "express"
import path from "path"
import { ps } from "../prisma/connection"
import { song_upload } from "../services/song_service"

export const song_album = express.Router()

song_album.post("/song_album_create", song_upload.single("song"), async(req,res)=>{
    try {
        const data = await req.body
        const file = await req.file
        const result = await ps.albums_song.create({
            data : {
                albums_id : parseInt(data.albums_id),
                filename : file.filename,
                song_path : path.join(__dirname, `../static/uploads/songs/${file.filename}`)
            }
        })

        res.json({
            success : true,
            msg : "berhasil",
            query : result
        })

    } catch (error) {
        res.json({
            success : true,
            error : error.message
        })
    }
})