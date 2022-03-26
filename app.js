const express = require('express')
const {engine} = require('express-handlebars');

const PORT = 8080;
const app = express();

// var root = require('path').join(__dirname,'/public');
// app.use(express.static(root))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', engine({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home')
});


const fortunes = [
    "Conquer your fears or they will conquer you.", 
    "Rivers need springs.",
    "Do not fear what you don't know.", 
    "You will have a pleasant surprise.", 
    "Whenever possible, keep it simple.",
    ]
app.get('/about', (req, res) => {
    const fortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', {fortune})
})

app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    res.status(500);
    res.render('500')
})

app.listen(PORT, (err, req, res) => console.log(`Server started ${PORT}`))