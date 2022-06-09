import { Dropdown } from 'antd';
import './Article.styles.scss';

export const Article = () => {
  return (
    <>
      <div>
        <div className="flex flex-row justify-between items-center ">
          <h5 className="font-medium text-[24px] text-white">Article Title</h5>
          <div className="flex gap-[8px]">
            <div className="px-[8px] py-[4px] bg-[#323248] rounded-[4px] text-white font-medium text-[10px] uppercase">
              Public Article
            </div>
            <div className="px-[8px] py-[4px] bg-[#2F264F] rounded-[4px] text-[#8950FC] font-medium text-[10px] uppercase">
              Article Category
            </div>
          </div>
        </div>
        <div className="mt-[12px]">
          <p className="text-[#474761] text-[14px]">
            By Paul Elliott On Feb 20th, 2022
          </p>
        </div>
        <div className="relative w-full mt-[32px]">
          <img
            className="h-[492px] w-full rounded-[8px] object-cover"
            src="/article.jpg"
            alt="article"
          />
          <Dropdown
            trigger="click"
            placement="bottomRight"
            overlay={
              <div className="rounded-[8px] custom-article-card__more-dd z-50 flex flex-col gap-[20px] min-w-[120px] py-[20px] px-[12px]">
                <button
                  className="text-[#6D6D80] text-[12px] hover:text-[#3699FF] text-left"
                  // onClick={onView}
                >
                  View
                </button>
                <button
                  className="text-[#6D6D80] text-[12px] hover:text-[#3699FF] text-left"
                  // onClick={onEdit}
                >
                  Edit
                </button>
                <button
                  className="text-[#6D6D80] text-[12px] hover:text-[#3699FF] text-left"
                  // onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            }
          >
            <div className="p-[8px] absolute h-[32px] w-[32px] top-[12px] right-[12px] article-dropdown__more cursor-pointer">
              <img src="/icon/more.svg" alt="more" />
            </div>
          </Dropdown>
        </div>
        <div className="mt-[32px]">
          <p className="text-[#92928F] text-[16px]">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    </>
  );
};
