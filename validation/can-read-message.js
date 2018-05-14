module.exports = function canReadMessage(message, user) {
  let denyAccess = false;

  if (message.author !== user && message.recipient !== user) {
    denyAccess = true;
  }
  if (message.author === user && message.authorDelete === true) {
    denyAccess = true;
  }
  if (message.recipient === user && message.recipientDelete === true) {
    denyAccess = true;
  }

  return denyAccess;
};
