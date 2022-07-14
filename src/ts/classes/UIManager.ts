export default class UIManager {
    
    public static UIState = {
        MainMenu: 0,
        WeatherDisplay: 1,
    } as const;
    
    // Generates initial splash screen
    public initializeSplash(): void {
        this.generateHeader();
        this.generateMain();
    }

    private generateHeader(): void {
        // Create Header Elements
        const container = document.querySelector('.container');
        const header = document.createElement('header');
        const headerLogoContainer = document.createElement('div');
        const headerText = document.createElement('h1');
        const headerSubtext = document.createElement('h2');
        const headerNav = document.createElement('nav');
        const homeButton = document.createElement('button');
        const creditsButton = document.createElement('button');

        // Set Text Content
        headerText.textContent = 'weather.ly';
        headerSubtext.textContent = 'simple and clean weather';
        homeButton.textContent = 'home';
        creditsButton.textContent = 'credits';

        // Set Classes and Attributes
        header.classList.add('header');
        headerLogoContainer.classList.add('header__logo');
        headerNav.classList.add('header__nav');

        // Append
        header.appendChild(headerLogoContainer);
        headerLogoContainer.appendChild(headerText);
        headerLogoContainer.appendChild(headerSubtext);
        header.appendChild(headerNav);
        headerNav.appendChild(homeButton);
        headerNav.appendChild(creditsButton);
        container.appendChild(header);
    }

    private generateMain(): void {
        const container = document.querySelector('.container');
        // Create Main Body
        const main = document.createElement('main');
        const searchForm = document.createElement('form');
        const searchLabel = document.createElement('label');
        const searchInputContainer = document.createElement('div');
        const searchText = document.createElement('input');
        const searchButton = document.createElement('button');

        // Set Classes and Attributes
        searchForm.classList.add('search');
        searchLabel.classList.add('search__label');
        searchInputContainer.classList.add('search__input');
        searchText.classList.add('search__text');
        searchButton.classList.add('search__button');
        searchLabel.setAttribute('for', 'search__text');
        searchText.setAttribute('type', 'text');
        searchText.setAttribute('placeholder', 'london');
        searchLabel.textContent = 'enter a location';
        searchButton.textContent = 'submit';

        // Append
        main.appendChild(searchForm);
        searchForm.appendChild(searchLabel);
        searchForm.appendChild(searchInputContainer);
        searchInputContainer.appendChild(searchText);
        searchForm.appendChild(searchButton);
        container.appendChild(main);

    }
}