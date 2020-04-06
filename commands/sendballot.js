exports.run = (client, message, args) => {
  if (message.member.hasPermission("ADMINISTRATOR")) {
    message.channel.send("Ballot Sent!");
    let ballot = [];
    let ballotMessage = "";
    let iterator = 1;
    let messageIterator = 0;
    if (message.mentions.roles.first()) {
      message.mentions.roles.first().members.forEach((member) => {
        ballot.push({
          name: `${member.user.tag}`,
          number: iterator++,
          votes: 0,
          voted: false
        });
        iterator = iterator++;
      });
      for (let i = 0; i < ballot.length; i++) {
        let ballotEntry = `${ballot[i].number}: ${ballot[i].name}`;
        ballotMessage += ballotEntry + "\n";
        messageIterator++;
        if (messageIterator == 100) {
          message.mentions.roles.first().members.forEach((member) => {
            if (!member.user.bot) {
              member.send(ballotMessage);
            }
          });
          messageIterator = 0;
          ballotMessage = "";
        }
      }
      message.mentions.roles.first().members.forEach((member) => {
        if (!member.user.bot) {
          member.send(`${ballotMessage}\n\n!vote {number}`);
        }
      });
      client.ballot = ballot;
    } else {
      message.guild.members.forEach((member) => {
        ballot.push({
          name: `${member.user.tag}`,
          number: iterator++,
          votes: 0,
          voted: false
        });
        iterator = iterator++;
      });
      for (let i = 0; i < ballot.length; i++) {
        let ballotEntry = `${ballot[i].number}: ${ballot[i].name}`;
        ballotMessage += ballotEntry + "\n";
        messageIterator++;
        if (messageIterator == 100) {
          message.guild.members.forEach((member) => {
            if (!member.user.bot) {
              member.send(ballotMessage);
            }
          });
          messageIterator = 0;
          ballotMessage = "";
        }
      }
      message.guild.members.forEach((member) => {
        if (!member.user.bot) {
          member.send(`${ballotMessage}\n\n!vote {number}`);
        }
      });
      client.ballot = ballot;
      client.voters = ballot;
    }
  }
};
