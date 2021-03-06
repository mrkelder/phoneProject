class Header {
  constructor(app) {
    this.app = app; // Reqiured object of the whole application
    this.isNavOpen = false;
    this.isLangOpen = false;
    this.catalog = JSON.parse($('header').attr('data-categories'));
    $('header').removeAttr('data-categories');
  }

  mobileHeader() {

    this.app.setCity($('#mainCity p'));

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
      this.app.chooseCity({
        input: $('#cities > input'),
        closeButton: $('#chooseHeaderSection > button'),
        window: $('#chooseCityBg'),
        output: $('#cityList'),
        text: $('#mainCity p')
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
        $.cookie('lang', this.app.langs[0]);
        $('#chooseLanguage').find('p').text('UA');
        $('#panelWithAnotherLanguage').find('span').text('RU');
      }
      else if ($('#chooseLanguage').find('p').text() === 'UA') {
        $.cookie('lang', this.app.langs[1]);
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

    $('#searchText').on('input', async e => {
      // Searched for products (mobile)
      const resultBlock = $('#resultItems');
      this.app.findItem(
        {
          value: e.target.value,
          resultBlock: resultBlock,
          errorFunc() {
            resultBlock.append(`<p> ${$.cookie('lang') === 'ua' ? 'Результатів немає' : 'Результатов нет'} </p>`);
          },
          successFunc(items) {
            for (let i of items) {
              resultBlock.append(`<a class="item" href="#"><img src="/img/products/${i.themes[0].major_photo}" alt="товар"><div class="info"><p class="nameOfItem">${i.name}</p><p class="price">${i.price}</p></div></a>`);
            }
          }
        }
      );
    });

    $('#hotLine').click(() => {
      // Enable hotLineBg
      $('#hotLineBg').css('display', 'flex');
    });

    $('#hotLineBg .closeButton').click(() => {
      // Closes hotline window
      app.closeButton($('#hotLineBg'));
      $('#hotLineWindow input').val('');
    });

    $('#hotLineWindow .redButton').click(() => {
      // Sends message to server and then to telegram chat with the phone
      const condition = /^\+?(\d{2,3})?\s?\(?\d{2,3}\)?[ -]?\d{2,3}[ -]?\d{2,3}[ -]?\d{2,3}$/i;
      const valueOfInput = $('#hotLineWindow input').val();
      const exactNumber = [...valueOfInput].filter(i => !isNaN(i) && i !== ' ').join('');
      if (valueOfInput.match(condition) !== null && (exactNumber.length === 10 || exactNumber.length === 12)) {
        $.get('/sendPhoneToRecall', { number: exactNumber }, info => alert(info));
        $('#hotLineBg').css('display', 'none');
        $('#hotLineWindow input').val('');
      }
      else alert('Вы ввели номер телефона некоректно , попробуйте ещё раз.');
    });
  }

  header() {

    this.app.setCity($('#city span'));

    $('#resultsOfSearch').css('width', $('#searchField').css('width')); // Makes catalog the same width as search field

    $('#openCatalog').click(() => {
      // Opens the catalog
      if (this.isNavOpen) $('#catalog').css('display', 'none');
      else $('#catalog').css('display', 'flex');
      this.isNavOpen = !this.isNavOpen;
    });

    $('.catalogElement').mouseenter(e => {
      // when hover catalog
      const currentCategory = e.target.getAttribute('data-category');
      $('#productTopic').find(`[data-category="${currentCategory}"]`).css('background-color', '#f4f4f4');
    });

    $('.catalogElement').mouseleave(e => {
      // when leave catalog
      const currentCategory = e.target.getAttribute('data-category');
      $('#productTopic').find(`[data-category="${currentCategory}"]`).css('background-color', 'white');
    });

    $('.catalogElement').click(e => {
      // Generates companies in the catalog
      $('._products').find('*').remove();
      const currentCategory = e.target.getAttribute('data-category');
      try {
        const product = this.catalog[this.catalog.findIndex(i => i._id === currentCategory)];
        product.categories.forEach(i => {
          let allCompanies = '';
          i.companies.forEach(a => {
            // Creates a list of all companies
            allCompanies += `<a href="${a.link}">${a.name}</a>`;
          });
          $(`._products:nth-child(${i.position})`).append(`<div class="product"><h3>${i.name[i.name.findIndex(e => e.lang === $.cookie('lang'))].name}</h3>${allCompanies}</div>`)
        });
      }
      catch (err) {
        $(`._products:nth-child(2)`).append('<p class="catalogAnounce">Здесь пока что пусто</p>');
      }
      finally {
        $('#productTopic').find('*').css('background-color', 'white');
        $('#productTopic').find(`[data-category="${currentCategory}"]`).css('background-color', '#f4f4f4');
      }
    });

    $('#phoneNumber').click(() => {
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
        $.get('/sendPhoneToRecall', { number: exactNumber }, info => alert(info));
        $('#hotLineBg').css('display', 'none');
        $('#hotLineWindow input').val('');
      }
      else alert('Вы ввели номер телефона некоректно , попробуйте ещё раз.')
    });

    $('.changeLang').click(() => {
      // Changes language
      $.cookie('lang') === 'ua' ? $.cookie('lang', this.app.langs[1]) : $.cookie('lang', this.app.langs[0]);
      $('.changeLang').css('display', 'none');
      location.reload();
    });

    $('#searchText').on('input', e => {
      // Searches for products (desktop)
      const resultBlock = $('#resultsOfSearch');
      resultBlock.css('display', 'block');
      this.app.findItem(
        {
          value: e.target.value,
          resultBlock: resultBlock,
          errorFunc() {
            resultBlock.append(`<p> ${$.cookie('lang') === 'ua' ? 'Результатів немає' : 'Результатов нет'} </p>`);
          },
          successFunc(items) {
            for (let i of items) {
              resultBlock.append(`<a class="item" href="#"><img src="/img/products/${i.themes[0].major_photo}" alt="товар"><div class="info"><p class="nameOfItem">${i.name}</p><p class="price">${i.price}</p></div></a>`);
            }
          }
        }
      );
      if (e.target.value.length === 0) {
        // Checks is search empty
        resultBlock.css('display', 'none');
        $('#searchReset').css('display', 'none');
      }
      else {
        resultBlock.css('display', 'block');
        $('#searchReset').css('display', 'block');
      }
    });

    $('#searchReset').click(() => {
      // Resets search
      $('#searchReset').css('display', 'none');
    });

    $('#searchText').blur(() => {
      // Closes search results
      $('#resultsOfSearch').css('display', 'none');
    });

    $('#city').click(() => {
      $('#chooseCityBg').css('display', 'flex');
      $('#chooseCity input').on('input', e => {
        if (e.target.value.length === 0) {
          $('#cityOutput').css('display', 'none');
        }
        else {
          $('#cityOutput').css('display', 'flex');
        }
      });
      this.app.chooseCity({
        window: $('#chooseCityBg'),
        closeButton: $('#chooseCity .closeButton'),
        input: $('#chooseCity input'),
        output: $('#cityOutput'),
        text: $('#city span')
      });
    });
  }
}