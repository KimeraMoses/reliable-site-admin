import './RecentArticle.styles.scss';

const ArticleCard = () => {
  return (
    <>
      <div className="article-card flex gap-[20px] items-center">
        <div className="">
          <img
            className="h-[83px] rounded-[8px]"
            src="/article.jpg"
            alt="article"
          />
        </div>
        <div className="flex flex-col gap-3 max-w-[280px]">
          <h5 className="text-xs text-[#FFFFFF]">Article Title</h5>
          <p className="text-ms text-[#474761]">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy.
          </p>
        </div>
      </div>
    </>
  );
};
export const RecentArticle = () => {
  return (
    <div className="recent-article">
      <div className="">
        <h5 className="text-2xl text-[#FFFFFF]">Recent Articles</h5>
      </div>
      <div className="recent-article__btm-border flex flex-col mt-[32px]">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  );
};
