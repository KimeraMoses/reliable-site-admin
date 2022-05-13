import { List as $List } from 'antd';
import './List.styles.scss';

const { Item } = $List;

export const List = ({ data, renderFn }) => {
  return (
    <div className="custom-list">
      <$List
        dataSource={data}
        pagination={{
          pageSize: 8,
          hideOnSinglePage: true,
          showSizeChanger: false,
          position: 'bottom',
        }}
        renderItem={(item) => <Item>{renderFn(item)}</Item>}
      />
    </div>
  );
};
