var http=require('https');

var url;
url="http://www.google.com/index.html";
//url="http://www.baidu.com";
url="https://www.twitter.com";

http.get(url, function(res) {
  console.log("Got response: " + res.statusCode);
	res.on('data', function(chunk){
		//console.log(chunk.toString() );
	});
}).on('error', function(e) {
  console.log("Got error: " + e.message);
})