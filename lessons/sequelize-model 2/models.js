const { Sequelize } = require('sequelize');

const db = new Sequelize({
    database: 'people_db',
    dialect: 'postgres'
});

const Person = db.define('person', {
    company: Sequelize.STRING,
    name: Sequelize.STRING,
    role: Sequelize.TEXT,
    sector: Sequelize.STRING
});

module.exports = {
    Sequelize,
    Person,
    Company
};

const Company = Sequelize.define('company', {
    name: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Please enter a company name'
        }
      }
    },
    slogan: Sequelize.STRING,
    employee_count: Sequelize.INTEGER,
    founded_on: Sequelize.DATEONLY
  });