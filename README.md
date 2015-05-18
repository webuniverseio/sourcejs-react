React support for SourceJS
===============

[SourceJS](http://sourcejs.com) middleware to support [React](https://facebook.github.io/react/) markup language (`*.jsx`) instead of native `*.src`.

## Install

To install, run npm in `sourcejs/user` folder:

```
npm install sourcejs-react --save
```

In `sourcejs/user/options.js` you need to add `index.jsx` to `core.common.specFiles`:
```js
module.exports = {
    core: {
        common: {
            specFiles: [
                'index.jsx',
                'index.src',
                'index.src.html',
                'index.jade',
                'index.haml',
                'index.md',
                'readme.md',
                'README.md',
                'index.html'
            ]
        }
    }
    //...
};
```

Then restart your SourceJS application, middleware will be loaded automatically.

## Usage

After installation, instead of `index.src` pages, you can use `index.jsx` files with React markup.

index.jsx
```js
var React = require('react/addons');
var Button = require('button.jsx');
module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <link rel="stylesheet" href="source-example.css" />

                <h1>Button</h1>

                <div className="source_info">
                    <p>Various button treatments.</p>
                </div>

                <section className="source_section">
                    <h2>Button (Purple)</h2>
                    <div className="source_example">
                        <Button>Btn Copy Gibson Reg; 1.2em</Button>
                    </div>
                </section>

                <section className="source_section">
                    <h2>Button (White)</h2>
                    <div className="source_example">
                        <Button modifier="white">Btn Copy Gibson Reg; 1.2em</Button>
                    </div>
                </section>
            </div>
        );
    }
});
```