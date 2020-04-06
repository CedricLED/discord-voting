exports.run = (client, message, args) => {
  let resultMessage = "";
  client.ballot.forEach((ballot) => {
    if(ballot.votes > 0) {
      let candidate = `${ballot.name}: ${ballot.votes}`;
      resultMessage += candidate + "\n";
    }
  });
  message.channel.send(resultMessage);
};
