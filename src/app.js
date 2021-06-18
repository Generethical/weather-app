const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const directory = path.join(__dirname,"../public/");
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(directory))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Artem Sturchenko'
    })
})
    
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Artem Sturchenko'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is helpful information for you',
        title:'Help',
        name:'Artem Sturchenko'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an adress'
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longtitude,location}={})=>{
            if(error){
                return res.send({error});
            }
            forecast(latitude,longtitude,(error,forecastData)=>{
                if(error){
                    return res.send({error});
                }
                    res.send({
                    city:req.query.address,
                    location:location,
                    forecast:forecastData
                 })
            })
        })
    }
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Artem Sturchenko',
        errorMessage:'Help article is not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Artem Sturchenko',
        errorMessage:'Page is not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port);
});