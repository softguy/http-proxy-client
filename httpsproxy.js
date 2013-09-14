var debug=require('util').debug;
var hookapi=require('hookapi');
var url=require('url');

var net=require('net');

var proxyhost='localhost';
var proxyport=1080;

//### get http_proxy from environment variable
//		with format 'http://localhost:8087'
//
if (process.env['http_proxy']){
	var o=url.parse(process.env['http_proxy']);
	debug(o);
	//debug(o);
	if (o.hostname){
		proxyhost=o.hostname;
	}
	if (o.port){
		proxyport=o.port;
	}
	debug('using http proxy, host='+proxyhost+',port='+proxyport);
}

//### let https also go through an http web proxy
hookapi.hook('https', 'request', 
		function(options, callback){
			debug('*** HOOKED https.request:');
			debug(options);			
			//options.hosts="localhost";
			
			if (typeof options === 'string') {
				//debug(_url);
				var options0=options;
				
				options = url.parse(options);				
				options.path=options0;				
			} else {
				debug('in https');
				debug('options is object');
				var options0=options;
				if (!options.protocol){
					if (options.port==443){
				//		options.protocol='https';
					}
				}
				//var newpath=_url.format(options0);	//not working
				newpath='https://'+options0.host+options0.path;
				debug('new path is:'+newpath);				
				options.path=newpath;				
			}
			//assume this is a http proxy that works for both http AND https
			options.protocol="http:";
			options.host="localhost";
			options.hostname="localhost";
			options.port= 8087;

			//May not necessary
			//options.createConnection=net.createConnection;

			debug(options);			
			//return oldrequest(options, callback);
			//return _http.request(options, callback);
			
			//call back to original method
			//return hookapi.gethook('https')['request'].oldf.apply(this, arguments);
			//Cannot call back
			return require('http').request.apply(this, arguments);
	 }
);

		/*
		//### hook https.get
		//NO need since it also goes to request method internally
		var newget=function(options, callback){
			debug('*** HOOKED https.get');
			debug(options);
			//options.hosts="localhost";
			//
			return oldget(options, callback);
			//return _http.get(options, callback);
		}	
		*/		
