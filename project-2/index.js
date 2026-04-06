const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];
let idCounter = 1;

// Dashboard
app.get("/", (req, res) => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "Completed").length;
    const pending = tasks.filter(t => t.status === "Pending").length;

    res.render("dashboard", { tasks, total, completed, pending });
});

// Add Task Page
app.get("/add", (req, res) => {
    res.render("add-task");
});

// Add Task Logic
app.post("/add", (req, res) => {
    const { title, description, priority } = req.body;

    tasks.push({
        id: idCounter++,
        title,
        description,
        priority,
        status: "Pending"
    });

    res.redirect("/");
});

// Edit Page
app.get("/edit/:id", (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    res.render("edit-task", { task });
});

// Update Task
app.post("/edit/:id", (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);

    task.title = req.body.title;
    task.description = req.body.description;
    task.priority = req.body.priority;
    task.status = req.body.status;

    res.redirect("/");
});

// Delete Task
app.get("/delete/:id", (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.redirect("/");
});

// Status Change
app.get("/status/:id", (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);

    if (task.status === "Pending") task.status = "In Progress";
    else if (task.status === "In Progress") task.status = "Completed";

    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});