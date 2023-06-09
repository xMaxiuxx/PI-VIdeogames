const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  
    /************************************* Defino el modelo ****************************/

  sequelize.define('genre', {
    id:{
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
  

},
{timestamps:false});
};