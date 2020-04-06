exports.run = (client, message, args) => {
  if (message.member.hasPermission("ADMINISTRATOR")) {
    message.channel.send("Ballot Sent!");
    let specialBallot = [];
    let ballot = [];
    let ballotMessage = "";
    let iterator = 1;
    let specialIterator = 1;
    message.mentions.members.forEach((member) => {
      specialBallot.push({
        name: `${member.user.tag}`,
        number: specialIterator++,
        votes: 0,
        voted: false
      });
      specialIterator = specialIterator++;
    });
    message.guild.members.forEach((member) => {
      ballot.push({
        name: `${member.user.tag}`,
        number: iterator++,
        votes: 0,
        voted: false
      });
      iterator = iterator++;
    });
    for (let i = 0; i < specialBallot.length; i++) {
      let ballotEntry = `${specialBallot[i].number}: ${specialBallot[i].name}`;
      ballotMessage += ballotEntry + "\n";
    }
    message.guild.members.forEach((member) => {
      if (!member.user.bot) {
        member.send(`${ballotMessage}\n\n!vote {number}`);
      }
    });
    client.ballotMessage = ballotMessage;
    client.voters = ballot;
    client.ballot = ballot;
  }
};
