# http-proxy-client for nodejs 

## Introduction

Allow node's http and https module and all modules that depends on them such as oauth, ahr able to  connect through a http proxy.

Node's http and https module are very useful.

However, there is one shortcoming: it does not support connecting through a firewall/proxy. 

It is very difficult for those debug/test behind a company firewall, or those using third party proxy servers (such as GAE) to use the http or https directly.

It is OK/relatively for those who call the http/https directly to connect to the proxy server first and then pass the destination url through the proxy. However, if you are using some third party moudles, such as oauth, which internally uses http or https, then you are out of luck.

Now, I have make a simple httpproxy and httpsproxy that solved this problem.

And it is extremly simple to use: simply require the httpproxy module BEFORE loading your main server and it will pick up the httpproxy settings from environment variable

## Install

	$ npm install http-proxy-client
	or get it from the github
		
## Usage & Examples

	set http_proxy=http://localhost:8087
	node requialall.js httpproxy.js testhttp.js
		
## How it works
		
	by hookapi of the http module, http and https module NOW transparently support http_proxy environment variable without any change.

## LICENSE
	MIT
	
## TODO
	* support other opertations such as POST/PUT/DELETE
	* better coverage for https


