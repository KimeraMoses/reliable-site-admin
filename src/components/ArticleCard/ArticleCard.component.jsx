import { Dropdown } from 'antd';
import './ArticleCard.styles.scss';

export const ArticleCard = ({
  title,
  bodyText,
  imagePath,
  articleCategories,
  onView,
  onEdit,
  onDelete,
  articleType,
}) => {
  return (
    <div className="p-[32px] bg-[#1e1e2d] flex flex-col gap-[32px] custom-article-card rounded-[8px]">
      <div className="relative h-[204px] w-full">
        <img
          className="h-[204px] w-full rounded-[8px] object-cover"
          src={imagePath}
          alt={title}
        />
        <Dropdown
          trigger="click"
          placement="bottomRight"
          overlay={
            <div className="rounded-[8px] custom-article-card__more-dd z-50 flex flex-col gap-[20px] min-w-[120px] py-[20px] px-[12px]">
              <button
                className="text-[#6D6D80] text-[12px] hover:text-[#3699FF] text-left"
                onClick={onView}
              >
                View
              </button>
              <button
                className="text-[#6D6D80] text-[12px] hover:text-[#3699FF] text-left"
                onClick={onEdit}
              >
                Edit
              </button>
              <button
                className="text-[#6D6D80] text-[12px] hover:text-[#3699FF] text-left"
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          }
        >
          <div className="p-[8px] absolute h-[32px] w-[32px] top-[12px] right-[12px] custom-article-card__more cursor-pointer">
            <img src="/icon/more.svg" alt="more" />
          </div>
        </Dropdown>
      </div>
      <div className="flex flex-col gap-[8px]">
        <h5 className="font-medium text-[24px] text-white">{title}</h5>
        <div className="flex gap-[8px]">
          <div className="px-[8px] py-[4px] bg-[#323248] rounded-[4px] text-white font-medium text-[10px] uppercase">
            {articleType}
          </div>
          <div className="px-[8px] py-[4px] bg-[#2F264F] rounded-[4px] text-[#8950FC] font-medium text-[10px] uppercase">
            {articleCategories[0]?.category?.name}
          </div>
        </div>
      </div>
      <div>
        <p className="text-[#92928F] text-[16px]">
          {bodyText.substring(0, 155)}...
        </p>
      </div>
      <div>
        <p className="text-[#474761] text-[14px]">
          By Paul Elliott On Feb 20th, 2022
        </p>
      </div>
    </div>
  );
};
