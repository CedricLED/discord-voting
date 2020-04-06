exports.run = (client, message, args) => {
  let ballotMessage = "";
  let messageIterator = 0;
  for (let i = 0; i < client.ballot.length; i++) {
    let ballotEntry = `${client.ballot[i].number}: ${client.ballot[i].name}`;
    ballotMessage += ballotEntry + "\n";
    messageIterator++;
    if (messageIterator == 100) {
      message.author.send(ballotMessage);
      messageIterator = 0;
      ballotMessage = "";
    }
  }
  message.author.send(`${ballotMessage}\n\n!vote {number}`);
};
