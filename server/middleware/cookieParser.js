// const parseCookies = (req, res, next) => {
//   // console.log('@    @   parseCookies running @    @   ')


//   // console.log("HEADERS: ", req.headers)
//   // console.log("COOKIES property: ", req.headers.cookie)

//   if (req.headers.cookie === undefined) {
//     req.cookies = {};
//   } else {
//     var cookieString = req.headers.cookie;
//     var cookiesArr = cookieString.split(';');
//     var outputHeaders = {};
//     for (var cookie of cookiesArr) {
//       var arr = cookie.split('=');
//       cookie = arr[1];
//       var key = arr[0].trim();
//       outputHeaders[key] = cookie;
//     //  console.log("- - - - - - -THIS HEADER IS: ", outputHeaders);
//     }
//     req.cookies = outputHeaders;
   
//   }
//   next();
// };

// module.exports = parseCookies;

const parseCookies = (req, res, next) => {

  let cookieString = req.get('Cookie') || '';

  parsedCookies = cookieString.split('; ').reduce((cookies, cookie) => {
    if (cookie.length) {
      let index = cookie.indexOf('=');
      let key = cookie.slice(0, index);
      let token = cookie.slice(index + 1);
      cookies[key] = token;
    }
    return cookies;
  }, {});

  req.cookies = parsedCookies;

  next();
};

module.exports = parseCookies;