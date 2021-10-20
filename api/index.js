const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host: 'mysql_db',
    user: 'root',
    password: 'root',
    database: 'books'
})

// init app
const app = express();
app.use(express.json())

// app will listen
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
})

// setup cors
app.use(express.urlencoded({extended: true}))
app.use(cors())

// Homepage
app.get('/', (req, res) => {
    res.send('Hi There')
});

// CRUD

app.get('/get', (req, res) => {
    const SelectQuery = " SELECT * FROM books_reviews";
    db.query(SelectQuery, (err, result) => {
      res.send(result)
    })
})

app.post("/post", (req, res) => {
    const bookName = req.body.setBookName;
    const bookReview = req.body.setReview;
    const InsertQuery = "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
    db.query(InsertQuery, [bookName, bookReview], (err, result) => {
      console.log(result)
    })
})

app.delete("/delete/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
    db.query(DeleteQuery, bookId, (err, result) => {
      if (err) console.log(err);
    })
})

