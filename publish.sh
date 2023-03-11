#!/usr/bin/env bash

ng build --baseHref="https://www.simon-liebl.de/CashRegister/"
npx angular-cli-ghpages --dir=dist/CashRegister

