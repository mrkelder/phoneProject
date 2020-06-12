const app = new App();
const header = new Header(app);
const slider = new Slider({ slider: $('.slider'), slider_block: $('.slider_block') });

if ($('body')[0].clientWidth < 1024) {
  $('#desktopHeader').remove();
  header.mobileHeader();
  slider.mSlider();
}
else {
  $('#mobileHeader').remove();
  header.header();
  slider.cSlider();
}

