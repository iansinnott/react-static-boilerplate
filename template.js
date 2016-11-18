import React from 'react';

const Html = ({
  title = 'Rainbow Unicorns',
  bundle = '/app.js',
  body = '',
  favicon = '',
  stylesheet = '',
}) => (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>{title}</title>
      {favicon ? <link rel='shortcut icon' href={favicon} /> : null}
      {stylesheet ? <link rel='stylesheet' href={stylesheet} /> : null}
    </head>
    <body>
      <div id='root' dangerouslySetInnerHTML={{ __html: body }} />
      <script src={bundle} />
    </body>
  </html>
);

Html.propTypes = {
  title: PropTypes.string,
  bundle: PropTypes.string,
  body: PropTypes.string,
  favicon: PropTypes.string,
  stylesheet: PropTypes.string,
};

export default Html;
