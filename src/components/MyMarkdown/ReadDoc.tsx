import React, { Component, Fragment, PureComponent } from 'react';
import BaseProps from '@declare/baseProps';
import markdownIt from 'markdown-it';
// import markdownItHighlight from 'markdown-it-highlight';
// import hljs from 'highlight.js';
import 'highlight.js/styles/arduino-light.css';

// const marked = markdownIt();
// marked.use({
//   highlight(str, lang) {
//     if (lang && hljs.getLanguage(lang)) {
//       try {
//         return hljs.highlight(lang, str).value;
//       } catch (_) {
//         // tslint:disable-next-line:no-console
//         console.log(_);
//       }
//     }
//     return ''; // use external default escaping
//   }
// });

const hljs = require('highlight.js'); // https://highlightjs.org/

// Actual default values
const marked = require('markdown-it')({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        // tslint:disable-next-line:prefer-template
        return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
      } catch (_) {
        // tslint:disable-next-line:no-console
        console.log(_);
      }
    }

    // tslint:disable-next-line:prefer-template
    return '<pre class="hljs"><code>' + marked.utils.escapeHtml(str) + '</code></pre>';
  }
});

interface Props extends BaseProps {
  source: string;
}

export default class ReadDoc extends PureComponent<Props> {
  renderMarkdown = () => {
    const source = this.props.source;
    return <div className="hljs" dangerouslySetInnerHTML={{ __html: marked.render(source) }} />;
  };
  render() {
    return <Fragment>{this.renderMarkdown()}</Fragment>;
  }
}
