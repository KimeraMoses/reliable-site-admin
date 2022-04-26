const subUsers = [
  {
    name: 'Paul.Elliott',
    email: 'Paul.Elliot@Fakemail.com',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Paul.Elliott',
    email: 'Paul.Elliot@Fakemail.com',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Paul.Elliott',
    email: 'Paul.Elliot@Fakemail.com',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Paul.Elliott',
    email: 'Paul.Elliot@Fakemail.com',
    image: 'https://via.placeholder.com/100',
  },
];

export const SubUsers = () => {
  return (
    <div className="bg-[#1E1E2D] rounded-lg admin-details__user-card px-8">
      <h6 className="text-white text-base mb-8">Sub Users</h6>
      <div className="flex flex-col gap-4">
        {subUsers.map(({ name, email, image }) => {
          return (
            <div className="flex flex-col gap-1">
              <div className="flex gap-3 items-center">
                <div className="bg-[#171723] flex items-center justify-center w-[47px] h-[47px] rounded-lg p-[4px]">
                  <img
                    className="rounded-lg w-full h-full"
                    src={image}
                    alt="user"
                  />
                </div>
                <div className="">
                  <div className="text-white text-sm">{name}</div>
                  <div className="text-[#92928F] text-sm">{email}</div>
                </div>
              </div>
              <div className="h-0 w-full border-t-[1px] border-dashed border-[#323248] mt-4" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
