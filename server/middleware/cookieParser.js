const parseCookies = (req, res, next) => {
  console.log('@    @   parseCookies running @    @   ')


  console.log("HEADERS: ", req.headers)
  console.log("COOKIES property: ", req.headers.cookie)

  if (req.headers.cookie === undefined){
     req.cookies = {};
  }else{
  var cookieString = req.headers.cookie;
  var cookiesArr = cookieString.split(";");
  var outputHeaders = {};
   for(var cookie of cookiesArr) {
     var arr = cookie.split("=")
     cookie = arr[1]
     var key = arr[0].trim()
     outputHeaders[key] = cookie;
     console.log("- - - - - - -THIS HEADER IS: ", outputHeaders);
   }
   req.cookies = outputHeaders;
   console.log('@@@@@@', )
  }
  next();
};

module.exports = parseCookies;