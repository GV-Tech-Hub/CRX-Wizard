# CRX Wizard - Chrome Extension Downloader & Converter

## Overview
CRX Wizard is a Chrome extension that enables users to download Chrome extensions in their native CRX format or convert them to ZIP format directly from the Chrome Web Store. This tool is essential for developers, security researchers, and users who need to backup or analyze Chrome extensions.

## Features
- Download extensions in original CRX format
- Convert and download extensions to ZIP format
- User-friendly interface
- Automatic extension name detection
- Secure downloading from official Google sources

## Purpose
This tool was created to address the challenge of downloading and analyzing Chrome extensions, which is particularly useful for:
- Developers studying extension architecture
- Security researchers performing code analysis
- Users creating backups of critical extensions
- Educational purposes in understanding extension structure

## Requirements
- Google Chrome Browser (Version 88 or higher)
- Chrome Developer Mode enabled

## Installation
1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. The CRX Wizard icon will appear in your Chrome toolbar

## Usage Example
Suppose a developer wants to study how a popular Chrome extension implements its features:

1. Visit the extension's page on Chrome Web Store
2. Click the CRX Wizard icon in the toolbar
3. Choose either:
   - "Download CRX" for the original package
   - "Convert to ZIP" for the unpackaged source
4. Analyze the downloaded files

## Technical Details
The extension uses Chrome's extension APIs to:
- Access the Chrome Web Store download URLs
- Convert CRX to ZIP format by locating and extracting ZIP headers
- Manage downloads through Chrome's download manager

## Security
- Downloads directly from Google's servers
- No third-party servers involved
- All conversion happens locally

## Contributing
Contributions are welcome! Please feel free to submit pull requests or create issues for bugs and feature requests.

## License
MIT License