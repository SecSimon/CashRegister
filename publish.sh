#!/usr/bin/env bash

ng build --baseHref="https://www.simon-liebl.com/CashRegister/"
npx angular-cli-ghpages --dir=dist/CashRegister

