import { useSession } from "next-auth/react";
import React, { useState } from "react";

const Profile = () => {
  const { data } = useSession();
  const [formData, setFormData] = useState({
    name: undefined,
    email: undefined,
    subject: undefined,
    message: undefined,
  });

  const handlerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handlerSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if(formData.email && formData.message && formData.name && formData.subject){
      const request = await fetch('/api/contact',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formData)
      })
      console.log('request status - ',request.ok)
    }

  };
  return (
    <div>
      <h1>user is {data?.user?.name}</h1>
      <div className="mt-2 ml-2 flex flex-col gap-2">
        <h2>sent email to {data?.user?.name}</h2>
        <div className="w-[50rem] m-auto">
          <form className="flex flex-col gap-2 justify-center itams-center">
            <div className="grid grid-cols-6">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className=" col-span-4"
                value={formData.name}
                onChange={handlerChange}
              />
            </div>
            <div className="grid grid-cols-6">
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                className=" col-span-4"
                value={formData.email}
                onChange={handlerChange}
              />
            </div>
            <div className="grid grid-cols-6">
              <label htmlFor="subject">subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                className=" col-span-4"
                value={formData.subject}
                onChange={handlerChange}
              />
            </div>
            <div className="grid grid-cols-6">
              <label htmlFor="message">message</label>
              <textarea
                name="message"
                id="message"
                className=" col-span-4"
                value={formData.message}
                onChange={handlerChange}
              />
            </div>
            <button
              className="py-2 px-4 m-auto bg-[#e50914] w-[20rem] text-white cursor-pointer"
              onClick={handlerSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
