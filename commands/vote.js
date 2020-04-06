exports.run = (client, message, args) => {
  if (args[0] && !isNaN(args[0])) {
    let voted = searchName(message.author.tag, client.voters);
    let votedFor = searchNumber(parseInt(args[0]), client.ballot);
    if (voted && !voted.voted) {
      if (votedFor) {
        client.ballot[votedFor.index] = {
          name: votedFor.ballotEntry.name,
          number: votedFor.ballotEntry.number,
          votes: votedFor.ballotEntry.votes + 1,
          voted: votedFor.ballotEntry.voted
        };
        voted.voted = true;
        message.author.send("Vote Sent!");
      } else {
        message.author.send("User not found!");
      }
    } else {
      message.author.send("We couldn't find you, or you already voted!");
    }
  } else {
    message.author.send("Command syntax is wrong! please look at the help!");
  }
};

function searchNumber(numberKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].number === numberKey) {
      return {
        ballotEntry: myArray[i],
        index: i
      };
    }
  }
}

function searchName(numberName, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].name === numberName) {
      return myArray[i];
    }
  }
}
