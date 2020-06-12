# Phone Shop Project

This is an online shop project , that is being written in nodeJS. This is an open-source project.

So let me know if I did something wrong or you could do better. Thanks!

## Basic commands and requirements

Follow the instructions below to run the project.

1. npm i - command to download all dependencies
2. node app - command to run the project
3. npm run sass - command to run SCSS interpretation
4. this project is using *mongodb* , so download it if you haven't got that

## Navigation in git flow

Here you can see the whole git flow of the current project

![The git flow itself](/static/img/files/gitFlow.png "git flow")

## Files

### header.js

Takes place in **/static/js/header.js**

*header.js* contains *Header* class that can be used in order to manipulate the header (either pc or mobile).

This method relies on *App* class that you can find in *app.js* file.

*Header* takes *new App()* as the only parameter.

Constructor contains

1. this.app - reference to the *App's* instance
2. this.isNavOpen - either nav panel open or not
3. this.isLangOpen - either language panel open or not
4. this.catalog - catalog for the items (e.g. phones , laptops and so on)
5. $('header').removeAttr('data-categories') - removes data attribute from header

There are two methods in *Header* class
1. mobileHeader - header functionality for mobile verion and tablets
2. header - header functionality for laptops and PC