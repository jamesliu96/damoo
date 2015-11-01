#!/bin/sh

if [ -z "$1" ]; then
	open http://localhost:8888/damoo.html
else
	open http://localhost:8888/$1.html
fi
node app
