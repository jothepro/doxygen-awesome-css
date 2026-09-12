#!/usr/bin/env bash
set -euo pipefail

output_dir="${READTHEDOCS_OUTPUT:-_readthedocs}"
output_dir="${output_dir%/}"
version="${READTHEDOCS_VERSION:-local}"
canonical_url="${READTHEDOCS_CANONICAL_URL:-https://doxygen-awesome-css.readthedocs.io/}"

mkdir -p "${output_dir}"

rtd_doxyfile="${output_dir}/Doxyfile.readthedocs"
rtd_header="${output_dir}/header.readthedocs.html"

awk '
  /<script type="text\/javascript" src="\$relpath\^doxygen-awesome-tabs\.js"><\/script>/ {
    print
    print "<script type=\"text/javascript\" src=\"$relpath^doxygen-awesome-readthedocs-search.js\"></script>"
    next
  }
  /DoxygenAwesomeTabs\.init\(\)/ {
    print
    print "    // The RTD build uses the sidebar-only theme, so align live search results to the sidebar."
    print "    DoxygenAwesomeReadtheDocsSearch.init('\''leftAlign'\'')"
    next
  }
  { print }
' doxygen-custom/header.html > "${rtd_header}"

cp Doxyfile "${rtd_doxyfile}"
cat >> "${rtd_doxyfile}" <<EOF

# Read the Docs build overrides
PROJECT_NUMBER = ${version}
OUTPUT_DIRECTORY = ${output_dir}
HTML_HEADER = ${rtd_header}
HTML_EXTRA_FILES += doxygen-awesome-readthedocs-search.js
HTML_EXTRA_STYLESHEET += doxygen-awesome-readthedocs-search.css
SERVER_BASED_SEARCH = YES
EXTERNAL_SEARCH = YES
SEARCHENGINE_URL = ${canonical_url}
EOF

doxygen --version
dot -V
doxygen "${rtd_doxyfile}"
