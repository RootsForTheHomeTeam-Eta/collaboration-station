module.exports = {
  'SECRET': 'teamrootsforthehometeamisawesome',
  'DBURI': '',
  'MONGOURI': 'mongodb://localhost:27017/roots_app'
};

// script to create admin user:
//db.users.insert({"orgName": "Roots for the Home Team",
//                 "firstName": "Susan",
//                 "lastName": "Moores",
//                 "username": "admin@testing.com",
//                 "password": "testing",
//                 "isAdmin": "true"});