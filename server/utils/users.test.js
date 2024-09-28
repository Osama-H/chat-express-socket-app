const { expect } = require("expect");
const Users = require("./users");

describe("Users", () => {
  it("should add a new User", () => {
    const users = new Users();
    users.addUser(1, "Osama", "NodeJs");

    expect(users.users[0].id).toBe(1);
  });

  it("should return the users name list based on the roomName", () => {
    const users = new Users();

    users.addUser(1, "Osama", "NodeJs");
    users.addUser(2, "Ahmed", "Python");
    users.addUser(3, "Aloooosh", "NodeJs");

    const theFilterdUsers = users.getUsersByRoomName("Python");

    expect(theFilterdUsers).toEqual(["Ahmed"]);
  });

  it("should return the user based on the Id", () => {
    const users = new Users();

    users.addUser(1, "Osama", "NodeJs");
    users.addUser(2, "Ahmed", "Python");
    users.addUser(3, "Aloooosh", "NodeJs");

    const theFilterdUsers = users.getUserById(1);

    expect(theFilterdUsers.id).toEqual(1);
  });

  it("should not return the user based on the Id", () => {
    const users = new Users();

    users.addUser(1, "Osama", "NodeJs");
    users.addUser(2, "Ahmed", "Python");
    users.addUser(3, "Aloooosh", "NodeJs");

    const theFilterdUsers = users.getUserById(10);

    expect(theFilterdUsers?.id).toBeUndefined();
  });
});

// console.log(user.getUsersByRoomName("NodeJs"));
