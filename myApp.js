require('dotenv').config();

//challenge 1
let uri = process.env.DB;
let mongoose = require('mongoose');
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//challenge 2
const Schema = mongoose.Schema;

let personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.model('Person', personSchema);


//challenge 3
const createAndSavePerson = (done) => {
  let cahanGeorge = new Person({
    name: "Cahan George",
    age: 18,
    favoriteFoods: ['Sarmale in foi de vita', 'Salata beouf']
  });

  cahanGeorge.save(function(err, data){
    if(err) return console.log(err);
    done(null, data)
  });
};


//challenge 4
let arrayOfPeople = [
  {name: 'Denis', age: 17, favoriteFoods: ['Crispy']},
  {name: 'Alin', age: 16, favoriteFoods: ['Gratar']},
  {name: 'Neta', age: 17, favoriteFoods: 'Pula'}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people){
    if(err) return console.log(err);
    done(null, people)
  });
};


//challenge 5
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personFound) {
    if(err) return console.log(err);
    done(null, personFound)
  });
};


//challenge 6
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data){
    if(err) return console.log(err);
    done(null, data)
  });
};


//challenge 7
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data){
    if(err) return console.log(err);
    done(null, data)
  });
};


//challenge 8
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person){
    if(err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    });
  });
};


//challenge 9
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, updateDoc){
    if(err) return console.log(err);
    done(null, updateDoc);
  });
};


//challenge 10
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if(err) return console.log(err);
    done(null, removedDoc);
  });
};


//challenge 11
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  });
};


//challenge 12
var queryChain = function(done) {
  var foodToSearch = "burrito";
  var jsonObject = {favoriteFoods : foodToSearch};
  Person.find(jsonObject).sort({name: 1}).limit(2).select({age: 0}).exec((err, data) => {
    (err) ? done(err) : done(null, data); 
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
