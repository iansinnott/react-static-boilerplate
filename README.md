![React Static Boilerplate](http://dropsinn.s3.amazonaws.com/Screen%20Shot%202016-01-03%20at%208.39.55%20PM.png)

# React Static Boilerplate

A boilerplate for building static sites with [React][] and [React Router][]

**Quick Start:**

* `git clone https://github.com/iansinnott/react-static-boilerplate my-static-site && cd my-static-site && rm -rf .git`
* `npm install`
* `npm start` to run a dev server
* Write an awesome client-side app...
* `npm build` to minify, package and generate static HTML files from your routes

Now you're all set to deploy to your favorite hosting solution :beers:

## Project Goals

* A single source of truth: Your routes
* Intuitive. Leverage existing font-end knowledge
* Awesome developer experience
* Flexible. No file structure or naming conventions required. Use whatever modules you want

## Serving static files

This project will generate all the static files you need to server a full, production-ready website. However your server will likely need some configuration so that it maps the same URLs React Router uses to actual static files. For example, the "about" page might have the following URL according to React Router: `/about`.

However, a static server without any configuration would see the URL `/about` and return a 404 because it expects a URL of `/about.html` to actually server the file. There are many ways to handle this on different systems. Here is how you might handle it with Nginx.

### Nginx

This project contains a script to help generate a usable Nginx config. To run it:

```
npm run -s conf
```

This will output the config to stdout. Redirect it as you see fit to save it to disk:

```
npm run -s conf > my-site.conf
```

Once you've saved the file you can sym link it into place and reload Nginx. This is just an example, your path to Nginx will vary based on system:

```
ln -s $PWD/my-site.conf /path/to/nginx/conf-files/static-fun.conf
nginx -s reload
```

### Testing the static site with Nginx on a Mac

If you don't have Nginx yet install it with `brew`:

```
brew install nginx
```

Now generate an Nginx config file using the script in this project:

```
npm run -s conf > nginx.conf
```

Then link that file we just created in to the global Nginx config file and reload Nginx:

```
mkdir -p /usr/local/etc/nginx/servers
ln -s $PWD/nginx.conf /usr/local/etc/nginx/servers/static-fun.conf
nginx -s reload
```

## Technology Used

For further reading on the primary tech used in this boilerplate see the links below:

* [Webpack][]
* [Babel][]
* [React][]
* [React Router][]
* [Stylus][]
* [CSS Modules][]

## Roadmap

- [ ] Add [Docker Compose][] to run a production-like server on demand for manual testing

## Troubleshooting

### Babel Env

 Make sure `BABEL_ENV` is not set to `development` when building. If it is babel will likely throw a hot module replacement error since HMR transformations are getting run on everything that goes through babel.

### Font Awesome Webpack

The `font-awesome-webpack` module does not seem to work with the approach of generating files as UMD modules then requiring them from the public dir. It throws an error about window not being defined.

[React]: http://facebook.github.io/react/
[Webpack]: http://webpack.github.io/
[Babel]: https://babeljs.io/
[Stylus]: https://learnboost.github.io/stylus/
[CSS Modules]: https://github.com/css-modules/css-modules
[Express]: http://expressjs.com/
[Waterline]: https://github.com/balderdashy/waterline
[Flux]: https://facebook.github.io/flux/docs/overview.html
[React Router]: https://github.com/rackt/react-router
[Redux]: https://github.com/rackt/redux
[Docker Compose]: https://docs.docker.com/compose/

