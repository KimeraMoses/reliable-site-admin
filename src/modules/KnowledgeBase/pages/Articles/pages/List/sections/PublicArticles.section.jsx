import { List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from 'components';
import { Delete } from './Delete.section';
import { useState } from 'react';

export function PublicArticles({ articles }) {
  const [showDel, setShowDel] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mt-[20px]">
      <Delete show={showDel} setShow={setShowDel} />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={articles}
        rowKey={(article) => article?.id}
        renderItem={(item) => (
          <List.Item>
            <ArticleCard
              onView={() =>
                navigate(
                  `/admin/dashboard/knowledge-base/articles/view/${item?.id}`
                )
              }
              onEdit={() =>
                navigate(
                  `/admin/dashboard/knowledge-base/articles/edit/${item?.id}`
                )
              }
              onDelete={() => {
                setShowDel(true);
              }}
              {...item}
              articleType="Public Article"
            />
          </List.Item>
        )}
      />
    </div>
  );
}
