const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");

async function createMusic(req, res) {
  console.log(res.body);

  const title = req.body.title;
  const musicFile = req.files.music?.[0];
  const coverArt = req.files.cover?.[0];

  const musicResult = await uploadFile(musicFile.buffer.toString("base64"));

  let coverUrl = null;
  if (coverArt) {
    const coverResult = await uploadFile(coverArt.buffer.toString("base64"));
    coverUrl = coverResult.url;
  }

  const music = await musicModel.create({
    uri: musicResult.url,
    coverArt: coverUrl,
    title,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Music is created",
    music: {
      id: music._id,
      uri: music.uri,
      coverArt: music.coverArt,
      title: music.title,
      artist: music.artist,
    },
  });
}

async function createAlbum(req, res) {
  console.log("req.files:", req.files);
  const { title, musicIds } = req.body;
  const coverArt = req.files?.coverArt?.[0];

  let coverUrl = null;
  if (coverArt) {
    const coverResult = await uploadFile(coverArt.buffer.toString("base64"));
    coverUrl = coverResult.url;
  }

  const album = await albumModel.create({
    title,
    coverArt: coverUrl,
    artist: req.user.id,
    musics: musicIds,
  });

  console.log(album.musics);
  console.log(musicIds);

  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      coverArt: album.coverArt,
      title: album.title,
      artist: album.artist,
      musics: album.musics,
    },
  });
}

async function getAllMusics(req, res) {
  const limit = Number(req.query.limit) || 20;

  try {
    const musics = await musicModel
      .find()
      .populate("artist", "username email")
      .limit(limit);

    res.status(201).json({
      message: "Music fetched successfully",
      musics: musics,
    });
  } catch (err) {
    return res.status(201).json({
      message: "Forbidden",
      err,
    });
  }
}

async function getAlbum(req, res) {
  try {
    const album = await albumModel
      .find()
      .select("title artist coverArt")
      .populate("artist", "username email");

    res.status(201).json({
      message: "Album fetched successfully",
      album: album,
    });
  } catch (err) {
    return res.status(201).json({
      message: "Forbidden",
      err,
    });
  }
}

async function getAlbumById(req, res) {
  const albumId = req.params.albumId;
  try {
    const album = await albumModel
      .findById(albumId)
      .populate("artist", "username email")
      .populate("musics");
    //also .limit() and .skip()

    res.status(201).json({
      message: "Album fetched successfully",
      album: album,
    });
  } catch (err) {
    return res.status(201).json({
      message: "Forbidden",
      err,
    });
  }
}

async function getMusicBySearch(req, res) {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        message: "Query is empty",
      });
    }
    const searchQuery = q.trim();

    const music = await musicModel
      .find({
        title: {
          $regex: searchQuery,
          $options: "i",
        },
      })
      .populate("artist", "username")
      .select("coverArt title  artist");

    return res.status(200).json({
      success: true,
      results: music,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }

  // res.status(200).json({
  //   query: q
  // })
}

async function getMusicById(req, res) {
  const musicId = req.params.musicId;
  try {
    const music = await musicModel.findById(musicId).populate("artist", "username");
    res.status(201).json({
      message: "Music Fetched successfully",
      music: music,
    });
  } catch (err) {
    return res.status(201).json({
      message: "Forbidden",
      err,
    });
  }
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAlbum,
  getAlbumById,
  getMusicBySearch,
  getMusicById
};
