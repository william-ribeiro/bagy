#!/bin/bash

yarn install
################################################
#............................starting migrations
################################################
yarn migration:run
yarn start:server


