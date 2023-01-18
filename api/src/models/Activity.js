const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id: {
      type: DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      primaryKey : true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificultad: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max:5,
        min:1
      }
    },
    duracion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    temporada: {
      type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno','Primavera'),
      allowNull: true,
    },

  });
};
