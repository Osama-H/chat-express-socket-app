class User {
  constructor() {
    this.users = [];
  }

  addUser(id, userName, roomName) {
    const newUser = { id, userName, roomName };
    this.users.push(newUser);
    return newUser;
  }

  getUsersByRoomName(roomName) {
    const usersList = this.users.filter((ele) => ele.roomName == roomName);
    return usersList.map((ele) => ele.userName);
  }

  getUserById(id) {
    return this.users.filter((ele) => ele.id == id)[0];
  }

  removeUserById(id) {
    let user = this.getUserById(id);

    if (user) {
      this.users = this.users.filter((user) => user.id != id);
    }

    return user;
  }
}

module.exports = User;
