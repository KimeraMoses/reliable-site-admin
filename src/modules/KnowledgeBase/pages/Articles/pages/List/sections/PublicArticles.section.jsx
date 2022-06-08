import { List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArticleCard } from 'components';

export function PublicArticles({ articles }) {
  const navigate = useNavigate();
  return (
    <div className="mt-[20px]">
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={articles}
        rowKey={(article) => article?.id}
        renderItem={(item) => (
          <List.Item>
            <ArticleCard
              onView={() =>
                navigate(
                  `/admin/dashboard/knowledge-base/articles/article/view/${item?.id}`
                )
              }
              {...item}
              articleType="Public Article"
            />
          </List.Item>
        )}
      />
    </div>
  );
}
