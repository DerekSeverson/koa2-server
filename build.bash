#!/bin/bash

echo 'Starting Build';

node_modules/.bin/babel lib -d dist;

echo 'Finished Build';
