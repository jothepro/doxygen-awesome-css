from pathlib import Path
import shutil

from setuptools import setup
from setuptools.command.build_py import build_py as _build_py


ASSET_FILES = [
    "doxygen-awesome.css",
    "doxygen-awesome-darkmode-toggle.js",
    "doxygen-awesome-fragment-copy-button.js",
    "doxygen-awesome-interactive-toc.js",
    "doxygen-awesome-paragraph-link.js",
    "doxygen-awesome-sidebar-only-darkmode-toggle.css",
    "doxygen-awesome-sidebar-only.css",
    "doxygen-awesome-tabs.js",
]


class build_py(_build_py):
    """Custom build step that copies CSS/JS assets into the package."""

    def run(self):
        super().run()
        self._copy_assets()

    def _copy_assets(self) -> None:
        package_dir = Path(self.build_lib) / "doxygen_awesome_css"
        source_root = Path(__file__).parent
        package_dir.mkdir(parents=True, exist_ok=True)

        for filename in ASSET_FILES:
            src = source_root / filename
            dest = package_dir / filename
            if not src.exists():
                raise FileNotFoundError(f"Asset missing: {src}")
            shutil.copy2(src, dest)


setup(cmdclass={"build_py": build_py})
