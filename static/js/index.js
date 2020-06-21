const app = new App();
const header = new Header(app);
const slider = new Slider({
  slider: $('#slider'),
  slider_block: $('#slider_block'),
  slider_panel: $('#slider_panel'),
  render_func(obj) {
    const { slider, slider_block, currentSLide, slider_panel} = obj;
    try {
      JSON.parse(slider.attr('data-slides')).photos.forEach((i, index) => {
        // Renders slides
        if (i.length === 0 || i === undefined) slider_block.append(`<picture class="slide"><img style="width: 100%" src="/img/files/notFound.jpg" alt="not found" height="100%" width="100%"/></picture>`);
        else slider_block.append(`
          <picture class="slide">
            <source srcset="/img/promotions/${i.m} 1x" media="(max-width: 768px)"/>
            <source srcset="/img/promotions/${i.pc} 1x" media="(min-width: 768px)" draggble="false"/>
            <img style="width: 100%" src="/img/files/notFound.jpg" alt="not found"/>
          </picture>
        `);
        slider_panel.append(`<input type="radio" name="slider" value="${index}" class="slider_btn"/>`);
      });
    }
    catch (err) {
      console.error(err.message);
      slider_block.append(`<picture class="slide"><img src="/img/files/notFound.jpg" alt="not found" height="100%" width="100%"/></picture>`);
    }
    finally {
      $('.slider_btn')[currentSLide].checked = true;
    }
    return $('.slider_btn');
  }
});

if ($('body')[0].clientWidth < 1024) {
  $('#desktopHeader').remove();
  header.mobileHeader();
  slider.mSlider();
  items.mSlider();
}
else {
  $('#mobileHeader').remove();
  header.header();
  slider.cSlider();
  items.cSlider();
}

