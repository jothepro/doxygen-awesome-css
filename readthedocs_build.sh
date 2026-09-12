#!/usr/bin/env bash
set -euo pipefail

conda_env_name="doxygen-awesome-css-docs"

function setup_conda_env {
  echo "Setting up conda environment"
  local environment_file="environment.yml"

  echo "cat $environment_file"
  cat $environment_file

  echo "conda env create --quiet --name ${conda_env_name} --file $environment_file"
  conda env create --quiet --name "${conda_env_name}" --file "$environment_file"

  # activate the env in this shell so doxygen/dot below resolve to the conda versions
  # shellcheck disable=SC1091
  source "$(conda info --base)/etc/profile.d/conda.sh"
  conda activate "${conda_env_name}"
}

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

setup_conda_env
doxygen --version
dot -V
doxygen "${rtd_doxyfile}"
