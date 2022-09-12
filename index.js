const express = require('express')
var mysql = require('mysql')
var jwt = require('jsonwebtoken');
var cors = require('cors');
const { engine } = require('express-handlebars');



var connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'password',
    database: 'my_db'
});

connection.connect();

const app = express()
const port = 3000

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));

app.use(express.json());
app.use(cors());

// app.get('/', (req, res, next) => {
//     return res.json({
//         message: "Hello World"
//     })
// })
app.get('/', (req, res) => {
    return res.render('home', {
        name: "tiger",
    })
})
app.get('/sign-up', (req, res) => {
    return res.render('signup')
})
app.get('/login', (req, res) => {
    return res.render('login')
})
app.get('/forgot_password', (req, res) => {
    return res.render('forgot_password')
})
app.get('/reset', (req, res) => {
    return res.render('reset')
})

app.post('/sign-up', (req, res) => {
    try {
        const payload = req.body;
        // console.log(payload);
        if (payload.employee_name.length < 2 || payload.employee_name.length > 30) {
            return res.json({
                message: "Invalid Username",
            });
        }
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(payload.email) == false) {
            return res.json({
                message: "Invalid Email Address",
            });
        }
        if (payload.password.length < 8) {
            return res.json({
                message: "Password must be contain 8 character",
            });
        }
        connection.query(
            "INSERT INTO Employee (Employee_name, Email, DateOfBirth, PhoneNumber, Street, City, State, Country, Pincode,Password) VALUES ?",
            [[[payload.employee_name, payload.email, payload.dateofbirth, payload.phonenumber, payload.street, payload.city, payload.state, payload.country, payload.pincode, payload.password]]],
            function (err, result) {
                if (err) {
                    return res.json({
                        message: err.message,
                    });
                }
                const token = jwt.sign({ id: result.insertId }, 'Private');
                console.log(token);
                return res.json({ token });
            }
        );
    } catch (e) {
        console.error(e);
        return res.json({
            ok: false
        })
    }
})
app.get('/secret', (req, res) => {
    try {
        const vpn = req.headers.authorization;
        console.log(vpn);
        var decoded = jwt.verify(vpn, 'Private');
        return res.json({
            headers: req.headers,
            decoded
        })
    } catch (e) {
        console.error(e);
        return res.json({
            ok: false
        })
    }
})

app.post('/login', (req, res) => {
    try {
        connection.query(
            'SELECT * FROM Employee WHERE Email = ?',
            [req.body.email],
            function (error, result) {
                if (error) {
                    console.error(error)
                    return res.status(500).json({
                        message: "valid user",
                    })
                }
                // console.log(result)
                if (result.length < 1) {
                    return res.status(404).json({
                        message: "User not found",
                    })
                }
                const { Employee_id, Email, Password } = result[0]
                // console.log(Password);
                // console.log(req.body.password);
                if (Password === req.body.password) {
                    console.log(result);
                    const token = jwt.sign({ id: Employee_id }, 'Private');
                    return res.status(200).json({
                        token
                    });
                } else {
                    return res.status(400).json({
                        message: "Invalid user",
                    });
                }
            }
        )
    } catch (e) {
        console.error(e);
        return res.json({
            ok: false
        })
    }
})

app.get('/userInfo', (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.json({
                message: "Invalid token",
            })
        }
        var decoded = jwt.verify(req.headers.authorization, 'Private');
        connection.query(
            'SELECT * FROM Employee WHERE Employee_id = ?',
            [[decoded.id]],
            function (error, result) {
                if (error) {
                    console.log(error)
                    return res.status(404).json({
                        message: "Invalid User",
                    })
                }
                return res.json({ result })
            }
        )
    }
    catch (e) {
        console.error(e);
        return res.json({
            ok: false
        })
    }
})

app.post('/forgot_password', (req, res) => {
    try {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) == false) {
            return res.json({
                message: "Invalid Email Address",
            });
        }
        connection.query(
            'SELECT * FROM Employee WHERE Email = ?',
            [[req.body.email]],
            function (error, result) {
                if (error) {
                    return res.status(404).json({
                        message: "Invalid User",
                    })
                }
                if (result.length < 1) {
                    return res.status(404).json({
                        message: "User not found",
                    })
                }
                const token = jwt.sign({ id: result[0].Employee_id }, 'Private', { "expiresIn": '1h' });
                return res.json({ token });
            }
        )
    } catch (e) {
        console.error(e);
        return res.json({
            ok: false
        })
    }
})
app.patch('/reset_password', (req, res) => {
    try {
        if (!req.body) {
            return res.json({
                message: "Body is Empty",
            })
        }
        if (!req.body.newpassword) {
            return res.json({
                message: "New Password is required",
            })
        }
        if (!req.body.token) {
            return res.json({
                message: "Token is not found",
            })
        }
        var decoded = jwt.verify(req.body.token, 'Private');
        // console.log(decoded);
        // console.log(decoded.id);
        connection.query(
            `UPDATE Employee SET Password= ?  WHERE Employee_id = ?`,
            [req.body.newpassword, decoded.id],
            function (error, result) {
                if (error) {
                    return res.status(404).json({
                        message: "Update Not Available",
                    })
                } else {
                    return res.status(202).json({
                        message: "Update Successful",
                    })
                }
            }
        )
    } catch (e) {
        console.error(e);
        return res.json({
            ok: false,
            message: e.message
        })
    }
})

app.listen(port, () => {
    console.log(`Secure app listening on port ${port}`)
})