/**
 * main-nav constructor
 * @param id
 * @param params
 * @constructor
 */

function MainMenuGm(id, params) {

    var duration = (params.duration || 0.4);
    var self = this;

    this.menu = document.getElementById(id);
    this.button = this.menu.getElementsByClassName('navigation-main__minimize-icon')[0];
    this.menuList = this.menu.getElementsByClassName('navigation-main__menu-list')[0];
    this.menuItems = this.menu.getElementsByClassName('navigation-main__link');


    for (var i = 0; i < this.button.children.length; i++) {
        this.button.children[i].style.transitionDuration = duration + 's';
    }

    this.menuList.style.transitionDuration = params.duration + 's';

    this.isMenuClose = function () {
        return (getComputedStyle(this.menuList).height === '0px');
    };

    this.menuOpen = function () {
        this.menuList.style.height = this.menuList.scrollHeight + 'px';
    };

    this.menuClose = function () {
        this.menuList.style.height = '';
    };

    this.addButtonOpened = function () {
        this.button.classList.add('navigation-main__minimize-icon_opened');
    };

    this.removeButtonOpened = function () {
        this.button.classList.remove('navigation-main__minimize-icon_opened');
    };

    this.menuToggle = function () {
        if (this.isMenuClose()) {
            this.menuOpen();
            this.addButtonOpened();
        } else {
            this.menuClose();
            this.removeButtonOpened();
        }
    };

    this.button.onclick = function () {
        self.menuToggle();
    };

    for(var j=0; j< this.menuItems.length; j++){
        this.menuItems[j].onclick = function () {
            self.menuClose();
            self.removeButtonOpened();
        }
    }

}
/**
 * initialise main navigation menu
 * @type {MainMenuGm}
 */
var mainMenu = new MainMenuGm('main-nav', {duration: 0.5});
