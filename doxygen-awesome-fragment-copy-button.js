// SPDX-License-Identifier: MIT
/**

Doxygen Awesome
https://github.com/jothepro/doxygen-awesome-css

Copyright (c) 2022 - 2023 jothepro

*/

class DoxygenAwesomeFragmentCopyButton extends HTMLElement {
    constructor() {
        super();
        this.onclick=this.copyContent
    }
    static title = "Copy to clipboard"
    static copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`
    static successIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>`
    static successDuration = 980
    static init() {
        $(function() {
            $(document).ready(function() {
                if(navigator.clipboard) {
                    const fragments = document.getElementsByClassName("fragment")
                    for(const fragment of fragments) {
                        const fragmentWrapper = document.createElement("div")
                        fragmentWrapper.className = "doxygen-awesome-fragment-wrapper"
                        const fragmentCopyButton = document.createElement("doxygen-awesome-fragment-copy-button")
                        fragmentCopyButton.innerHTML = DoxygenAwesomeFragmentCopyButton.copyIcon
                        fragmentCopyButton.title = DoxygenAwesomeFragmentCopyButton.title
                
                        fragment.parentNode.replaceChild(fragmentWrapper, fragment)
                        fragmentWrapper.appendChild(fragment)
                        fragmentWrapper.appendChild(fragmentCopyButton)
            
                    }
                }
            })
        })
    }


    copyContent() {
        const content = this.previousSibling.cloneNode(true)
        // filter out line number from file listings
        content.querySelectorAll(".lineno, .ttc").forEach((node) => {
            node.remove()
        })
        let textContent = content.textContent
        // remove trailing newlines that appear in file listings
        let numberOfTrailingNewlines = 0
        while(textContent.charAt(textContent.length - (numberOfTrailingNewlines + 1)) == '\n') {
            numberOfTrailingNewlines++;
        }
        textContent = textContent.substring(0, textContent.length - numberOfTrailingNewlines)
        navigator.clipboard.writeText(textContent);
        this.classList.add("success")
        this.innerHTML = DoxygenAwesomeFragmentCopyButton.successIcon
        window.setTimeout(() => {
            this.classList.remove("success")
            this.innerHTML = DoxygenAwesomeFragmentCopyButton.copyIcon
        }, DoxygenAwesomeFragmentCopyButton.successDuration);
    }
}

customElements.define("doxygen-awesome-fragment-copy-button", DoxygenAwesomeFragmentCopyButton)
