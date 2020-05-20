class App {
  constructor() {
    this.isNavOpen = false;
    this.isLangOpen = false;
    this.catalog = JSON.parse($('header').attr('data-categories'));
    $('header').removeAttr('data-categories');
    this.langs = ['ua', 'ru'];
    if ($.cookie('lang') === undefined)
      // if the language is not set yet , set up ukrainian
      $.cookie('lang', this.langs[0]);
    if ($.cookie('cityId') === undefined || $.cookie('city') === undefined) {
      // if the city is not set yet , set up Kiev
      $.cookie('city', JSON.stringify({ ua: 'Київ', ru: 'Киев' }));
      $.cookie('cityId', '5ead741afb2e6a0f60012fdd');
    }
    $('#mainCity p').text(JSON.parse($.cookie('city'))[$.cookie('lang')]); // Changes city by cookie
  }
  mobileHeader() {
    $('#mobileCatalog').click(() => {
      // Opens the mobile catalog
      $('#catalog').css('display', 'flex');
      $('#greyBackgound').css('display', 'block');
    });

    $('#menuButton').click(() => {
      // Opens the mobile menu
      $('#mobileMenu1').css('display', 'flex');
      $('#greyBackgound').css('display', 'block');
    });

    $('#searchIcon').click(() => {
      // Opens the search
      $('#searchField').css('display', 'flex');
      $('#greyBackgound').css('display', 'block');
    });

    $('#catalog > .catalogElement').click(event => {
      // Opens the categories in the catalog and renders the elements dynamically
      $('#catalog2').css({ 'left': 0 });
      $('#headerOfCatalog2').find('h3').text(event.target.innerText);
      $('#catalog2').find('.catalogElement').remove();
      $('#catalog2').find('hr').remove();
      this.catalog[
        this.catalog.findIndex(i => i._id === event.target.getAttribute('data-category'))
      ].categories.forEach(element => {
        $('#headerOfCatalog2').after(`<a class="catalogElement" href="/shop/${element.link}"><span>${element.name[element.name.findIndex(nameOfCategory => nameOfCategory.lang === $.cookie('lang'))].name}</span></a>`);
      });
      $('#catalog2 .catalogElement').after('<hr />');
    });

    $('#headerOfCatalog2').find('button').click(() => {
      // Closes the categories in the catalog
      $('#catalog2').css({ 'left': '95vw' });
    });

    $('#mainCity').click(() => {
      $('#chooseCityBg').css('display', 'flex');
      this.chooseCity({
        input: $('#cities > input'),
        closeButton: $('#chooseHeaderSection > button'),
        window: $('#chooseCityBg')
      });
    });

    $('#chooseLanguage').click(() => {
      // Opens menu to choose language
      if (!this.isLangOpen)
        $('#panelWithAnotherLanguage').css('display', 'flex');
      else
        $('#panelWithAnotherLanguage').css('display', 'none');
      this.isLangOpen = !this.isLangOpen;
    });

    $('#panelWithAnotherLanguage').click(() => {
      // Changes language in the city
      if ($('#chooseLanguage').find('p').text() === 'RU') {
        $.cookie('lang', this.langs[0]);
        $('#chooseLanguage').find('p').text('UA');
        $('#panelWithAnotherLanguage').find('span').text('RU');
      }
      else if ($('#chooseLanguage').find('p').text() === 'UA') {
        $.cookie('lang', this.langs[1]);
        $('#chooseLanguage').find('p').text('RU');
        $('#panelWithAnotherLanguage').find('span').text('UA');
      }
      $('#panelWithAnotherLanguage').css('display', 'none');
      location.reload();
    });

    $('#searchReset').click(() => {
      $('#resultItems').find('.item , p').remove();
      $('#resultItems').append(`<p> ${$.cookie('lang') === 'ua' ? 'Результатів немає' : 'Результатов нет'} </p>`);
    });

    $('#searchText').on('input', e => {
      $.get('/findItem', { itemName: e.target.value }, info => {
        const items = JSON.parse(info);
        $('#resultItems').find('.item , p').remove();
        if (items.length === 0) {
          $('#resultItems').append(`<p> ${$.cookie('lang') === 'ua' ? 'Результатів немає' : 'Результатов нет'} </p>`);
        }
        else {
          for (let i of items) {
            $('#resultItems').append(`<a class="item" href="#"><img src="/img/products/${i.themes[0].major_photo}" alt="товар"><div class="info"><p class="nameOfItem">${i.name}</p><p class="price">${i.price}</p></div></a>`);
          }
        }
      });
    });

    $('#hotLine').click(() => {
      // Enable hotLineBg
      $('#hotLineBg').css('display', 'flex');
    });

    $('#hotLineBg .closeButton').click(() => {
      // Closes hotline window
      $('#hotLineBg').css('display', 'none');
      $('#hotLineWindow input').val('');
    });

    $('#hotLineWindow .redButton').click(() => {
      // Sends message to server and then to telegram chat with the phone
      const condition = /^\+?(\d{2,3})?\s?\(?\d{2,3}\)?[ -]?\d{2,3}[ -]?\d{2,3}[ -]?\d{2,3}$/i;
      const valueOfInput = $('#hotLineWindow input').val();
      const exactNumber = [...valueOfInput].filter(i => !isNaN(i) && i !== ' ').join('');
      if (valueOfInput.match(condition) !== null && (exactNumber.length === 10 || exactNumber.length === 12)) {
        $.get('/sendPhoneToRecall', { number: exactNumber } , info => alert(info));
        $('#hotLineBg').css('display', 'none');
        $('#hotLineWindow input').val('');
      }
      else alert('Вы ввели номер телефона некоректно , попробуйте ещё раз.')
    });
  }

  handlerForCities(e) {
    // Handler for elements when choosing a ctiy
    const cityObject = {};
    for (let i of JSON.parse(e.target.getAttribute('data-city'))) {
      cityObject[i.lang] = i.name;
    }
    $.cookie('cityId', e.target.getAttribute('data-id'));
    $.cookie('city', JSON.stringify(cityObject));
    $('#mainCity p').text(JSON.parse($.cookie('city'))[$.cookie('lang')]);
    $('#chooseCityBg').css('display', 'none');
  }

  chooseCity({ input, closeButton, window }) {
    // This method render information about available shops in the world
    // input - search input
    // closeButton - closing button
    // window - grey bg and the window itself
    input.on('input', () => {
      $.get('/chooseCity', { text: input.val(), lang: $.cookie('lang') }, cities => {
        const data = JSON.parse(cities);
        $('#cityList').find('.city , hr').remove();

        data.forEach(cityInfo => {
          // Creates city elements while searching
          $('#cityList').prepend(`<div class="city" data-id="${cityInfo._id}" data-city='${JSON.stringify(cityInfo.city)}'><span data-id='${cityInfo._id}' data-city='${JSON.stringify(cityInfo.city)}'>${cityInfo.city[cityInfo.city.findIndex(i => i.lang === $.cookie('lang'))].name}</span><b data-id="${cityInfo._id}" data-city='${JSON.stringify(cityInfo.city)}'>${cityInfo.name}</b></div><hr />`);
        });

        $('.city').click(e => {
          this.handlerForCities(e);
        });

      });
    });

    $('.city').click(e => {
      this.handlerForCities(e);
    });

    closeButton.click(() => {
      window.css('display', 'none');
    });
  }
  header() {

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
}

const app = new App();

if ($('body')[0].clientWidth < 1024) {
  $('#desktopHeader').remove();
  app.mobileHeader();
}
else {
  $('#mobileHeader').remove();
  app.header();
}
