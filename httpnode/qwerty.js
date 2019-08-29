const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const users = [
    { name: 'Ayush', email: 'ayush@gmail.com', password: '12345678',salary:10000,age:20 },
    { name: 'Anurakt', email: 'anurakt@gmail.com', password: '12345123',salary:15000,age:22 },
    { name: 'Vibhash', email: 'vibhash@gmail.com', password: '222222',salary:30000,age:19 }
];
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/user?', (req, res) => {
    try {
        console.log(req.query, 'get-user');
        let result = getUser(req.query);
        res.send(result);
    } catch (err) {
        console.log(err.message, '.......');
        res.status(400).send({ error: err.message });
    }
})


app.post('/user', (req, res) => {
    try {
        console.log(req.body);
        addUser(req.body);
        console.log(users);
        res.json({ message: 'User added successfully' , data : users  });
    } catch (err) {
        console.log(err.message, '.......');
        res.status(400).send({ error: err.message });
    }
})

app.put('/user', (req, res) => {
    try {
        console.log(req.body, 'get-user');
        let result = updateUser(req.body);
        res.send(result);
    } catch (err) {
        console.log(err.message, '.......');
        res.status(400).send({ error: err.message });
    }
})

app.delete('/delete-user', (req, res) => {

})

app.listen(3002, () => {
    console.log('Server is running');
});

function getUser(data) {
    let result;
    for (let i = 0; i <= users.length - 1; i++) {
        let user = users[i];
        if (user.email == data.email && user.password == data.password) {
            result = user;
            break;
        }
    }
    if (result) {
        return result;
    } else {
        throw new Error('Invalid Credentials')
    }

}

function updateUser(data) {
    let result;
    for (let i = 0; i <= users.length - 1; i++) {
        let user = users[i];
        if (user.email == data.email) {
            result = data;
            users[i] = data;
            break;
        }
    }
    if (result) {
        return result;
    } else {
        throw new Error('Invalid User')
    }
}

function addUser(data) {
    users.push(data);
}