-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Songs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "song_path" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Songs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "user_id" INTEGER NOT NULL,
    "song_id" INTEGER NOT NULL,
    CONSTRAINT "Playlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Playlist_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Songs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);