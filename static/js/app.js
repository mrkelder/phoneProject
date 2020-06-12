class App {
  constructor() {
    this.langs = ['ua', 'ru'];
    if ($.cookie('lang') === undefined)
      // if the language is not set yet , set up ukrainian
      $.cookie('lang', this.langs[0]);
    if ($.cookie('cityId') === undefined || $.cookie('city') === undefined) {
      // if the city is not set yet , set up Kiev
      $.cookie('city', JSON.stringify({ ua: 'Київ', ru: 'Киев' }));
      $.cookie('cityId', '5ead741afb2e6a0f60012fdd');
    }
  }

  setCity(element) {
    // Changes city by cookie
    element.text(JSON.parse($.cookie('city'))[$.cookie('lang')]);
  }

  handlerForCities(e, text) {
    // Handler for elements when choosing a ctiy
    const cityObject = {};
    for (let i of JSON.parse(e.target.getAttribute('data-city'))) {
      cityObject[i.lang] = i.name;
    }
    $.cookie('cityId', e.target.getAttribute('data-id'));
    $.cookie('city', JSON.stringify(cityObject));
    text.text(JSON.parse($.cookie('city'))[$.cookie('lang')]);
    $('#chooseCityBg').css('display', 'none');
  }

  chooseCity({ input, closeButton, window, output, text }) {
    // This method renders information about available shops in the world
    // input - search input
    // closeButton - closing button
    // window - grey bg and the window itself
    // output - site where cities take place
    // text - title with city
    input.on('input', () => {
      $.get('/chooseCity', { text: input.val(), lang: $.cookie('lang') }, cities => {
        const data = JSON.parse(cities);
        output.find('.city , hr').remove();

        data.forEach(cityInfo => {
          // Creates city elements while searching
          output.prepend(`<div class="city" data-id="${cityInfo._id}" data-city='${JSON.stringify(cityInfo.city)}'><span data-id='${cityInfo._id}' data-city='${JSON.stringify(cityInfo.city)}'>${cityInfo.city[cityInfo.city.findIndex(i => i.lang === $.cookie('lang'))].name}</span><b data-id="${cityInfo._id}" data-city='${JSON.stringify(cityInfo.city)}'>${cityInfo.name}</b></div><hr />`);
        });

        $('.city').click(e => {
          this.handlerForCities(e, text);
        });

      });
    });

    $('.city').click(e => {
      this.handlerForCities(e, text);
    });

    closeButton.click(() => {
      window.css('display', 'none');
    });
  }

  closeButton(element, ...elements) {
    // element is the element that we wonna close
    // elements are several extra elements that we wonna close if they're required
    $(`#${element}`).css('display', 'none');
    if (elements.length !== 0) {
      elements.forEach(element => {
        $(`#${element}`).css('display', 'none');
      });
    }
  }
  findItem({ value, resultBlock, errorFunc, successFunc }) {
    $.get('/findItem', { itemName: value }, info => {
      const items = JSON.parse(info);
      resultBlock.find('.item , p').remove();
      if (items.length === 0) errorFunc();
      else successFunc(items);
    });
  }
}
