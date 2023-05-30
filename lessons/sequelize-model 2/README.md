# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  SOFTWARE ENGINEERING IMMERSIVE

# Sequelize Model Definition

_Introduction_

In this lesson we will outline the basics of defining a Sequelize model

### Objectives
- Define a Sequelize model
- Set up a Sequelize connection
- Plan out what column types to use based on the intended db schema
- Verify the schema using psql or postico

## Connecting

Before actually defining a model, we first need to set up a database connection.

This is accomplished by instantiating a `Sequelize` object and passing it an options object with the db name, `postgres` dialect, and a final key/val pair.  The last pair is a bit obscure, but without it a gratuitous warning is avoided.

```js
// models.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'people_db',
  dialect: 'postgres',
  operatorsAliases: false
});
```

The resulting `sequelize` object is conventionally exported from the `models.js file.

```js
module.exports = {
  sequelize
};
```

Now that `sequelize` has been set up, we can now attach model definitions using `define()`

```js
const Person = sequelize.define('person', { . . . }))
```

The basic structure of a model definition is a call to `define` which returns a model class.  This class should also be exported since it is what we use to query the db, e.g., `Person.findAll()`.

```js
module.exports = {
  sequelize,
  Person
};
```

Inside the object passed as a second argument to `define`, we have to add a series of key/value pairs representing the column names and types of the table we want to configure in the database schema.

The types are available on the `Sequelize` object. *NOTE*: The `Sequelize` object that has the all-caps types is distinct from the `sequelize` variable that we use to call `define`.  This is a bit confusing, but starts to make sense after a while.

The sequelize docs on [Model Definition](http://docs.sequelizejs.com/manual/tutorial/models-definition.html) have a comprehensive reference of all the tricks possible when defining a model.

```js
const Person = sequelize.define('person', {
  company: Sequelize.STRING,
  name: Sequelize.STRING,
  role: Sequelize.TEXT,
  sector: Sequelize.STRING
});
```

Take a moment and try to predict what schema will correspond with the above particular model definition.

Also consider this model definition for a company

```js
const Company = sequelize.define('company', {
  name: {
    type: Sequelize.STRING,
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
```

Note that on the `name` field we are making ["per-attribute" validations](https://sequelize.org/master/manual/models-definition.html#per-attribute-validators-and--code-allownull--code-).
- If `allowNull` is set to `false`, and we tried to save a new company without a `name` field, a `ValidationError` will be thrown by Sequalize.
- Even more we can customize `allowNull` error message by setting the `notNull` validator.

### Syncing

Sequelize can infer the actual SQL schema needed by our models by inspecting the column names and types.  The actual schema is generated and presented to our DB with the `sync` method called on the db connection object:

```js
// resetDb.js
const { sequelize } = require('./models');

const main = async () => {
  await sequelize.sync({ force: true });
  process.exit();
}

main();
```

Esentially the `sync({ force: true })` is the equivilent of `DROP TABLE IF EXISTS` which is why we use it in our `resetDB.js` file

#### Practice

- Setup the DB connection in `models.js`
- Create the sequelize model for a Company in `models.js`
- At least 1 field should be using per-attribute validation here is a [list of all validations.](https://sequelize.org/master/manual/models-definition.html#per-attribute-validators-and--code-allownull--code-)
- Have Sequelize sync with the model in `resetDb.js`
- In `seed.js` connect to the db and create two people using the Person model
- Run `npm install`, `npm run resetDb`, and `npm run seed` successfully
- Execute `main.js` with a query to get people from our api

*Hint:* Database operations are asynchronous (use async/await when writing your functions)

### Bonus

- Create the sequelize model for Company
- Update the `data.js` file to acccommodate company data
- Update the seed file to populate the company table
- Make a custom validator
