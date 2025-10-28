// SPDX-License-Identifier: MIT
/**

Doxygen Awesome
https://github.com/jothepro/doxygen-awesome-css

Copyright (c) 2023 - 2025 jothepro

*/

class DoxygenAwesomeTabs {

   static init() {
    window.addEventListener("load", () => {
        document.querySelectorAll(".tabbed:not(:empty)").forEach((tabbed, tabbedIndex) => {
            let tabLinkList = [];
            tabbed.querySelectorAll(":scope > .tab-title").forEach((tab, tabIndex) => {
                let tabContainer = document.createElement("li");
                tabContainer.id = "tab_" + tabbedIndex + "_" + tabIndex;
                tab.title = tab.textContent;

                let tabLink = document.createElement("button");
                tabLink.classList.add("tab-button");
                tabLink.appendChild(tab);

                tabLink.addEventListener("click", () => {
                    tabbed.querySelectorAll(":scope > .tab-title").forEach((tab) => {
                        tab.parentElement.classList.remove("selected");
                    });
                    tabLinkList.forEach((tabLink) => {
                        tabLink.classList.remove("active");
                    });
                    tabContainer.classList.add("selected");
                    tabLink.classList.add("active");
                });

                tabLinkList.push(tabLink);
                if (tabIndex === 0) {
                    tabContainer.classList.add("selected");
                    tabLink.classList.add("active");
                }

                tabbed.insertBefore(tabContainer, tabbed.querySelector(":scope > ul"));
                tabContainer.appendChild(tabLink);
            });

            let tabsOverview = document.createElement("div");
            tabsOverview.classList.add("tabs-overview");
            let tabsOverviewContainer = document.createElement("div");
            tabsOverviewContainer.classList.add("tabs-overview-container");
            tabLinkList.forEach((tabLink) => {
                tabsOverview.appendChild(tabLink);
            });
            tabsOverviewContainer.appendChild(tabsOverview);
            tabbed.before(tabsOverviewContainer);

            function resize() {
                let maxTabHeight = 0;
                tabbed.querySelectorAll(":scope > .tab-title").forEach((tab, tabIndex) => {
                    let visibility = tab.style.display;
                    tab.style.display = "block";
                    maxTabHeight = Math.max(tab.offsetHeight, maxTabHeight);
                    tab.style.display = visibility;
                });
                tabbed.style.height = `${maxTabHeight + 10}px`;
            }

            resize();
            new ResizeObserver(resize).observe(tabbed);
        });
    });
}
    static resize(tabbed) {
        
    }
}