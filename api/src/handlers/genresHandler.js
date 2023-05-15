const getGenresHandler = (req, res )=>{
    const {gameId ,id , title, } =req.body;
  res.status(200).send(`traeme estos generos :
  gameId:${gameId},
  id:    ${id},
  title: ${title},
  `)
  };



  module.exports = {
    getGenresHandler,
  };