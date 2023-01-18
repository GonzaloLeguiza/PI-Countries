const { Router } = require('express');
const axios = require ('axios');
const { Country, Activity } = require('../db');
const { Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const apiInfo = await apiUrl.data.map(el => {
        const country = {
            id:el.cca3,
            nombre:el.name.common,
            imagen:el.flags[1],
            continente:el.continents[0],
            capital: el.capital != null ? el.capital[0] : "No data",
            subregion: el.subregion,
            area: el.area,
            population: el.population,
        }
        return country
    });
    return apiInfo;
}

// aca tomamos el getApiInfo y por cada elemento hacemos un create a country
//Cuando se llama a una función async, esta devuelve un elemento Promise.
const infoEnDb = async () => {
    try {
        let countries = await getApiInfo();
        await Promise.all(
            countries.map(async (el) =>{
                await Country.create(el);
            })
        )
        console.log("se guardaron los datos");
    } catch (error) {
        console.log('algo salio mal');
    }
}

// findAll() nos trae todos los registros de esta tabla 
const getDbInfo = async () => {
    return await Country.findAll({
        include: Activity
    })
}

const getAllCountries = async () => {
    const dbInfo = await getDbInfo();
    if(!dbInfo.length) {
        await infoEnDb();
        return await getDbInfo();
    }
    return dbInfo;
}

router.get('/activities' ,async (req, res) => {
    try{
        let activity = await Activity.findAll();
        res.status(200).send(activity);
    }catch(e){
        res.status(404).send('notfound')
    }
});

//trae por Query
router.get('/countries' , async (req,res) => {
    const name = req.query.name;
    try {
        let totalInfo = await getAllCountries();
        if(name){
            let country = totalInfo.filter((el) => el.nombre.toLowerCase().includes(name.toLowerCase())); 
            (country.length) ? res.status(200).json(country) : res.status(404).json(['Ningun pais coincide']);  
        }else{
            totalInfo.length ? res.status(200).json(totalInfo) : res.status(404).send('Ningun pais encontrado')
        }

    } catch (error) {
        console.error(error)
    }

})



// Por id
router.get('/countries/:id', async (req,res) => {
     const id = req.params.id;
     let totalInfo = await getAllCountries();
     if(id){
        try {

        let countriesId = totalInfo.filter(el => el.id.toLowerCase() === id.toLowerCase());
        countriesId ? 
        res.status(200).send(countriesId) : 
        res.status(404).send('Ningun pais coincide')
        console.log(countriesId)
        }catch (e){
            res.status(500).send(e)
        }
     }else{
        res.status(404).send("Ese id no existe");
     }
})

// El post
router.post('/activities', async (req,res) => {
    let { nombre,dificultad,duracion,temporada,countries} = req.body

     console.log(nombre,dificultad,duracion,temporada,countries);

 try {
    if(nombre && dificultad && duracion && temporada && countries){

        let createActivity = await Activity.create ({
            nombre,
            dificultad,
            duracion,
            temporada,
            countries
            })
        
            countries.forEach(async (el) => {
                let countriesDb = await Country.findOne({
                    where : {id : {[Op.iLike]:`%${el}%`}}
                })
                await countriesDb ?.addActivity(createActivity)
            });
            return res.status(200).send(createActivity)

    }else {
        return res.status(404).json('Missing data')
    }
 } catch (error) {
    res.send('algo salio mal');
 }
    
})

module.exports = router;
