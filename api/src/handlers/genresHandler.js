const {getGenrescontrollers} = require("../controllers/genresController")
const getGenresHandler = async (req, res )=>{

  
  const retornofn = await getGenrescontrollers()
  //console.log(retornofn)
  res.status(200).send (retornofn)
  

  };



  module.exports = {
    getGenresHandler,
  };