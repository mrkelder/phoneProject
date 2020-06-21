class Slider {
  constructor({ slider, slider_block, slider_panel, render_func }) {
    this.slider = slider; // Slider
    this.slider_block = slider_block; // Sliding element
    this.slider_panel = slider_panel; // Pannel with buttons
    this.render_func = render_func; // Function to render slides
    this.buttons; // Radio buttons' cursor

    this.isClicked = false; // Is the slider being in action
    this.posStart = 0; // The end position 
    this.posEnd = 0; // The start position
    this.misha = 0; // Replaced X coordinate
    this.currentSlide = 0; // the position of current slide (from 0)
    this.sector = parseInt(slider.css('width')); // width of one slide
    this.onePiece = this.sector / 4; // One sector of the whole slider
    this.margin = parseInt(slider.css('margin-left')); // Margin (if it exists)
  }

  finalSlide(currentPosition) {
    // Decides which slide to pick out (depends in wich zone your finger or cursor was)
    switch (true) {
      case currentPosition <= this.onePiece * 1 + this.margin * 2:
        if (this.currentSlide !== this.slider_block.find('.slide').length - 1) {
          this.currentSlide++;
          this.slider_block.css('transform', `translate3d(-${this.sector * this.currentSlide}px , 0 ,0)`);
        }
        else {
          this.slider_block.css('transform', `translate3d(-${this.sector * this.currentSlide}px , 0 ,0)`);
        }
        break;
      case currentPosition <= this.onePiece * 2 + this.margin * 2:
        this.slider_block.css('transform', `translate3d(-${this.sector * this.currentSlide}px , 0 ,0)`);
        break;
      case currentPosition <= this.onePiece * 3 + this.margin * 2:
        this.slider_block.css('transform', `translate3d(-${this.sector * this.currentSlide}px , 0 ,0)`);
        break;
      case currentPosition <= this.onePiece * 4 + this.margin * 2:
        if (this.currentSlide !== 0) {
          this.currentSlide--;
          this.slider_block.css('transform', `translate3d(-${this.sector * this.currentSlide}px , 0 ,0)`);
        }
        else {
          this.slider_block.css('transform', `translate3d(-${this.sector * this.currentSlide}px , 0 ,0)`);
        }
        break;
    }
    if (this.buttons !== undefined) {
      for (let i of this.buttons) {
        i.checked = false;
      }
      this.buttons[this.currentSlide].checked = true;
    }
  }

  createSlides() {
    // Creates slides
    this.buttons = this.render_func({
      slider: this.slider,
      slider_block: this.slider_block,
      currentSLide: this.currentSlide,
      slider_panel: this.slider_panel,
    });
    if (this.buttons !== undefined)
      this.buttons.on('input', e => {
        const value = Number(e.target.value);
        this.slider_block.css('transform', `translate3d(-${value * this.sector}px , 0 , 0)`);
        this.currentSlide = value;
        this.misha = parseInt(this.slider_block[0].style.transform.match(/-?\d{0,}px/)[0]);
      });

    this.slider_block.find('.slide').css('width', this.sector); // Gets width of one slidec
    $('img').on('dragstart', e => { e.preventDefault(); }); // Prevents photo dragging
  }

  mSlider() {
    // Slider logic for mobile
    this.createSlides();

    this.slider[0].addEventListener("touchstart", e => {
      this.slider_block.css('transition', 'none');
      this.posStart = Math.floor(e.changedTouches[0].clientX);
      this.isClicked = true;
    });

    this.slider[0].addEventListener("touchmove", e => {
      try {
        this.slider_block.css('transform', `translate3d(${(Math.floor(e.changedTouches[0].clientX) + this.misha) - this.posStart}px ,0 , 0)`);
      }
      catch (err) {
        this.slider_block.css('transform', 'translate3d(0px , 0 , 0)');
      }
    });

    this.slider[0].addEventListener("touchend", e => {
      this.slider_block.css('transition', 'transform .3s');
      this.posEnd = Math.floor(e.changedTouches[0].clientX);
      this.finalSlide(this.posEnd);
      this.misha = parseInt(this.slider_block[0].style.transform.match(/-?\d{0,3}px/)[0]);
      this.isClicked = false;
    });
  }

  cSlider() {
    // Slider logic for pc
    this.createSlides();

    this.slider[0].addEventListener("mousedown", e => {
      this.slider_block.css('transition', 'none');
      this.posStart = Math.floor(e.x);
      this.isClicked = true;
    });

    this.slider[0].addEventListener("mousemove", e => {
      if (this.isClicked) {
        try {
          this.slider_block.css('transform', `translate3d(${((Math.floor(e.x) + this.misha) - this.posStart)}px ,0 , 0)`);
        }
        catch (err) {
          this.slider_block.css('transform', 'translate3d(0px , 0 , 0)');
        }
      }
    });

    this.slider[0].addEventListener("mouseup", e => {
      this.slider_block.css('transition', 'transform .3s');
      this.posEnd = Math.floor(e.x);
      this.finalSlide(this.posEnd);
      this.misha = parseInt(this.slider_block[0].style.transform.match(/-?\d{0,}px/)[0]);
      this.isClicked = false;
    });

    this.slider[0].addEventListener("mouseleave", () => {
      // When you leave slider while sliding it
      if (this.isClicked) {
        this.slider_block.css('transition', 'transform .3s');
        this.finalSlide(this.onePiece * 2);
        this.misha = this.currentSlide * this.sector;
        this.isClicked = false;
      }
    });
  }
}