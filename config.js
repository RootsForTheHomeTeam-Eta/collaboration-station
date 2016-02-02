module.exports = {
  'SECRET': 'teamrootsforthehometeamisawesome',
  'DBURI': '',
  'MONGOURI': 'mongodb://localhost:27017/roots_app'
};

//// script to create admin user:
//db.users.insert({"orgName": "Roots for the Home Team",
//                 "firstName": "Admin",
//                 "lastName": "User",
//                 "username": "admin@testing.com",
//                 "password": "testing",
//                 "isAdmin": "true"});
//
//// script to create test user
//db.users.insert({"orgName": "Prime Digital Academy",
//                 "firstName": "Test",
//                 "lastName": "User",
//                 "username": "user@testing.com",
//                 "password": "testing",
//                 "isAdmin": "false"});