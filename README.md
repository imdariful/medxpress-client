# MedXpress - Client

Welcome to MedXpress, an Angular-based web application designed to streamline the interaction between customers and shops in the medical supply domain. This project leverages Angular version 16.2.6 and employs PNPM as the package manager. If you prefer NPM, you can delete the `pnpm-lock.yaml` file and run `npm install` to generate `package-lock.json`.

## Table of Contents

- [Overview](#overview)
- [Defined Routes](#defined-routes)
  - [Customer Routes](#customer-routes)
  - [Shop Routes](#shop-routes)
- [Development Server](#development-server)
- [Code Scaffolding](#code-scaffolding)
- [Build](#build)
- [Running Unit Tests](#running-unit-tests)
- [Running End-to-End Tests](#running-end-to-end-tests)
- [Further Help](#further-help)
- [Documentation](#documentation)
- [Client Side](#client-side)

## Overview

MedXpress is built using Angular 16.2.6 and utilizes PNPM as the package manager. The application serves as a platform facilitating seamless interactions between customers and shops in the medical supply domain.

## Defined Routes

### Customer Routes

- **Customer Login / Registration:** `/customer/select`
- **Customer Registration:** `/customer/register`
- **Customer Login:** `/customer/login`
- **Customer Dashboard:** `/home`
- **Customer Category:** `/category`
- **Customer Product:** `/products/:productId`
- **Customer Cart:** `/cart`
- **Customer Profile:** `/profile`

### Shop Routes

- **Shop Login / Registration:** `/shop/select`
- **Shop Registration:** `/shop/register`
- **Shop Login:** `/shop/login`
- **Shop Dashboard:** `/shop/dashboard`
- **Shop Inventory:** `/shop/dashboard/inventory`
- **Shop Orders:** `/shop/dashboard/orders`

## Development Server

To run the development server, execute `ng serve` and navigate to `http://localhost:4200/`. The application will automatically reload if you make any changes to the source files.

## Code Scaffolding

Use `ng generate component component-name` to generate a new component. You can also utilize `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Execute `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

Run `ng test` to execute unit tests via [Karma](https://karma-runner.github.io).

## Running End-to-End Tests

Run `ng e2e` to execute end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further Help

For more help on the Angular CLI, use `ng help` or refer to the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Documentation

Read the full documentation for the MedXpress Client [here](https://imdariful.github.io/medxpress-client/).

## Server Side

Explore the [MedXpress - Server](https://github.com/imdariful/medxpress-server) repository.
