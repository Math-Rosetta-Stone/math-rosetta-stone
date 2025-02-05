# Translation Script

## Overview
The `translation.py` script automates the translation process for English definitions in `<project/company name>` spreadsheets. It utilizes the DeepL API and the Google Cloud Translation API to perform translations. Currently, it supports translations to Chinese, French, Spanish, Portuguese, Farsi, Hindi, and Marathi.

## Prerequisites

### 1. DeepL Auth/API Key
1. Contact `Prof. Kielstra` to get the DeepL login credentials for the `Math Rosetta Stone` account.
2. Then, get the keys from [DeepL Account Keys](https://www.deepl.com/en/your-account/keys).

### 2. Google Cloud Auth Credentials
1. Contact `Prof. Kielstra` to get the Google Cloud login credentials for the `Math Rosetta Stone` account.
2. Follow the **"Configure ADC with your Google Account"** steps on this [Google Cloud Documentation](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

### 4. Install Required Libraries
Ensure the following Python libraries are installed (check `import` statements in the script):
  - `argparse`
  - `deepl`
  - [`google-cloud-translate`](https://cloud.google.com/translate/docs/reference/libraries/v2/python)
  - `openpyxl`
  You can use the following command to install these:
  ```bash
  pip install <library name>
  ```

## Usage
1. Download the Excel file containing the terms and definitions.
2. Ensure the Excel file is **not open**.
3. Navigate to the directory containing `translation.py`.
4. Run the script using:

   ```bash
   python translation.py --deepl_auth_key <your_deepl_auth_key>
   ```

5. Customize the following by passing optional parameters:
   - File path to your spreadsheet (relative to the directory containing `translation.py`).
   - Specific sheet name in the spreadsheet.
   - The column number of the **"Ready to Translate"** column.
   - The column number containing the English text you want to translate.
   - The range of rows you want to translate (separately pass the start and end row).
   - The column number where you want the translated text to be output for a particular supported language.
   - What you want the **"Has the translation been edited?"** column to update to (yes/no). If neither is provided, the column remains unchanged.
   - If you want the **"Ready to translate?"** column to be updated to "Translate" upon successful translations, use it's respective flag.

## Testing
A separate script `translation-test-setup.py` is provided to facilitate testing of `translation.py`. It wipes out all existing translations and sets every other row to **"Ready for Translation"**.

---

**Happy Translating!**