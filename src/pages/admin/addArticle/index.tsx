import React, { Component, Fragment } from 'react';
import BaseProps from '@declare/baseProps';
import PageHeaderLayout from '@layouts/PageHeaderLayout';
import { Card, Row, Col, Input, Button, List, Icon, Form } from 'antd';
import ArticleService from '../../article/service';
import moment from 'moment';
import router from 'umi/router';
import styles from '../style.less';

// 引入编辑器组件、样式
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import MyMarkdown from '@components/MyMarkdown';

const FormItem = Form.Item;

interface Props extends BaseProps {
  id: Number;
  login: String;
  email: String;
  activated: String;
  authorities: String;
  createdDate: String;
  lastModifiedBy: String;
}

interface ArticleProps {
  id: number;
  title: string;
  content: string;
  keyword: string;
}

@(Form.create as any)()
export default class UpdateArticle extends Component<BaseProps, any> {
  state = {
    dataSource: [],
    // markdownContent: '## HEAD 2 \n markdown examples \n ``` welcome ```',
    editorState: '## HEAD 2 \n markdown examples \n ``` welcome ```',
    checkedFolder: 0,
    checkedArticle: {} as ArticleProps,
    transition: { width: '0', heigth: '0' },
    loading: false,
    articleList: []
  };

  constructor(props) {
    super(props);
    this.initData();
  }
  // componentDidMount() {
  //   //  this.getInitDataSource();
  // }
  // receiveMarkdown(content) {
  //   // tslint:disable-next-line:no-console
  //   console.log('recieved markdown content', content);
  // }

  initData = () => {
    // 加载目录
    // 加载文集
    this.loadArticle();
    // 文章
  };

  loadArticle = async () => {
    const { getArticleList } = ArticleService;
    const articleList = await getArticleList();
    this.setState({ articleList });
  };

  submitContent = async params => {

    const { id } = this.state.checkedArticle;
    const content = localStorage.getItem('smde_article_content');
    // tslint:disable-next-line:no-console
    console.log('{ content, ...params, id }', { content, ...params, id });
    const result = await ArticleService.updateArticle({ content, ...params, id });
    // tslint:disable-next-line:no-console
    // console.log(result);

    this.loadArticle();
  };

  handleSubmit = (e, status?: string) => {
    const { validateFields, resetFields, setFieldsValue } = this.props.form;

    e.preventDefault();

    validateFields((err, values) => {
      if (err) {
        return;
      }

      this.submitContent({ ...values });
    });
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  handleCheckFolder = val => {
    this.setState({ checkedFolder: val });
  };

  handleCheckedArticle = val => {

    this.setState({
      checkedArticle: val,
      editorState: val.content
    });
  };
  handleAddFolder = () => {
    this.setState({ transition: { width: '100%', heigth: '40px' } });
  };

  handleAddAticle = () => {
    this.setState({
      checkedArticle: { title: '', content: '' }
    });
  }

  getFolderItme = data => {
    if (data.length === 0) {
      return;
    }
    return data.map((val, index) => {
      let isCheckedIcon = 'folder';
      let isCheckedSty = styles.folderItem;
      const isChecked = this.state.checkedFolder === index;
      if (isChecked) {
        isCheckedIcon = 'folder-open';
        isCheckedSty = styles.open;
      }
      return (
        <div
          className={isCheckedSty}
          key={index}
          onClick={() => {
            this.handleCheckFolder(val);
          }}
        >
          <Icon
            type={isCheckedIcon}
            theme="outlined"
            style={{ marginRight: '5px' }}
          />
          {val}
          {isChecked ? (
            <Icon
              style={{ position: 'absolute', right: '10px', top: '12px' }}
              type="setting"
              theme="outlined"
            />
          ) : (
              ''
            )}
        </div>
      );
    });
  };

  getArticleLise = data => {
    const _header = (
      <div
        onClick={this.handleCheckedArticle}
        className={styles.head}
      >
        <Icon type="plus" theme="outlined" style={{ marginRight: '5px' }} />
        新增文章
      </div>
    );

    return (
      <div className={styles.articleList}>
        {_header}
        <div className={styles.scrollBlock}>
          {Array.isArray(data) ?
            data.map((val, index) => {
              const { id, title, modifyTime } = val;

              let checkSty = styles.articleItme;
              if (id === this.state.checkedArticle.id) {
                checkSty = styles.open;
              }
              return (
                <div
                  key={id}
                  className={checkSty}
                  onClick={() => {
                    this.handleCheckedArticle(val);
                  }}
                >
                  <div>{title ? title : '未命名文章'}</div>
                  <span>
                    更新时间: {moment(modifyTime).format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                </div>
              );
            }) : ''}
        </div>
      </div>
    );
  };

  render() {
    // this.receiveMarkdown = this.receiveMarkdown.bind(this);
    const {
      editorState,
      checkedFolder,
      articleList,
      checkedArticle
    } = this.state;
    const { title, content, keyword } = checkedArticle;
    const { getFieldDecorator } = this.props.form;
    const data = Array(6).fill('日常记录');
    return (
      <div style={{ height: '100%' }}>
        <Row gutter={{ xs: 0, sm: 0, md: 0, lg: 0 }} style={{ height: '100%' }}>
          <Col
            xs={24}
            sm={16}
            md={24}
            lg={4}
            className={styles.folder}
          // style={{ height: '100%', color: '#333', background: '#8bc34a' }}
          >
            <div style={{ color: '#fff' }}>
              <div>
                <div
                  className={styles.folderItem}
                  onClick={this.handleAddFolder}
                  style={{ color: '#ec7259' }}
                >
                  <Icon
                    type="plus"
                    theme="outlined"
                    style={{ marginRight: '5px' }}
                  />
                  新建文集
                </div>
                <div
                  style={{
                    overflow: 'hidden',
                    transition: 'width 0.5s',
                    ...this.state.transition
                  }}
                // className={styles.rota180}
                >
                  <div style={{ margin: '0 -4px', background: '#fff' }}>
                    <Input
                      style={{ background: '#fff', }}
                      type="text"
                      addonAfter={<Icon type="plus" style={{ color: `#ff3503` }} />}
                    />
                  </div>
                </div>
                <div style={{ overflow: 'auto' }}>
                  {this.getFolderItme(data)}
                </div>
              </div>
            </div>
          </Col>
          <Col
            xs={24}
            sm={16}
            md={24}
            lg={6}
            style={{
              height: '100%',
              // background: '#cddc39',
              border: 'solid #ccc',
              borderWidth: '0px 1px '
            }}
          >
            {this.getArticleLise(articleList)}
          </Col>
          <Col xs={24} sm={16} md={24} lg={14}>
            <Form
              layout="inline"
              onSubmit={e => {
                this.handleSubmit(e);
              }}
              className={styles.formSty}
            >
              <FormItem label={`文章名称`}>
                {getFieldDecorator(`title`, {
                  initialValue: title
                })(<Input placeholder="请输入文章名称" />)}
              </FormItem>

              <FormItem label={`关键字`}>
                {getFieldDecorator(`keyword`, {
                  initialValue: keyword
                })(<Input placeholder="输入关键字使用'、'分隔" />)}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.state.loading}
                  style={{ float: 'right', marginTop: '4px' }}
                >
                  保存
                </Button>
              </FormItem>
            </Form>

            {/* <BraftEditor
              value={editorState}
              style={{ borderTop: '1px solid #ddd' }}
              onChange={this.handleEditorChange}
              onSave={this.submitContent}
            /> */}
            <MyMarkdown isEdit={true} source={editorState} />
          </Col>
        </Row>
      </div >
    );
  }
}
