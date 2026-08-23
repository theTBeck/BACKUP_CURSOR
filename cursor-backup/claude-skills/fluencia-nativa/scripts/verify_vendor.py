#!/usr/bin/env python3
"""Verify language-list vendor + activated inventory tags."""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]  # Marketing-Digital (scripts→skill→skills→.cursor→repo)
VENDOR = ROOT / ".agents" / "vendor" / "language-list"
EN_JSON = VENDOR / "data" / "en" / "language.json"
ORIGIN = VENDOR / "ORIGIN.md"

# Primary ISO 639-1 codes expected in en/language.json (dialects excluded)
ISO_REQUIRED = [
    "ar", "zh", "en", "fr", "ru", "es", "pt", "ja", "ko", "hi", "bn", "ur",
    "id", "ms", "th", "vi", "tr", "fa", "he", "ta", "te", "mr", "gu", "pa",
    "de", "it", "nl", "pl", "uk", "ro", "el", "sv", "no", "da", "fi", "cs",
    "hu", "ca", "sw", "am", "ha", "yo",
]

# Vendor locale folders that must exist (underscore form)
VENDOR_LOCALES = [
    "en", "pt_BR", "zh_Hans", "zh_Hant", "ja", "en_GB", "en_US",
    "es", "fr", "de", "ar", "ko", "hi",
]

# Activated BCP47 inventory (48) — documented; dialects need not be in vendor
ACTIVATED = [
    "ar", "zh-Hans", "zh-Hant", "yue", "en", "en-GB", "en-US", "en-Scotland",
    "fr", "ru", "es", "es-MX", "es-ES", "pt-BR", "pt-PT", "ja", "ko", "hi",
    "bn", "ur", "id", "ms", "th", "vi", "tr", "fa", "he", "ta", "te", "mr",
    "gu", "pa", "fil", "de", "it", "nl", "pl", "uk", "ro", "el", "sv", "no",
    "da", "fi", "cs", "hu", "ca", "sw", "am", "ha", "yo",
]


def main() -> int:
    errors: list[str] = []

    if not ORIGIN.is_file():
        errors.append(f"missing ORIGIN.md: {ORIGIN}")
    if not EN_JSON.is_file():
        errors.append(f"missing en catalog: {EN_JSON}")
        print("FAIL")
        for e in errors:
            print(f" - {e}")
        return 1

    data = json.loads(EN_JSON.read_text(encoding="utf-8"))
    for code in ISO_REQUIRED:
        if code not in data:
            errors.append(f"ISO code missing in en/language.json: {code}")

    for loc in VENDOR_LOCALES:
        path = VENDOR / "data" / loc / "language.json"
        if not path.is_file():
            errors.append(f"missing vendor locale file: {path}")

    if len(ACTIVATED) < 48:
        errors.append(f"activated inventory too small: {len(ACTIVATED)}")

    print(f"vendor_ok={len(errors) == 0}")
    print(f"en_catalog_keys={len(data)}")
    print(f"activated_inventory={len(ACTIVATED)}")
    print(f"vendor_locales_checked={len(VENDOR_LOCALES)}")
    if errors:
        print("FAIL")
        for e in errors:
            print(f" - {e}")
        return 1
    print("PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
