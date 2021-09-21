const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const toDoRoutes = require('./routes/todos')
const Todo = require('./models/Todo')
const path =require('path')



const app = express()


const hbs = exphbs.create({
    defaultLayout:'main',
    extname:'hbs'
})
  
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname,'views')))
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')))

app.use(toDoRoutes)

const PORT = process.env.PORT || 3000

async function start(){
    try {
        const URL = 'mongodb+srv://sanzhar:1234567890@cluster0.fbsye.mongodb.net/todos'
        await   mongoose.connect(URL,{useNewUrlParser:true })
        app.listen(PORT,() => {console.log(`Server has been started on PORT ${PORT}`)})
    } catch (er) {
        console.log(er)
    }
    
}

start()


