import express from "express"
import cors from "cors"
import env from "dotenv"
import { user } from "./routes/user_route"
import { song } from "./routes/song_route"
import { playlist } from "./routes/playlist"
import { album } from "./routes/album_route"
import { song_album } from "./routes/albumSong_route"
env.config()

const app = express()
const {PORT} = process.env

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//route
app.use("/api", user)
app.use("/api", song)
app.use("/api", playlist)
app.use("/api", album)
app.use("/api", song_album)


//listener
app.listen(PORT, ()=>{
    console.log(`listened to port ${PORT}`);
})