// Username validation: Must contain letters and numbers, or letters only, but cannot be numbers only.
exports.validateUsername = (username) => {
  username = username.toString().trim();

  const hasLetters = /[a-zA-Z]/.test(username); // Checks if there is at least one letter
  const isOnlyNumbers = /^[0-9]+$/.test(username); // Checks if it's only numbers

  // Username must contain letters and optionally numbers but cannot be numbers only
  if (!hasLetters || isOnlyNumbers) {
    return false;
  }

  return true;
};

// Room name validation: Can only contain letters.
exports.validateRoomName = (roomName) => {
  roomName = roomName.trim();

  const validPattern = /^[a-zA-Z]+$/; // Only letters (no numbers, spaces, or special characters)

  // Room name must consist of letters only
  if (!validPattern.test(roomName)) {
    return false;
  }

  return true;
};
