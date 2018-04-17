var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Nuno'
  }

  setTimeout(() => {
    callback(user);
  }, 3000);
}

getUser(21, (user) => {
  console.log(user);
});
