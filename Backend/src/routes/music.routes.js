const express = require("express");
const musicController = require("../controllers/music.controller");
const multer = require("multer");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

router.post(
  "/upload",
  authMiddleware.authArtist,
  upload.fields([
    { name: "music", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  musicController.createMusic,
);
router.post(
  "/create-album",
  authMiddleware.authArtist,
  upload.fields([{ name: "coverArt", maxCount: 1 }]),
  musicController.createAlbum,
);
router.get("/",  musicController.getAllMusics);
router.get("/get-all-album", authMiddleware.authUser, musicController.getAlbum);

router.get(
  "/album/:albumId",
  authMiddleware.authUser,
  musicController.getAlbumById,
);
router.get(
  "/:musicId",
  // authMiddleware.authUser,
  musicController.getMusicById,
);
router.get("/search",musicController.getMusicBySearch)

module.exports = router;
