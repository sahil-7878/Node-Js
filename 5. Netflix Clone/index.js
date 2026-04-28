const express = require("express");
const path = require("path");
const multer = require("multer");

const connectDB = require("./config/db");
const Movie = require("./model/movie");
const movieRouter = require("./routes/movieRoutes");

const app = express();
const PORT = 8001;

// Multer setup
const storage = multer.diskStorage({
  destination: "upload/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use("/upload", express.static(path.join(__dirname, "upload")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/movies", movieRouter);

app.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.render("index", { movies });
});

app.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.render("movies", { movies });
});

app.get("/add", (req, res) => {
  res.render("add-movie");
});

app.get("/view/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render("view", { movie });
});

app.get("/edit/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render("edit-movie", { movie });
});

// Update route yahan add kiya
app.post("/api/movies/update/:id", upload.single("poster"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      year: req.body.year,
      rating: req.body.rating,
      duration: req.body.duration,
      director: req.body.director,
    };

    if (req.file) {
      updateData.poster = "/upload/" + req.file.filename;
    }

    await Movie.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/movies");
  } catch (err) {
    res.send("Update failed: " + err.message);
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});