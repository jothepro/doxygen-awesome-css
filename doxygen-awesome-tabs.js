/**

Doxygen Awesome
https://github.com/jothepro/doxygen-awesome-css

MIT License

Copyright (c) 2023 jothepro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

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