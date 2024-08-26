export default {
    renderElement: function(element) {
        element.querySelector("p").style.cssText = "margin-bottom: 0.5rem;";
    },
    init: async function() {
        const observer = new MutationObserver(() => {
            const theme = document.documentElement.getAttribute("data-bs-theme");
            const root = document.querySelector(':root');
            root.style.setProperty("color-scheme", theme);
        }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-bs-theme'] })
        for (const element of document.getElementsByClassName("image-caption")) {
            this.renderElement(element)
        }
    }
}