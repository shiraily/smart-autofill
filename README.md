# smart-autofill

smart-autofill is a Google Chrome Extension which fills various address forms automatically.

# Install

It is not published in Chrome Web Store yet and settings are very simple now.

### Settings

```
cd /path/to/project
edit secret.ts # refer to secret_example.ts
```

### Build & Install

```
yarn
yarn build
```

Then Chrome Extension is generated and upload it on your Google Chrome.

1. Go to chrome://extensions on Google Chrome
1. Enable Developer Mode
1. Click "LOAD UNPACKED"
1. Select "dist" directory

# Usage

Just click Extension Icon when you visit a website with address form.

# Future work

- Add settings page
- Improve accuracy
  - i.e. use machine learning
- Publish in Chrome Web Store
- Input sign-up forms including name, email, etc.
