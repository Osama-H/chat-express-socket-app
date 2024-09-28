const { expect } = require("expect");
const { validateUsername, validateRoomName } = require("./validate-input");

describe("Validate UserName", () => {
  it("should reject the name when contain only numbers", () => {
    let validateName = validateUsername(12345);
    expect(validateName).toBe(false);
  });

  it("should accept the name when contain at least one letter", () => {
    let validateName = validateUsername("o123_");
    expect(validateName).toBe(true);
  });
  

  it("should accept the name when contain letters and numbers", () => {
    let validateName = validateUsername("osama123");
    expect(validateName).toBe(true);
  });
});

describe("Validate RoomName", () => {
  it("should reject the room name when contain a numbers", () => {
    let validateName = validateRoomName("NodeJs123");
    expect(validateName).toBe(false);
  });

  it("should accept the room name when only contain a letters", () => {
    let validateName = validateUsername("NodeJs");
    expect(validateName).toBe(true);
  });
});
