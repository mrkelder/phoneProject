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
            $('#chooseCityBg').css('display' , 'flex');
            this.chooseCity({
                input: $('#cities > input'),
                closeButton: $('#chooseHeaderSection > button'),
                window: $('#chooseCityBg')
            });
        });
    }
    chooseCity({ input ,  closeButton , window}){
        // input - search input
        // closeButton - closing button
        // window - grey bg and the window itself
        input;
        closeButton.click(() => {
            window.css('display' , 'none');
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
