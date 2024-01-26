# Front-end Project for Full-stack

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)

This project requires implementation of TypeScript and SASS.

## Requirement

1. Use the API endpoint from your backend project to create an e-commerce website.
2. Create at lease 4 pages (can be more if you want): Page for all products, product page,
   profile page (only available if user logins), and cart page (cart page could be a page or a modal)
3. Create Redux store for following features:
   - product reducer: get all products, find a single products, filter products by
     categories, sort products by price. Create, update and delete a product (enable update & delete features only for admin of the webapp)
   - user reducer: register and login
   - cart reducer: add product to cart, remove products, update products's quantity in cart
4. When adding routers to your application, programatically set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.
5. Implement unit testing for the reducers
6. Deploy the application and rewrite README file.

## Bonus

1. Use context API to switch theme
2. Use pagination when fetching/displaying all the products
3. Implement performance optimization where applicable

## Instruction to start the project

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


[![Test & Build frontend](https://github.com/arf1e/library/actions/workflows/test-and-build.yml/badge.svg)](https://github.com/arf1e/library/actions/workflows/test-and-build.yml)

# Introduction

Frontend of a non-existent library.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

## Table of content

- [Technologies](#technologies)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Running tests](#running-tests)
- [Deployment link](#deployment-link)

## Technologies

- Typescript
- React
- React Router
- Redux (Toolkit)
- Sass 

## Project structure

```
.
├── public
└── src
    ├── components
    |   └── admin
    |   └── assets
    |   └── common
    |   └── filters
    |   └── shoppingcart
    ├── hooks
    ├── pages
    ├── redux
    |   └── reducers
    |   └── selectors
    ├── schemas
    ├── services
    ├── styles
    |   └── extentions
    |   └── shared
    |   └── variables
    ├── test
    └── types
  

```

## Getting started

1. Clone this repo with `git clone https://github.com/gayang/fs16-front-end-FS.git` command.
1. Install project dependencies using `npm ci` or `npm install` command.
1. Run the app with `npm start`.

## Running tests

1. Use `npm run test` command to run tests;
2. Use `npm run coverage` command to generate coverage report.

## Deployment link

