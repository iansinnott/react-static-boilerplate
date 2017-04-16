/* eslint-disable react/no-danger */
const React = require('react');
const T = require('prop-types');

const Html = ({ title = 'Amazing Default Title', body, manifest }) => {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{title}</title>
        <link rel='stylesheet' href={manifest['app.css']} />

        {/* If you have a favicon file you can add by modifying the next line  */}
        {/* <link rel='shortcut icon' href={manifest['favicon.ico']} /> */}
      </head>
      <body>
        <div id='root' dangerouslySetInnerHTML={{ __html: body }} />
        <script src={manifest['vendor.js']} />
        <script src={manifest['app.js']} />
      </body>
    </html>
  );
};

/**
 * NOTE: These props aren't marked as required here because this template is
 * used by the dev server as well, and in dev mode there is no title or body
 * passed. The manifest will still be present.
 */
Html.propTypes = {
  title: T.string,
  body: T.string,
  manifest: T.object.isRequired,
};

module.exports = Html;
