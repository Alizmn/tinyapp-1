
const findUserByEmail = (email, database) => {
  // loop through the users object
  for (let id in database) {
    // compare the emails, if they match return the user obj
    if (database[id].email === email) {
      return database[id];
    }
  };
  // after the loop, return false
  return false;
};


module.exports = {findUserByEmail};