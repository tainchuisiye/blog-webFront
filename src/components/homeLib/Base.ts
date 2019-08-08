import BaseProps from '../../declare/baseProps';

export interface BaseSelectViewface {
  EditView: any;
  Preview: any;
}

export interface EditViewProps extends BaseProps {
  /** 编辑结果同步 */
  onChange: (json: any, index?: number) => void;
  /** 删除当前模块 */
  onRemove?: (index: number, id: number) => void;
  id?: number;
  index?: number;
  content?: any;
}
