class App {
    constructor() {
        this.isNavOpen = false;
        this.catalog = {
            'Телефоны': [
                { name: 'Смартфоны', link: 'item3123123' },
                { name: 'Кнопочные телефоны', link: 'item3123123' },
                { name: 'SIM', link: 'item3123123' }
            ],
            'Ноутбуки': [
                { name: 'Ноутбуки', link: 'item3123123' },
                { name: 'Планшеты', link: 'item3123123' },
                { name: 'Компьютеры', link: 'item3123123' },
                { name: 'Электронные книги', link: 'item3123123' },
                { name: 'Мониторы', link: 'item3123123' },
                { name: 'Моноблоки', link: 'item3123123' }
            ],
            'Часы': [
                { name: 'Механические часы', link: 'item3123123' },
                { name: 'Электронные часы', link: 'item3123123' },
                { name: 'Смарт часы', link: 'item3123123' }
            ],
            'ТВ': [
                { name: 'Телевизоры', link: 'item3123123' },
                { name: 'Проекторы', link: 'item3123123' },
                { name: 'ТВ приставки', link: 'item3123123' },
                { name: 'Колонки', link: 'item3123123' }
            ],
            'Наушники': [
                { name: 'Наушники', link: 'item3123123' },
                { name: 'Микрофон', link: 'item3123123' },
                { name: 'Вакумные наушники', link: 'item3123123' }
            ]
        };
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
            // Opens the categories in the catalog
            $('#catalog2').css({ 'left': 0 });
            $('#headerOfCatalog2').find('h3').text(event.target.innerText);
            $('#catalog2').find('.catalogElement').remove();
            $('#catalog2').find('hr').remove();
            this.catalog[event.target.innerText].forEach(element => {
                $('#headerOfCatalog2').after(`<a class="catalogElement" href="/shop/${element.link}"><span>${element.name}</span></a>`);
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
            $('#panelWithAnotherLanguage').css('display' , 'flex');
        });

        $('#panelWithAnotherLanguage').click(() => {
            // Changes language in the city
            if($('#chooseLanguage').find('p').text() === 'RU'){
                $.cookie('lang', this.langs[0]);
                $('#chooseLanguage').find('p').text('UA');
                $('#panelWithAnotherLanguage').find('span').text('RU');
            }
            else if($('#chooseLanguage').find('p').text() === 'UA'){
                $.cookie('lang', this.langs[1]);
                $('#chooseLanguage').find('p').text('RU');
                $('#panelWithAnotherLanguage').find('span').text('UA');
            }
            $('#panelWithAnotherLanguage').css('display' , 'none');
            location.reload();
        });
    }

    handlerForCities(e){
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
