const User = require('../models/user');

function returnUser(user) {
  return {
    ...user._doc,
    _id: user._id.toString(),
    created: user.created.toISOString(),
  }
}

module.exports = {
  createUser: async function ({ userInput }) {
    const user = new User({
      givenName: userInput.givenName,
      familyName: userInput.familyName,
      email: userInput.email,
    });
    const createdUser = await user.save();
    return returnUser(createdUser);
  },
  user: async function ({id}) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User Not found!');
    }
    return returnUser(user);
  },
  users: async function () {
    const users = await User.find();
    return users.map((q) => {
        return returnUser(q);
      });
  },
  updateUser: async function ({ id, userInput }) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User Not found!');
    }

    user.givenName = userInput.givenName || user.givenName;
    user.familyName = userInput.familyName || user.familyName;
    user.email = userInput.email || user.email;
    const updatedUser = await user.save();
    return returnUser(updatedUser);
  },
  deleteUser: async function ({ id }) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User Not found!');
    }
    await User.findByIdAndRemove(id);
    return returnUser(user);
  },
}
