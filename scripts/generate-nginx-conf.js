const pkg = require('../package.json');
const config = require('../webpack.config.prod.js');
console.log(
`# This is an example Nginx configuration to server your static files. To
# actually use this you will need to sym-link it into your system's Nginx config.
# On a Mac that looks like this:
#
#   mkdir /usr/local/etc/nginx/servers
#   ln -s $PWD/nginx.conf /usr/local/etc/nginx/servers/${pkg.name}.conf
#   nginx -s reload
#
server {

  # Listen on this port. This would be 80 or 443 on a prod server. Adjust this
  # to suit your own needs.
  listen 8081;

  # Server base URL goes here. For dev we use localhost
  server_name localhost;

  # Gzip settings. NOTE: text/html files are always gzipped when enabled
  gzip on;
  gzip_min_length 1000;
  gzip_types text/plain text/css application/javascript application/json image/x-icon;

  # This will likely be unique for every server
  root ${config.output.path};

  # Remove trailing slashes. /about/ -> /about
  rewrite ^/(.*)/$ /$1 permanent;

  # Use 404.html as the error page
  error_page 404 /404.html;

  # If a matching file can't be found, handle this request as a 404, which
  # will return the 404 page because of the above directive
  try_files $uri $uri.html $uri/index.html =404;

}`
);
