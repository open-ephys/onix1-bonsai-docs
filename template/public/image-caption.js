export default {
    renderElement: function(element) {
        const wrap = document.createElement("div");
        wrap.style.cssText = 'margin-bottom: 0.5rem;';
        const parent = element.parentElement;
        const caption = document.createElement("div");
        caption.innerHTML = element.querySelector("p:last-child").textContent;
        caption.style.cssText = "text-align: center;";
        element.querySelector("p:last-child").remove();
        parent.insertBefore(wrap, element);
        wrap.appendChild(element);
        wrap.appendChild(caption);
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