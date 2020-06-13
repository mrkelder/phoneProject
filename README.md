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

### slider.js

Takes place in **/static/js/slider.js**

*slider.js* contains *Slider* class that can be used in order to create sliders.

This class takes an object as the parameter

`
{
  slider: 'slider wrapper',
  slider_block: 'sliding element that contains slides'
}
`

Constructor contains

1. this.isClicked - is slider being slided
2. this.posStart - starting position of touch or click
2. this.posEnd - ending position of touch or click
3. this.misha - replaces starting coordinates
4. this.currentSlide - the index of current slide (start from 0)
5. this.sector - the width of on slide
6. this.onePiece - this.sector devided by 4
7. this.margin - margin from the left and the right sides
8. this.slider - slider itself
9. this.slider_block - Sliding element

Methods

1. finalSlide - takes currentPosition and calculates in wich side to move the slider. If you're in the **first** sector , the slider rotates left. If you're in the **fourth** sector , the slider rotates right. If you're in the **third** or **second** , slider doesn't rotate anywhere , but returns to the previous position. 
2. createSlides - generally creates slides and radio buttons , makes the first radio button checked.
3. mSlider - creates functionality for mobile and tablet versions (touch event).
4. cSlider - creates functionality for laptop and PC versions (mouse event).