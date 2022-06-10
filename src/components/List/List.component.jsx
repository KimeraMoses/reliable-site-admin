import { List as $List } from 'antd';
import './List.styles.scss';

const { Item } = $List;

export const List = ({ data, renderFn, header, grid, pageSize }) => {
  return (
    <div className="custom-list">
      <$List
        grid={grid}
        header={header}
        dataSource={data}
        pagination={{
          pageSize: pageSize || 8,
          hideOnSinglePage: true,
          showSizeChanger: false,
          position: 'bottom',
        }}
        renderItem={(item) => <Item>{renderFn(item)}</Item>}
      />
    </div>
  );
};
