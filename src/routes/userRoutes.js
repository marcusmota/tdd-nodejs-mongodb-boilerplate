const userController = require("./../controllers/userController");

module.exports = function(app){

  app.post('/v1/user/sign-in', userController.signIn);
  app.post('/v1/user', userController.post);
  app.get('/v1/users', userController.getAll);

};
