class DoxygenAwesomeReadtheDocsSearch {
  static searchResultsText=[
    "Sorry, no pages matching your query.",
    "Search finished, found <b>1</b> page matching the search query.",
    "Search finished, found <b>$num</b> pages matching the search query.",
  ];

  static get serverUrl() {
    const serverUrlSuffix = '_/api/v3/';
    const domainName = window.location.hostname;
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
    window.searchFor = function(query, page, count) {
      const results = $('#searchresults');

      // Get the title
      let pageTitle = $('div.title')
      const originalTitle = pageTitle.text().toString();
      let pageTitleStates = ["Searching", "Searching .", "Searching ..", "Searching ..."];
      let pageTitleIndex = 0;

      // Function to update the page title
      function updatePageTitle() {
        pageTitle.text(pageTitleStates[pageTitleIndex]);
        pageTitleIndex = (pageTitleIndex + 1) % pageTitleStates.length;
      }

      // Start the interval to update the page title
      let titleInterval = setInterval(updatePageTitle, 500);

      // The summary will be displayed at the top of the search results
      let resultSummary = document.createElement('p');
      resultSummary.className = 'search-summary';
      results.append(resultSummary);

      // Put all results into an unordered list
      let resultList = document.createElement('ul');
      resultList.className = 'search';
      results.append(resultList);

      // readthedocs metadata
      // TODO: how to handle defaults? ... only matters when this is outside of readthedocs
      let projectSlug = DoxygenAwesomeReadtheDocsSearch.getMetaValue("readthedocs-project-slug") || "doxygen-awesome-css";
      let projectVersion = DoxygenAwesomeReadtheDocsSearch.getMetaValue("readthedocs-version") || "latest";

      // pull requests are not indexed, so use the default version
      if (/^\d+$/.test(projectVersion)) {
        console.log('Pull request detected, getting default version from ReadTheDocs API');
        DoxygenAwesomeReadtheDocsSearch.getReadTheDocsDefaultVersion(projectSlug);
      }

      let url = `${DoxygenAwesomeReadtheDocsSearch.serverUrl}search/?q=project:${projectSlug}/${projectVersion}+${query}&page=${page + 1}&page_size=${count}`;
      console.log(url);

      let firstUrl = true;

      function fetchResults(url) {
        $.ajax({
          url: url,
          dataType: 'json',
          success: function (data) {
            // Add the query to the search field
            // This seems only be working if applied in the ajax success function...
            // maybe the field is not available before this point
            $('#MSearchField').val(query);

            if (firstUrl) {
              if (data.count > 0) {
                if (data.count === 1) {
                  resultSummary.innerHTML = DoxygenAwesomeReadtheDocsSearch.searchResultsText[1];
                } else {
                  resultSummary.innerHTML = DoxygenAwesomeReadtheDocsSearch.searchResultsText[2].replace(/\$num/, data.count);
                }
              } else {
                resultSummary.innerHTML = DoxygenAwesomeReadtheDocsSearch.searchResultsText[0];
              }
            }

            $.each(data.results, function (i, item) {
              let resultItem = document.createElement('li');
              resultItem.className = 'search-result';
              let resultItemUrl = `${item.domain}${item.path}`;
              let resultItemTitle = item.title;
              let resultItemType = item.type;  // todo... we can possibly display results differently based on type
              let resultItemTitleLink = document.createElement('a');
              let resultItemTitleHeading = document.createElement('h3');
              resultItemTitleHeading.appendChild(resultItemTitleLink);
              resultItemTitleLink.href = resultItemUrl;
              resultItemTitleLink.textContent = resultItemTitle;
              resultItem.append(resultItemTitleHeading);
              resultList.append(resultItem);

              let resultItemParagraph = document.createElement('p');
              resultItemParagraph.className = 'context';
              for (let i = 0; i < item.blocks.length; i++) {
                let blockContent = item.blocks[i].highlights.content.join(', ');

                // Find all <span> tags and ensure they are highlighted
                blockContent = blockContent.replace(/<span>(.*?)<\/span>/g, '<span class="highlighted">$1</span>');
                resultItemParagraph.innerHTML += blockContent;

                let blockName = `#${item.blocks[i].title.toLowerCase().replace(' ', '-')}`;
                let blockUrl = resultItemUrl + blockName;
                let blockLink = document.createElement('a');
                blockLink.href = blockUrl;
                blockLink.textContent = "More...";
                resultItemParagraph.append(document.createTextNode(' '));
                resultItemParagraph.append(blockLink);
                resultItemParagraph.append(document.createElement('br'));
              }
              resultItem.append(resultItemParagraph);
            });

            // Add pagination
            firstUrl = false;
            if (data.next) {
              fetchResults(data.next);
            } else {
              // Clear the interval when the search is complete
              clearInterval(titleInterval);
              pageTitle.text(originalTitle);
            }
          }
        });
      }

      fetchResults(url);
    }
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
    let url = `${DoxygenAwesomeReadtheDocsSearch.serverUrl}projects/${project}/`;
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        console.log(data);
        return data.default_version;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error:', textStatus, errorThrown);
        console.log(`Cannot determine default version for ${project}, assuming "latest"`);
        return "latest";
      }
    })
  }
}
