class DoxygenAwesomeReadtheDocsSearch {
  static searchResultsText=[
    "Sorry, no pages matching your query.",
    "Search finished, found <b>1</b> page matching the search query.",
    "Search finished, found <b>$num</b> pages matching the search query.",
  ];

  static get serverUrl() {
    const serverUrlSuffix = '_/api/v3/';
    const domainName = globalThis.location.hostname;
    console.log(`Domain name: ${domainName}`);

    if (domainName === 'localhost') {
      let tmpServerUrl = serverUrl;
      while (tmpServerUrl.endsWith('/')) {
        tmpServerUrl = tmpServerUrl.slice(0, -1);
      }
      console.warn('Localhost detected, you probably need to bypass CORS');
      return `${tmpServerUrl}/${serverUrlSuffix}`;
    }
    return `https://${domainName}/${serverUrlSuffix}`;
  }

  static init() {
    const realSearchBox = globalThis.SearchBox;
    globalThis.SearchBox = function(name, resultsPath, extension) {
      if (realSearchBox) {
        realSearchBox.call(this, name, resultsPath, extension);
      }

      this.OnSearchFieldFocus = function() {};

      const originalClose = this.CloseResultsWindow;
      this.CloseResultsWindow = function() {
        if (originalClose) {
          originalClose.call(this);
        }
        const field = this.DOMSearchField ? this.DOMSearchField() : null;
        if (field?.id === document.activeElement?.id) {
          return;
        }
      };
    };

    // Re-focus the search input if it is replaced in the DOM while focused.
    // On mobile, viewport resize (triggered by the OSK opening) can cause
    // menu.js resetState() to recreate the input element, losing focus.
    const observer = new MutationObserver(function() {
      const field = document.getElementById('MSearchField');
      if (field && DoxygenAwesomeReadtheDocsSearch._searchFieldHadFocus) {
        field.focus();
      }
    });

    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
      DoxygenAwesomeReadtheDocsSearch._attachLiveSearch();
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        observer.observe(document.body, { childList: true, subtree: true });
        DoxygenAwesomeReadtheDocsSearch._attachLiveSearch();
      });
    }

    document.addEventListener('focusin', function(e) {
      if (e.target?.id === 'MSearchField') {
        DoxygenAwesomeReadtheDocsSearch._searchFieldHadFocus = true;
      }
    });
    document.addEventListener('focusout', function(e) {
      if (e.target?.id === 'MSearchField') {
        setTimeout(function() {
          DoxygenAwesomeReadtheDocsSearch._searchFieldHadFocus = false;
        }, 0);
      }
    });

    document.addEventListener('click', function(e) {
      const dropdown = document.getElementById('RTDLiveResults');
      const field = document.getElementById('MSearchField');
      if (dropdown && !dropdown.contains(e.target) && e.target !== field) {
        DoxygenAwesomeReadtheDocsSearch._hideLiveResults();
      }
    });

    globalThis.searchFor = function(query, page, count) {
      const results = document.getElementById('searchresults');

      // Get the title
      const pageTitle = document.querySelector('div.title');
      const originalTitle = pageTitle ? pageTitle.textContent : '';
      let pageTitleStates = ["Searching", "Searching .", "Searching ..", "Searching ..."];
      let pageTitleIndex = 0;

      // Function to update the page title
      function updatePageTitle() {
        if (pageTitle) pageTitle.textContent = pageTitleStates[pageTitleIndex];
        pageTitleIndex = (pageTitleIndex + 1) % pageTitleStates.length;
      }

      // Start the interval to update the page title
      let titleInterval = setInterval(updatePageTitle, 500);

      // The summary will be displayed at the top of the search results
      let resultSummary = document.createElement('p');
      resultSummary.className = 'search-summary';
      results.appendChild(resultSummary);

      // Put all results into an unordered list
      let resultList = document.createElement('ul');
      resultList.className = 'search';
      results.appendChild(resultList);

      // readthedocs metadata
      let projectSlug = DoxygenAwesomeReadtheDocsSearch.getMetaValue("readthedocs-project-slug") || "doxygen-awesome-css";
      let projectVersion = DoxygenAwesomeReadtheDocsSearch.getMetaValue("readthedocs-version-slug") || "latest";

      const ctx = {
        query, resultSummary, resultList, titleInterval, pageTitle, originalTitle, firstUrl: true
      };

      // pull requests are not indexed, so use the default version
      const versionReady = /^\d+$/.test(projectVersion)
          ? DoxygenAwesomeReadtheDocsSearch.getReadTheDocsDefaultVersion(projectSlug)
          : Promise.resolve(projectVersion);

      versionReady.then(function(resolvedVersion) {
        const url = `${DoxygenAwesomeReadtheDocsSearch.serverUrl}search/?q=project:${projectSlug}/${resolvedVersion}+${query}&page=${page + 1}&page_size=${count}`;
        console.log(url);
        DoxygenAwesomeReadtheDocsSearch.fetchResults(url, ctx);
      });
    }
  }

  static _attachLiveSearch() {
    let debounceTimer = null;

    function onInput() {
      clearTimeout(debounceTimer);
      const field = document.getElementById('MSearchField');
      if (!field) return;
      const query = field.value.trim();
      if (!query) {
        DoxygenAwesomeReadtheDocsSearch._hideLiveResults();
        return;
      }
      debounceTimer = setTimeout(function() {
        DoxygenAwesomeReadtheDocsSearch._runLiveSearch(query);
      }, 300);
    }

    function attachToField() {
      const field = document.getElementById('MSearchField');
      if (!field || field._rtdLiveSearchAttached) return;
      field._rtdLiveSearchAttached = true;
      field.setAttribute('autocomplete', 'off');
      field.addEventListener('input', onInput);
      field.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          DoxygenAwesomeReadtheDocsSearch._hideLiveResults();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          DoxygenAwesomeReadtheDocsSearch._moveLiveResultFocus(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          DoxygenAwesomeReadtheDocsSearch._moveLiveResultFocus(-1);
        } else if (e.key === 'Enter') {
          const focused = document.querySelector('#RTDLiveResults .rtd-live-item:focus');
          if (focused) {
            e.preventDefault();
            focused.click();
          }
        }
      });
    }

    attachToField();

    // Re-attach when the DOM changes (e.g. menu.js recreates the field on mobile)
    const fieldObserver = new MutationObserver(attachToField);
    fieldObserver.observe(document.body, { childList: true, subtree: true });
  }

  static _runLiveSearch(query) {
    const projectSlug = DoxygenAwesomeReadtheDocsSearch.getMetaValue("readthedocs-project-slug") || "doxyconfig";
    const projectVersion = DoxygenAwesomeReadtheDocsSearch.getMetaValue("readthedocs-version-slug") || "latest";

    const versionReady = /^\d+$/.test(projectVersion)
        ? DoxygenAwesomeReadtheDocsSearch.getReadTheDocsDefaultVersion(projectSlug)
        : Promise.resolve(projectVersion);

    versionReady.then(function(resolvedVersion) {
      const url = `${DoxygenAwesomeReadtheDocsSearch.serverUrl}search/?q=project:${projectSlug}/${resolvedVersion}+${query}&page=1&page_size=5`;
      fetch(url)
        .then(function(response) {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then(function(data) {
          DoxygenAwesomeReadtheDocsSearch._showLiveResults(query, data.results || []);
        })
        .catch(function() {
          DoxygenAwesomeReadtheDocsSearch._hideLiveResults();
        });
    });
  }

  static _showLiveResults(query, results) {
    let dropdown = document.getElementById('RTDLiveResults');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.id = 'RTDLiveResults';
      document.body.appendChild(dropdown);
    }

    dropdown.innerHTML = '';

    if (results.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'rtd-live-empty';
      empty.textContent = 'No results found.';
      dropdown.appendChild(empty);
    } else {
      const list = document.createElement('ul');
      list.className = 'rtd-live-list';
      for (const item of results) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'rtd-live-item';
        a.href = `${item.domain}${item.path}`;
        a.tabIndex = 0;

        const title = document.createElement('span');
        title.className = 'rtd-live-title';
        title.textContent = item.title;
        a.appendChild(title);

        if (item.blocks && item.blocks.length > 0) {
          const snippet = document.createElement('span');
          snippet.className = 'rtd-live-snippet';
          let snipHtml = item.blocks[0].highlights.content.join(' … ');
          snipHtml = snipHtml.replaceAll(/<span>(.*?)<\/span>/g, '<mark>$1</mark>');
          snippet.innerHTML = snipHtml;
          a.appendChild(snippet);
        }

        li.appendChild(a);
        list.appendChild(li);
      }
      dropdown.appendChild(list);
    }

    DoxygenAwesomeReadtheDocsSearch._positionLiveResults(dropdown);
    dropdown.style.display = 'block';
  }

  static _positionLiveResults(dropdown) {
    const field = document.getElementById('MSearchField');
    const box = document.getElementById('MSearchBox');
    const anchor = box || field;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const scrollY = window.scrollY;
    const viewportWidth = document.documentElement.clientWidth;
    dropdown.style.top = `${rect.bottom + scrollY}px`;
    dropdown.style.left = '';
    dropdown.style.right = `${viewportWidth - rect.right}px`;
    dropdown.style.minWidth = `${Math.max(rect.width, 260)}px`;
  }

  static _hideLiveResults() {
    const dropdown = document.getElementById('RTDLiveResults');
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  }

  static _moveLiveResultFocus(direction) {
    const items = Array.from(document.querySelectorAll('#RTDLiveResults .rtd-live-item'));
    if (items.length === 0) return;
    const current = document.activeElement;
    const idx = items.indexOf(current);
    let next;
    if (idx === -1) {
      next = direction > 0 ? items[0] : items.at(-1);
    } else {
      next = items[idx + direction];
    }
    if (next) next.focus();
  }

  static fetchResults(url, ctx) {
    fetch(url)
      .then(function(response) {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(function(data) {
        // Add the query to the search field
        // This seems only be working if applied in the fetch success handler...
        // maybe the field is not available before this point
        const searchField = document.getElementById('MSearchField');
        if (searchField) searchField.value = ctx.query;

        if (ctx.firstUrl) {
          if (data.count === 1) {
            ctx.resultSummary.innerHTML = DoxygenAwesomeReadtheDocsSearch.searchResultsText[1];
          } else if (data.count > 1) {
            ctx.resultSummary.innerHTML = DoxygenAwesomeReadtheDocsSearch.searchResultsText[2].replace(/\$num/, data.count);
          } else {
            ctx.resultSummary.innerHTML = DoxygenAwesomeReadtheDocsSearch.searchResultsText[0];
          }
          ctx.firstUrl = false;
        }

        data.results.forEach(function(item) {
          DoxygenAwesomeReadtheDocsSearch.appendResultItem(ctx.resultList, item);
        });

        if (data.next) {
          DoxygenAwesomeReadtheDocsSearch.fetchResults(data.next, ctx);
        } else {
          // Clear the interval when the search is complete
          clearInterval(ctx.titleInterval);
          if (ctx.pageTitle) ctx.pageTitle.textContent = ctx.originalTitle;
        }
      });
  }

  static appendResultItem(resultList, item) {
    const resultItem = document.createElement('li');
    resultItem.className = 'search-result';
    const resultItemUrl = `${item.domain}${item.path}`;
    const resultItemTitleLink = document.createElement('a');
    const resultItemTitleHeading = document.createElement('h3');
    resultItemTitleHeading.appendChild(resultItemTitleLink);
    resultItemTitleLink.href = resultItemUrl;
    resultItemTitleLink.textContent = item.title;
    resultItem.append(resultItemTitleHeading);
    resultList.append(resultItem);

    const resultItemParagraph = document.createElement('p');
    resultItemParagraph.className = 'context';
    for (const block of item.blocks) {
      let blockContent = block.highlights.content.join(', ');
      blockContent = blockContent.replaceAll(/<span>(.*?)<\/span>/g, '<span class="highlighted">$1</span>');
      resultItemParagraph.innerHTML += blockContent;

      const blockName = `#${block.title.toLowerCase().replaceAll(' ', '-')}`;
      const blockUrl = resultItemUrl + blockName;
      const blockLink = document.createElement('a');
      blockLink.href = blockUrl;
      blockLink.textContent = "More...";
      resultItemParagraph.append(document.createTextNode(' '));
      resultItemParagraph.append(blockLink);
      resultItemParagraph.append(document.createElement('br'));
    }
    resultItem.append(resultItemParagraph);
  }

  // Function to extract the value of a specified Read the Docs meta property
  static getMetaValue(propertyName) {
    const metaTags = document.getElementsByTagName('meta');

    for (let meta of metaTags) {
      if (meta.name === propertyName) {
        return meta.content;
      }
    }

    return null;
  }

  static getReadTheDocsDefaultVersion(project) {
    console.log('Pull request detected, getting default version from ReadTheDocs API');
    const url = `${DoxygenAwesomeReadtheDocsSearch.serverUrl}projects/${project}/`;
    return fetch(url)
      .then(function(response) {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        return data.default_version || 'latest';
      })
      .catch(function(err) {
        console.error('Error:', err);
        console.log(`Cannot determine default version for ${project}, assuming "latest"`);
        return 'latest';
      });
  }
}
