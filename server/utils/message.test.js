const { expect } = require("expect");
const { generateMessage, generateLocationMessage } = require("./message.js");

describe("Generate Message", () => {
  it("should generate correct message object", () => {
    let from = "Osama";
    let text = "Hello Mum";
    let message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});

describe("Generate Location Message", () => {
  it("should generate correct location message object", () => {
    let from = "Osama";
    let lat = 30.1255085;
    let lng = 31.3205529;

    const locationMessage = generateLocationMessage(from, lat, lng);

    expect(typeof locationMessage.createdAt).toBe("number");

    expect(locationMessage).toMatchObject({
      from,
      url: `https://google.com/maps?q=${lat},${lng}`,
    });
  });
});
