// const express = require('express');
// const path = require('path');
// const utils = require('./lib/hashUtils');
// const partials = require('express-partials');
// const bodyParser = require('body-parser');
// const Auth = require('./middleware/auth');
// const models = require('./models');

// const app = express();

// app.set('views', `${__dirname}/views`);
// app.set('view engine', 'ejs');
// app.use(partials());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../public')));



// app.get('/',
//   (req, res) => {
//     res.render('index');
//   });

// app.get('/create',
//   (req, res) => {
//     res.render('index');
//   });

// app.get('/links',
//   (req, res, next) => {
//     models.Links.getAll()
//       .then(links => {
//         res.status(200).send(links);
//       })
//       .error(error => {
//         res.status(500).send(error);
//       });
//   });

// app.post('/links',
//   (req, res, next) => {
//     var url = req.body.url;
//     if (!models.Links.isValidUrl(url)) {
//     // send back a 404 if link is not valid
//       return res.sendStatus(404);
//     }

//     return models.Links.get({ url })
//       .then(link => {
//         if (link) {
//           throw link;
//         }
//         return models.Links.getUrlTitle(url);
//       })
//       .then(title => {
//         return models.Links.create({
//           url: url,
//           title: title,
//           baseUrl: req.headers.origin
//         });
//       })
//       .then(results => {
//         return models.Links.get({ id: results.insertId });
//       })
//       .then(link => {
//         throw link;
//       })
//       .error(error => {
//         res.status(500).send(error);
//       })
//       .catch(link => {
//         res.status(200).send(link);
//       });
//   });

// /************************************************************/
// // Write your authentication routes here
// /************************************************************/

// app.get('/signup', (req, res)=>{
//   res.render('signup');
// });
// app.get('/login', (req, res)=>{
//   res.render('login');
// });

// app.post('/login', (req, res, next) => {
//   var username = req.body.username;
//   var password = req.body.password;

//   return models.Users.get({ username })
//     .then(user => {

//       if (!user || !models.Users.compare(password, user.password, user.salt)) {
//         // user doesn't exist or the password doesn't match
//         throw new Error('Username and password do not match');
//       }

//       return models.Sessions.update({ hash: req.session.hash }, { userId: user.id });
//     })
//     .then(() => {
//       res.redirect('/');
//     })
//     .error(error => {
//       res.status(500).send(error);
//     })
//     .catch(() => {
//       res.redirect('/login');
//     });
// });

// app.get('/logout', (req, res, next) => {

//   return models.Sessions.delete({ hash: req.cookies.shortlyid })
//     .then(() => {
//       res.clearCookie('shortlyid');
//       res.redirect('/login');
//     })
//     .error(error => {
//       res.status(500).send(error);
//     });
// });



// app.post('/signup', (req, res, next) => {
//   var username = req.body.username;
//   var password = req.body.password;

//   return models.Users.get({ username })
//     .then(user => {
//       if (user) {
//         // user already exists; throw user to catch and redirect
//         throw user;
//       }

//       return models.Users.create({ username, password });
//     })
//     .then(results => {
//       return models.Sessions.update({ hash: req.session.hash }, { userId: results.insertId });
//     })
//     .then(() => {
//       res.redirect('/');
//     })
//     .error(error => {
//       res.status(500).send(error);
//     })
//     .catch(user => {
//       res.redirect('/signup');
//     });
// });






// // if (req.body.username === undefined) {
// //   // send back a 404 if link is not valid

// //   return res.sendStatus(404);
// // }
// // var { username, password } = req.body;

// // return models.Users.get( {username })
// // .then(user => {
// //   if (user) {

// //     console.log('USER ALREADY EXISTS' ,user);

// //     res.redirect('/login').end()
// //     return;
// //   }
// //   return {
// //     username: req.body.username,
// //     password: req.body.password,
// //   }
// // })
// // .error(error => {
// //   res.status(500).send(error);
// // })
// // .then(options =>   models.Users.create(options))
// // .then(user => {
// //   // console.log('WE MADE A POST WEEEE')
// //   res.status(201).send(user).end()
// // })





// // app.post('/login', (req, res, next) => {
// //   // console.log("@@@@@@", req.body.username)
// //   // console.log('@@@@@@', req.body.password)
// //   // var {username, password } = req.body;

// //   return models.Users.get({ username: req.body.usename})
// //   .then(user => {
// //     console.log("here is our user", user.id)
// //     console.log('hi')
// //   })

// //   // if (req.body.username === undefined) {

// //   //   // send back a 404 if link is not valid
// //   //   return res.sendStatus(404);
// //   // }
// //   // // models.users.get
// //   // debugger;
// //   // return models.Users.get({'username': req.body.username})
// //   // .then((user)=>{
// //   //   console.log('______ITSWORKING ON 133______')
// //   //   console.log('____________', user, ' user____________')
// //   // })
// //   .error((e)=>{
// //     // console.log('error on line 138 of app ', e);
// //     res.sendStatus(403).end()
// //   })
// //   //.then user  = > take the propery off the user from the databse
// //   // pass ingto compare
// //   //if else compare result (true false)
// //   //thens
// //     // return models.Users.compare( password, hashedPasswordFromDBUser, salt ) // password is undefined
// //     // .error(error => {
// //     //   res.status(500).send(error);
// //     // })
// //     // .then((match)=>{
// //     //   if (!match){
// //     //     res.sendStatus(403).set({ location: '/login' }).end()
// //     //     console.log('password did not match!')
// //     //   }
// //     //   // return res;
// //     // })
// //     .then(() => {

// //         res.sendStatus(200).send("yay").set({ location: '/login' }).end()
// //         // console.log('%%%% --- ', res.headers.location, '---%%%%')
// //       }
// //     )

// // })




// /************************************************************/
// // Handle the code parameter route last - if all other routes fail
// // assume the route is a short code and try and handle it here.
// // If the short-code doesn't exist, send the user to '/'
// /************************************************************/

// app.get('/:code', (req, res, next) => {

//   return models.Links.get({ code: req.params.code })
//     .tap(link => {

//       if (!link) {
//         throw new Error('Link does not exist');
//       }
//       return models.Clicks.create({ linkId: link.id });
//     })
//     .tap(link => {
//       return models.Links.update(link, { visits: link.visits + 1 });
//     })
//     .then(({ url }) => {
//       res.redirect(url);
//     })
//     .error(error => {
//       res.status(500).send(error);
//     })
//     .catch(() => {
//       res.redirect('/');
//     });
// });

// module.exports = app;







// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$



const express = require('express');
const path = require('path');
const utils = require('./lib/hashUtils');
const partials = require('express-partials');
const bodyParser = require('body-parser');
const Auth = require('./middleware/auth');
const models = require('./models');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));


app.use(require('./middleware/cookieParser'));
app.use(Auth.createSession);

app.get('/', Auth.verifySession, (req, res) => {
  res.render('index');
});

app.get('/create', Auth.verifySession, (req, res) => {
  res.render('index');
});

app.get('/links', Auth.verifySession, (req, res, next) => {
  models.Links.getAll()
    .then(links => {
      res.status(200).send(links);
    })
    .error(error => {
      res.status(500).send(error);
    });
});

app.post('/links', Auth.verifySession, (req, res, next) => {
  var url = req.body.url;
  if (!models.Links.isValidUrl(url)) {
    // send back a 404 if link is not valid
    return res.sendStatus(404);
  }

  return models.Links.get({ url })
    .then(link => {
      if (link) {
        throw link;
      }
      return models.Links.getUrlTitle(url);
    })
    .then(title => {
      return models.Links.create({
        url: url,
        title: title,
        baseUrl: req.headers.origin
      });
    })
    .then(results => {
      return models.Links.get({ id: results.insertId });
    })
    .then(link => {
      throw link;
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(link => {
      res.status(200).send(link);
    });
});

/************************************************************/
// Write your authentication routes here
/************************************************************/


app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res, next) => {
  var {username, password} = req.body;

  return models.Users.get({ username })
    .then(user => {
      if (!user || !models.Users.compare(password, user.password, user.salt)) {
        // user doesn't exist or the password doesn't match
        throw new Error('Username and password do not match');
      }
      return models.Sessions.update({ hash: req.session.hash }, { userId: user.id });
    })
    .then(() => {
      res.redirect('/');
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(() => {
      res.redirect('/login');
    });
});

app.get('/logout', (req, res, next) => {

  return models.Sessions.delete({ hash: req.cookies.shortlyid })
    .then(() => {
      res.clearCookie('shortlyid');
      res.redirect('/login');
    })
    .error(error => {
      res.status(500).send(error);
    });
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', (req, res, next) => {
  var {username, password} = req.body;

  return models.Users.get({ username })
    .then(exists => {
      if (exists) {
        // user already exists; throw user to catch and redirect
        throw exists;
      }

      return models.Users.create({ username, password });
    })
    .then(user => {
      return models.Sessions.update({ hash: req.session.hash }, { userId: user.insertId });
    })
    .then(() => {
      res.redirect('/');
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(user => {
      res.redirect('/signup');
    });
});

/************************************************************/
// Handle the code parameter route last - if all other routes fail
// assume the route is a short code and try and handle it here.
// If the short-code doesn't exist, send the user to '/'
/************************************************************/

app.get('/:code', (req, res, next) => {

  return models.Links.get({ code: req.params.code })
    .tap(link => {

      if (!link) {
        throw new Error('Link does not exist');
      }
      return models.Clicks.create({ linkId: link.id });
    })
    .tap(link => {
      return models.Links.update(link, { visits: link.visits + 1 });
    })
    .then(({ url }) => {
      res.redirect(url);
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(() => {
      res.redirect('/');
    });
});

module.exports = app;
