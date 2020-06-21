class Item extends Slider {
  constructor(obj) {
    super(obj);

    const { slider } = obj;

    slider.css('height', '450px');
  }
}

const items = new Item({
  slider: $('#topItemsSlider'),
  slider_block: $('#topItemsSliding'),
  slider_panel: $('#topItemsPanel'),
  render_func(obj) {
    const { slider, slider_block, currentSLide, slider_panel } = obj;
    try {
      JSON.parse(slider.attr('data-slides')).array.forEach(i => {
        if (i.length === 0 || i === undefined) slider_block.append(`<picture class="slide"><img style="width: 100%" src="/img/files/notFound.jpg" alt="not found" height="100%" width="100%"/></picture>`);
        else {
          let stars = '';
          for (let num = 0; num < i.rating; num++) {
            stars += '<img class="star" src="/img/files/star_active.png"/>';
          }
          for (let num = 5 - i.rating; num > 0; num--) {
            stars += '<img class="star" src="/img/files/star.png"/>';
          }
          slider_block.append(`
            <div class="slide top_item">
              <div style="background-image: url('/img/products/${i.img}')" class="item_photo"></div>
              <p>${i.name}</p>
              <div class="item_rating">
                ${stars}
              </div>
              <span>${i.price}</span>
              <div class="top_item_buttons">
                <button class="details">Подробнее</button>
                <button class="compare"></button>
                <button class="favorite"></button>
              </div>
            </div>
          `);
        }
      });
    }
    catch (err) {
      console.error(err.message);
      slider_block.append(`<picture class="slide"><img src="/img/files/notFound.jpg" alt="not found" height="100%" width="100%"/></picture>`);
    }
    finally {
      $('.slider_btn')[currentSLide].checked = true;
      $('.top_item').css('height' , '450px');
      slider_panel.remove();
    }
    return undefined;
  }
});