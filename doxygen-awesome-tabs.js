// SPDX-License-Identifier: MIT
/**

Doxygen Awesome
https://github.com/jothepro/doxygen-awesome-css

Copyright (c) 2023 jothepro

*/

class DoxygenAwesomeTabs {
    
    static init() {
        window.addEventListener("load", () => {
            document.querySelectorAll(".tabbed:not(:empty)").forEach((tabbed, tabbedIndex) => {
                let tabLinkList = []
                let tabTitles = []
                tabbed.querySelectorAll(":scope > ul > li").forEach((tab, tabIndex) => {
                    tab.id = "tab_" + tabbedIndex + "_" + tabIndex
                    let header = tab.querySelector(".tab-title")
                    let tabLink = document.createElement("button")
                    tabLink.classList.add("tab-button")
                    tabLink.appendChild(header)
                    tab.title = header.textContent
                    header.title = tab.title
                    tabTitles.push(tab.title)
                    tabLink.addEventListener("click", () => {
                        if (tabbed.classList.contains("linked")) {
                            let selectedTabs = JSON.parse(localStorage.selectedTabs)
                            document.querySelectorAll(".tabbed:not(:empty)").forEach((tabbed) => {
                                tabbed.querySelectorAll(":scope > ul").forEach((list) => {
                                    if (list.querySelector(`:scope > li[title="${tab.title}"]`) == null) {
                                        return
                                    }
                                    list.querySelectorAll(":scope > li").forEach((tab) => {
                                        tab.classList.remove("selected")
                                        if (tab.title == header.textContent) {
                                            tab.classList.add("selected")
                                            selectedTabs[tabTitles.join(';')] = tab.title
                                        }
                                    })
                                })
                            })
                            document.querySelectorAll(".tabs-overview").forEach((tabsOverview) => {
                                if (tabsOverview.querySelector(`:scope > .tab-button > b[title="${tab.title}"]`) == null) {
                                    return
                                }
                                tabsOverview.querySelectorAll(`.tab-button`).forEach(tabButton => {
                                    tabButton.classList.remove("active")
                                    if (tabButton.querySelector(`:scope > b[title="${tab.title}"]`) != null) {
                                        tabButton.classList.add("active")
                                    }
                                })
                            })
                            localStorage.selectedTabs = JSON.stringify(selectedTabs)
                        } else {
                            tabbed.querySelectorAll(":scope > ul > li").forEach((tab) => {
                                tab.classList.remove("selected")
                            })
                            tabLinkList.forEach((tabLink) => {
                                tabLink.classList.remove("active")
                            })
                            tab.classList.add("selected")
                            tabLink.classList.add("active")
                        }
                    })
                    tabLinkList.push(tabLink)
                })
                let tabsOverview = document.createElement("div")
                tabsOverview.classList.add("tabs-overview")
                let tabsOverviewContainer = document.createElement("div")
                tabsOverviewContainer.classList.add("tabs-overview-container")
                tabLinkList.forEach((tabLink) => {
                    tabsOverview.appendChild(tabLink)
                })

                // Initialize selected tabs
                if (tabbed.classList.contains("linked")) {
                    let selectedTabs = 'selectedTabs' in localStorage 
                        ? JSON.parse(localStorage.selectedTabs) : {}
                    if (!(tabTitles.join(';') in selectedTabs)) {
                        selectedTabs[tabTitles.join(';')] = tabTitles[0]
                    }
                    tabbed.querySelectorAll(":scope > ul > li")[tabTitles.indexOf(selectedTabs[tabTitles.join(';')])].classList.add("selected")
                    tabLinkList[tabTitles.indexOf(selectedTabs[tabTitles.join(';')])].classList.add('active')
                    localStorage.selectedTabs = JSON.stringify(selectedTabs)
                } else {
                    tabbed.querySelector(":scope > ul > li").classList.add("selected")
                    tabLinkList[0].classList.add('active')
                }

                tabsOverviewContainer.appendChild(tabsOverview)
                tabbed.before(tabsOverviewContainer)
            })
        })
    }
}