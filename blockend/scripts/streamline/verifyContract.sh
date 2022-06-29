#!/bin/bash


export $(grep -v '^#' .env | xargs)

npx hardhat verify --network rinkeby $CONTRACT_ADDRESS
