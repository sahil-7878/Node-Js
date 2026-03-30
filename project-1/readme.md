# 🚀 Simple Node.js HTTP Server

This is a basic Node.js server created using the built-in `http` module. It listens on port **8000** and responds with a simple message.

---

## 📌 Features

* Uses Node.js core `http` module
* Handles incoming requests
* Logs request URLs in the console
* Sends a simple text response to the browser

---

## 📂 Project Structure

```
project-folder/
│
├── server.js
└── README.md
```

---

## 🛠️ Installation & Setup

1. Install Node.js (if not installed)
   👉 https://nodejs.org/

2. Clone or download this project

3. Open terminal in project folder

---

## ▶️ Run the Server

```bash
node server.js
```

---

## 🌐 Output

After running the server, open your browser and go to:

```
http://localhost:8000
```

You will see:

```
Hello from your Node.js server!
```

---

## 📜 Code Explanation

* `http.createServer()` → Creates the server
* `req` → Request object (client request)
* `res` → Response object (server response)
* `res.end()` → Sends response and ends request
* `server.listen()` → Starts the server

---
## 📄 License

This project is created for **learning purposes only**.

---

## 👨‍💻 Author

**Sahil Nerpagar**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
