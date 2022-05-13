import { List as $List } from 'antd';
import './List.styles.scss';

const { Item } = $List;

export const List = ({ data, renderFn, header }) => {
  return (
    <div className="custom-list">
      <$List
        header={header}
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
