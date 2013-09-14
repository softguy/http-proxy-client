var debug=require('util').debug;
var hookapi=require('hookapi');
var url=require('url');

var proxyhost='localhost';
var proxyport=1080;

//### get http_proxy from environment variable
//		with format 'http://localhost:8087'
//
if (process.env['http_proxy']){
	var o=url.parse(process.env['http_proxy']);
	debug(o);
	//console.log(o);
	if (o.hostname){
		proxyhost=o.hostname;
	}
	if (o.port){
		proxyport=o.port;
	}
	debug('using http proxy, host='+proxyhost+',port='+proxyport);
}

hookapi.hook('http', 'request', 
		function(options, callback){
			debug('*** HOOKED http.request:');
			debug(options);			
			//options.hosts="localhost";
			
			if (typeof options === 'string') {
				//debug(_url);
				var options0=options;
				
				options = url.parse(options);				
				options.path=options0;				
			} else {
				debug('in http');
				debug('options is object');
				var options0=options;
				//var newpath=url.format(options0);
				//debug('new path is:'+newpath);				
				var newpath='http://'+options0.host+options0.path;
				options.path=newpath;				
			}
			options.host=proxyhost;
			options.hostname=proxyhost;
			options.port= proxyport;
			//options.headers={
			//	Host: "www.twitter.com"
			//}
			debug('NEW options:');			
			debug(options);			
			
			//call back to original method
			return hookapi.gethook('http')['request'].oldf.apply(this, arguments);
		}
);
