const express = require ('express')
const app = express()
const port = 3000
const router = require('./router/router')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', router)

app.set('view engine','ejs')

app.use(express.static('public'))

app.get('/', function(req, res){
    res.render('home')
})

app.get('/rock-paper-scissor', function(req, res){
    res.render('chapter4')
})


app.listen(port, () => {
    console.log (`web listening at ${port}`)
})

