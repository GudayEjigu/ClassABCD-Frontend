import { React, useState } from "react";
import axios from "axios";
import { GiToken } from "react-icons/gi";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";
import Select from "react-select";
const BlogAdd = ({ setShowModal }) => {
  const [blogEnglishName, setBlogEnglishName] = useState();
  const [blogAmharicName, setBlogAmharicName] = useState();
  const [blogEnglishDescription, setBlogEnglishDescription] = useState();
  const [blogAmharicDescription, setBlogAmharicDescription] = useState();
  const [blogImage, setBlogImage] = useState();
  const [blogTrisemester, setBlogTrisemester] = useState();
  const [blogCategoryId, setBlogCategoryId] = useState();
  const [blogTag, setBlogTag] = useState();
  const [blogWeeks, setBlogWeeks] = useState([]);

  const { token, user } = useAuth();

  const headers = {
    "Content-Type": "multipart/form-data",
    Accept: "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
  const addBlogHandler = () => {
    addBlogMutationSubmitHandler();
  };

  const addBlogMutation = useMutation(
    async (newData) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}admin/blogs`,
        newData,
        {
          headers,
        }
      ),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {},
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );

  const addBlogMutationSubmitHandler = async (values) => {
    let formData = new FormData();
    var weekData = [];
    for (var i = 0; i < blogWeeks.length; i++) {
      weekData = [...weekData, blogWeeks[i].id];
      formData.append("weeks[]", weekData[i]);
    }

    var trimesterData = [];
    for (var i = 0; i < blogTrisemester.length; i++) {
      trimesterData = [...trimesterData, blogTrisemester[i].id];
      formData.append("trimesters[]", trimesterData[i]);
    }

    var tagData = [];
    for (var i = 0; i < blogTag.length; i++) {
      tagData = [...tagData, blogTag[i].id];
      formData.append("tags[]", tagData[i]);
    }
    formData.append("categoryId", blogCategoryId);
    formData.append("blog_photo", blogImage);
    formData.append("titleEnglish", blogEnglishName);
    formData.append("titleAmharic", blogAmharicName);
    formData.append("descriptionEnglish", blogEnglishDescription);
    formData.append("descriptionAmharic", blogAmharicDescription);
    try {
      addBlogMutation.mutate(formData, {
        onSuccess: () => {
          setShowModal(false);
          toast.success("success", {
            style: {
              backgroundColor: "#22c55e",
              color: "white",
            },
          });
          setShowModal(false);
        },
        onError: (err) => {
          console.log({ err });
          toast.error(err?.response?.data?.message ?? "category add failed");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const TrisemesterData = useQuery(
    ["TrisemesterDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/trimesters`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {
        //  console.log(categoryData?.data?.data?.data[1]?.name?.amharic);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );

  const tempObj = [];
  TrisemesterData?.data?.data?.data.map((item) => {
    tempObj.push({ id: item.id, name: item.name.english });
  });
  const myDefault = [];
  const trimesterOptions = [...tempObj];

  const TagData = useQuery(
    ["TagDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/tags`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {
        //  console.log(categoryData?.data?.data?.data[1]?.name?.amharic);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );
  const tempTagObj = [];
  TagData?.data?.data?.data.map((item) => {
    tempTagObj.push({ id: item.id, name: item.name.english });
  });

  const tagOptions = [...tempTagObj];

  const WeekData = useQuery(
    ["WeekDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/weeks`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {
        //  console.log(categoryData?.data?.data?.data[1]?.name?.amharic);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );
  const tempWeekObj = [];
  WeekData?.data?.data?.data.map((item) => {
    tempWeekObj.push({ id: item.id, name: item.name.english });
  });

  const weekOptions = [...tempWeekObj];

  const CategoryData = useQuery(
    ["CategoryDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/categories`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {
        //  console.log(categoryData?.data?.data?.data[1]?.name?.amharic);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );

  const categorySelectHandler = (e) => {
    const id = e.target.value;
    setBlogCategoryId(id);
    console.log(id);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add Blog</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex flex-row">
              <form className=" px-8 pt-6 pb-8 w-96 ">
                <div className="">
                  <div className=" ">
                    <div>
                      <label className="block text-black text-sm font-base mb-1">
                        Blog English Name
                      </label>
                      <input
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        onChange={(e) => {
                          setBlogEnglishName(e.target.value);
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-black text-sm font-base mb-1">
                        Blog Amharic Name
                      </label>
                      <input
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        onChange={(e) => {
                          setBlogAmharicName(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-black text-sm font-base mb-1">
                        Blog English Description
                      </label>
                      <textarea
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        onChange={(e) => {
                          setBlogEnglishDescription(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-black text-sm font-base mb-1">
                        Blog Amharic Description
                      </label>
                      <textarea
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        onChange={(e) => {
                          setBlogAmharicDescription(e.target.value);
                        }}
                      />
                    </div>

                    <label
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      for="file_input"
                    >
                      Blog Image file
                    </label>
                    <input
                      required
                      class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="file_input_help"
                      id="file_input"
                      onChange={(e) => {
                        setBlogImage(e.target.files[0]);
                      }}
                      type="file"
                    />
                    <p
                      class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                      id="file_input_help"
                    >
                      SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>
                  </div>
                </div>
              </form>
              <form className="px-8 pt-6 pb-8 w-96">
                {" "}
                <div className=" ">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Category
                  </label>
                  <select
                    required
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      categorySelectHandler(e);
                    }}
                  >
                    <option selected>Select Category English Name</option>
                    {CategoryData?.data?.data?.data.map((category) => {
                      return (
                        <>
                          <option key={category?.id} value={category?.id}>
                            {category?.name?.english}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <br />
                    Select trimesters
                  </label>
                  <Select
                    required
                    isMulti={true}
                    styles={{
                      menuPortal: (base) => ({
                        zIndex: 999999,
                      }),
                    }}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    defaultValue={myDefault}
                    options={trimesterOptions}
                    onChange={(newSelection) => {
                      console.log({ newSelection });
                      setBlogTrisemester(newSelection);
                    }}
                  />
                </div>
                <div className=" ">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Tags
                  </label>
                  <Select
                    required
                    isMulti={true}
                    styles={{
                      menuPortal: (base) => ({
                        zIndex: 999999,
                      }),
                    }}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    defaultValue={myDefault}
                    options={tagOptions}
                    onChange={(newSelection) => {
                      console.log({ newSelection });
                      setBlogTag(newSelection);
                    }}
                  />

                  <div></div>
                </div>
                <div className=" ">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Weeks
                  </label>
                  <Select
                    required
                    isMulti={true}
                    styles={{
                      menuPortal: (base) => ({
                        zIndex: 999999,
                      }),
                    }}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    defaultValue={myDefault}
                    options={weekOptions}
                    onChange={(newSelection) => {
                      console.log({ newSelection });
                      setBlogWeeks(newSelection);
                    }}
                  />
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                disabled={addBlogMutation.isLoading}
                className="bg-[#636ab1] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  addBlogHandler();
                }}
              >
                {addBlogMutation.isLoading ? "saving.." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default BlogAdd;
