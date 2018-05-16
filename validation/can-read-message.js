module.exports = function canReadMessage(message, user) {
  let denyAccess = false;

  if (message.authorId !== user && message.recipientId !== user) {
    denyAccess = true;
  }
  if (message.authorId === user && message.authorDelete === true) {
    denyAccess = true;
  }
  if (message.recipientId === user && message.recipientDelete === true) {
    denyAccess = true;
  }

  return denyAccess;
};
