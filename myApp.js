require('dotenv').config();
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
let Schema = mongoose.Schema;


let personSchema = new Schema({
    name: {type: String, required: true},
    age: Number,
    favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
    let temp = new Person({
	name: "First Last",
	age: 99,
	favoriteFoods: ["food1", "food2"]
    });

    temp.save((err, data) => {
	if(err){return console.log(err)}
	else{
	    //needed for fcc test
	    done(null, data);
	}
    })
};

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, (err, data)=>{
	    if(err){
		return console.log(err);
	    } else {
		// fcc test
		done(null, data);
	    }
	})
};

const findPeopleByName = (personName, done) => {
    Person.find({name: personName}, (err, data)=>{
	if(err){return console.log(err)}
	else {
	    done(null, data);
	}
    })
};

const findOneByFood = (food, done) => {
    Person.findOne({favoriteFood: food}, (err, data)=>{
	if(err){return console.log(err)}
	else {return done(null, data)}
    });
};

const findPersonById = (personId, done) => {
    Person.findById(personId, (err, data)=> {
	if(err){return console.log(err)}
	else {
	    return done(null, data);
	}
    })
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById(personId, (err, data)=>{
	if(err) {return console.log(err)}
	else {
	    data.favoriteFoods.push(foodToAdd);
	    data.save((err, data)=>{
		return done(null, data);
	    })
	}
    })
};

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new:true}, (err, data)=>{
	return done(null, data);
    })
    
};

const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, data)=>{
	if(err) {return console.log(err)}
	else {
	    return done(null, data);
	    
	}
    })

};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.deleteMany({name: nameToRemove}, (err, data)=>{
	done(null, data);
    })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";

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
