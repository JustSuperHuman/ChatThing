# Syntax Highlighting

The application will provide robust syntax highlighting for code blocks within chat messages to improve readability and user experience.

## Implementation

- **Library:** We will use a well-supported, lightweight library such as `highlight.js` or `react-syntax-highlighter` to handle the parsing and styling of code.
- **Language Detection:** The library should be configured to automatically detect the language of the code block when possible. The language name (e.g., "jsx") will be displayed in the header of the code block.
- **Theming:** The color scheme for the syntax highlighting will be customized to match the application's light and dark themes.

## UI Controls

A control bar will be displayed at the top of each code block, providing the following actions:

- **Download:** An icon button that allows the user to download the code snippet as a file.
- **Toggle Text Wrap:** An icon button that toggles line wrapping for the code block.
- **Copy to Clipboard:** An icon button that copies the entire code snippet to the user's clipboard.

These controls will ensure that users can easily interact with and reuse the code provided in the chat.