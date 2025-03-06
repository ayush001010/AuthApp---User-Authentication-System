# 🚀 User Authentication System

A simple user authentication system built with **Node.js, Express.js, MongoDB, JWT, and bcrypt**.  
It includes the following features:

## 🚀 Features
- ✅ User Registration with password hashing.
- ✅ User Login with JWT authentication.
- ✅ Secure Cookies for session management.
- ✅ Protected Routes with middleware authentication.
- ✅ User Logout functionality.
- ✅ Error Handling and Input Validation.

## 📂 Project Structure

```sh
AuthApp/
│── .dist/
│── models/
│   └── user.js        # Mongoose user schema
│── node_modules/      # Dependencies (not included in repo)
│── public/            # Static files (images, CSS, JS)
│   ├── image/
│   ├── javascript/
│   └── stylesheet/
│── views/
│   ├── index.ejs      # Homepage
│   ├── login.ejs      # Login page
│── .env               # Environment variables (Not included in repo)
│── app.js             # Main application file
│── package.json       # Dependencies and scripts
│── package-lock.json  # Lockfile for dependencies
└── README.md          # Project documentation
```
## 🔧 Installation & Setup
- 1️⃣ Clone the Repository
  ```sh
  git clone https://github.com/your-username/AuthApp.git
  cd AuthApp
  ```
- 2️⃣ Install Dependencies
  ```sh
  npm install
  ```
- 3️⃣ Start the Server
  ```
  npm start
    ```
  or (for development mode with auto-restart)
  
  ```
  npm run dev
  ```

## 🔐 Authentication & Security:
  -🔒 Passwords are hashed using bcrypt.
  -🔒 JWT tokens are used for session authentication.
  -🔒 Cookies are set as httpOnly and secure.
  -🔒 Protected routes require valid JWT tokens.

## 🛠 Technologies Used:
  -🟢 Node.js.
  -🟢 Express.js.
  -🟢 MongoDB & Mongoose.
  -🟢 JWT (JSON Web Tokens).
  -🟢 bcrypt (for password hashing).
  -🟢 EJS (for templating).
  -🟢 dotenv (for environment variables).

## 📜 License
-This project is licensed under the MIT License.

## 🤝 Contributing
-Feel free to fork this repository, create a new branch, and submit a pull request with your improvements! 🚀
---

### ✅ How to Use This
1. Copy the entire content above.
2. Create a file named `README.md` in your project root.
3. Paste the copied content into `README.md`.
4. Save the file and push it to GitHub.

Now your repository will have a well-formatted and professional **README.md** file. 🚀✨ Let me know if you need further modifications! 😊

