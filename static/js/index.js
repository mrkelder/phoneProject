const app = new App();
const slider = new Slider({ slider: $('.slider'), slider_block: $('.slider_block') });

if ($('body')[0].clientWidth < 1024) {
  $('#desktopHeader').remove();
  app.mobileHeader();
  slider.mSlider();
}
else {
  $('#mobileHeader').remove();
  app.header();
  slider.cSlider();
}

