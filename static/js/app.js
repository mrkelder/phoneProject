class App {
    constructor() {
        this.isNavOpen = false;
    }
    mobileHeader() {
        $('#mobileCatalog').click(() => {
            $('#catalog').css('display' , 'flex');
            $('#greyBackgound').css('display' , 'block');
        });

        $('#menuButton').click(() => {
            $('#mobileMenu1').css('display' , 'flex');
            $('#greyBackgound').css('display' , 'block');
        });

        $('#searchIcon').click(() => {
            $('#searchField').css('display' , 'flex');
            $('#greyBackgound').css('display' , 'block');
        }); 
    }
    header(){
        
    }
    closeButton(element , ...elements){
        // element is the element that we wonna close
        // elements are several extra elements that we wonna close if they're required
        $(`#${element}`).css('display' , 'none');
        if(elements.length !== 0){
            elements.forEach(element => {
                $(`#${element}`).css('display' , 'none');
            });
        }
    }
}

const app = new App();

if($('body')[0].clientWidth < 1024){
    $('#desktopHeader').remove();
    app.mobileHeader();
}
else{
    $('#mobileHeader').remove();
    app.header();
}
    