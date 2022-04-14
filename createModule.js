const fs = require('fs');

const enFolder = `${__dirname}/public/locales/en/${process.argv[2]}`;

try {
  // Check if Folder Already Exists
  if (!fs.existsSync(enFolder)) {
    fs.mkdirSync(enFolder);
    // Create Locale File
    fs.writeFileSync(
      `${enFolder}/ns.json`,
      `{ "title": "${process.argv[2]}" }`
    );
    console.log(
      `Translation File Create at: /public/locales/en/${process.argv[2]}/ns.json`
    );
    // Create Module Folder
    const moduleFolder = `${__dirname}/src/modules/${process.argv[2]}`;
    fs.mkdirSync(moduleFolder);
    // Create Module JSX
    fs.writeFileSync(
      `${moduleFolder}/component.jsx`,
      `import { useTranslation } from 'react-i18next'; \n
      \n
      export const ${process.argv[2]} = () => { \n
        const { t } = useTranslation('/${process.argv[2]}/ns');
        <div className="${process.argv[2].toLowerCase()}">{t('title')}</div>; \n
      };`
    );
    console.log(
      `Module JSX Create at: /src/modules/${process.argv[2]}/component.jsx`
    );
    // Create Module SCSS
    fs.writeFileSync(
      `${moduleFolder}/style.scss`,
      // Adding color red indication to alert user of checking style file
      `.${process.argv[2].toLowerCase()} { \n
        color: red; \n
      }`
    );
    console.log(
      `Module SCSS Create at: /src/modules/${process.argv[2]}/style.scss`
    );
    // Create Module Service
    fs.writeFileSync(`${moduleFolder}/service.js`, '');
    console.log(
      `Module Service Create at: /src/modules/${process.argv[2]}/service.js`
    );
  } else {
    console.error(
      'Folder with This name already exists! Please choose a different name.'
    );
  }
} catch (err) {
  console.log(err);
}
