//imports here
const Sequelize = require("sequelize");
const db = require("../db");


class User extends Model {
    // add methods here
    static async findByEmail(email) {
      const user= await User.findOne({where: {email: email}});
      return user;
    }
  }
  
  User.init({
    
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
    } ,
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false
    },
// 0= false 1=true
    apiKey:{
        type:DataTypes.INTEGER,
        defaultValue: 0,
    }
    
  }, {
    sequelize: db,
    timestamps: false,
  });
  module.exports = User;

