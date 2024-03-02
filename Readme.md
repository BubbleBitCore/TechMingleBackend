<h1 style="color:lightgreen;text-align:center;padding-bottom:1.5rem">TechMingle Backend</h1>

A brief description to setup the project and more.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

 Install and Include any prerequisites or dependencies that need to be installed beforehand.We will be using modular syntax to maintain consistency across all apllications i.e <span style="font-weight:bold;color:red;">"type": "module"</span> Observe [package.json](./package.json) 

```bash
npm install
```

 ``Note:`` Environment variables are stored in data folder. <span style="font-weight:bold;color:deepskyblue;">data/config.env</span> . Ask the administrator to furnish the contents of the .env file.


## Usage

The Entry point of this project is <span style="font-size:larger; font-weight:bold;color:green;">Index.js</span> .

```javascript
import Boot from "./data/Boot.js";

// Booting up the system 
Boot()
```

### Run in Development Environment
<span style="color:yellow">Install nodemon globally</span>
```bash
npm i -g nodemon
```
<span style="color:lime">Run Project</span>
```bash
npm run dev
```

## Project Heirarchy
```
TechMingleBackend/
│
├── index.js
│
├── controllers/
│   ├── AdminController.js
│   ├── UserController.js
│   ├── PodCastModel.js
│   :  
:
│
├── models/
│   ├── UserModel.js
│   ├── PodCastModel.js
│   :  
│
├── routes/
│   ├── UserRoutes.js
│   ├── AdminRoutes.js
│   ├── PodCastRoutes.js
│   :  
│
└── utils/
    ├── emails.js
    :
```
## Features

Here, we will be handling following features.

- User Authentication
- File uploads
- Database integrations
- Firebase integrations
- DashBoard...

## Contributing

We Encourage you to contribute to our project. Following are the guidelines to contribute.

1. Fork the project
2. Commit your changes (`git commit -m 'Added some AmazingFeature'`)
3. Push to the main branch (`git push `)
4. Open a pull request

## License

Specify the license under which your project is distributed.

This project is licensed under the [MIT License](#).
