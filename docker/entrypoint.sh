#!/bin/sh
npm install \
    && npm run build \ 
    && node build/index.js