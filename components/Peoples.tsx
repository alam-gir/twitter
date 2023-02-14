import { UserI } from "@/types/INTERFACES";
import React from "react";
interface PeoplseI {
  user: UserI;
}
const Peoples = ({ user }: PeoplseI) => {
  return (
    <div>
      <div className="grid grid-cols-12 items-center cursor-pointer">
        <img
          src={user.picture.thumbnail}
          alt="userPhoto"
          className="h-[2.2rem] w-auto rounded-full col-span-2"
        />
        <div className="flex flex-col leading-4 col-span-7 pl-1">
          <h4 className="space-x-1">
            <span className="font-bold text-[11px] text-gray-700">
              {user.name.title}
            </span>
            <span className="font-bold text-[13px] text-gray-700">
              {user.name.first}
            </span>
            <span className="font-bold text-[13px] text-gray-700">
              {user.name.last}
            </span>
          </h4>
          <p className="text-[10px] text-gray-500">@{user.login.username}</p>
        </div>
        <button className=" col-span-3 bg-blue-400 p-1 text-sm text-white capitalize hover:shadow-md hover:bg-blue-300 rounded">
          follow
        </button>
      </div>
    </div>
  );
};

export default Peoples;
