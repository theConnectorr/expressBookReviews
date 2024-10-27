const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();

app.use(express.json());

app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
}));

app.use("/customer/auth/*", function auth(req, res, next) {
    // check if the authorization header is provided
    if (!req.session.authorization) 
        res.status(403).json({ messaage: "User not logged in"});

    const accessToken = req.session.authorization["accessToken"];
    jwt.verify(accessToken, "my_secret", (err, decoded) => {
        if (err) {
            return res.status(500).json({ err });
        }

        console.log(decoded);
        next();
    })
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
