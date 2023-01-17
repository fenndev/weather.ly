export default interface Page {
    pageElement: HTMLElement,
    generatePage(): HTMLElement,
    removePage(): void
}