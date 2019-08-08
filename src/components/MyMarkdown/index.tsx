import React, { PureComponent } from 'react';
import SimpleMDEEditor from 'yt-simplemde-editor';
import marked from 'marked';
import Prism from 'prismjs'; // 这里使用 ~1.14.0 版本，1.15 之后的版本有bug
import 'prismjs/themes/prism-okaidia.css';
import BaseProps from '@declare/baseProps';
import EditDoc from './EditDoc';
import ReadDoc from './ReadDoc';

interface Props extends BaseProps {
  // isEdit: boolean | null;
  source: string;
}

export default class MyMarkdown extends PureComponent<Props, any> {
  state = {
    value: '',
  };

  renderMarkdown = text => {
    const html = marked(text, { breaks: true });
    if (/language-/.test(html)) {
      const container = document.createElement('div');
      container.innerHTML = html;
      Prism.highlightAllUnder(container);
      return container.innerHTML;
    }

    return html;
  };

  render() {
    const { source } = this.props;
    // tslint:disable-next-line:no-console
    console.log(this.props);
    return (
      <div>
        {this.props.isEdit ? <EditDoc source={source} /> : <ReadDoc source={source} />}
      </div>
    );
  }
}