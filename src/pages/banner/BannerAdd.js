import React, { useState } from "react";
import axios from "axios";
import { GiToken } from "react-icons/gi";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const BannerAdd = ({ setShowModal }) => {
  const [englishBannerName, setEnglishBannerName] = useState();
  const [amharicBannerName, setAmharicBannerName] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [productId, setProductId] = useState();

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "multipart/form-data",
    Accept: "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
  const addBannerHandler = () => {
    addBannerMutationSubmitHandler();
  };

  const addBannerMutation = useMutation(
    async (newData) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}admin/banners`,
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

  const addBannerMutationSubmitHandler = async (values) => {
    let formData = new FormData();
    formData.append("titleEnglish", englishBannerName);
    formData.append("product_id", productId);
    formData.append("banner_image", bannerImage);
    formData.append("titleAmharic", amharicBannerName);
    try {
      addBannerMutation.mutate(formData, {
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
          toast.error(err?.response?.data?.message ?? "catBanner add failed");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const ProductData = useQuery(
    ["ProductDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/products`, {
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

  const productSelectHandler = (e) => {
    const id = e.target.value;
    setProductId(id);
    console.log(id);
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add Banner</h3>
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
            <div className="relative p-6 flex-auto">
              <form className=" px-8 pt-6 pb-8 w-full">
                <div className="felx flex-row w-80">
                  <div>
                    <label className="block text-black text-sm font-base mb-1">
                      English Banner Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        setEnglishBannerName(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-black text-sm font-base mb-1">
                      Amharic Banner Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        setAmharicBannerName(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Product
                    </label>
                    <select
                      required
                      id="countries"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => {
                        productSelectHandler(e);
                      }}
                    >
                      <option selected>Select Product English Name</option>
                      {ProductData?.data?.data?.data.map((product) => (
                        <>
                          <option key={product?.id} value={product?.id}>
                            {product?.name?.english}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="file_input"
                  >
                    Banner Image file
                  </label>
                  <input
                    required
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="file_input"
                    onChange={(e) => {
                      setBannerImage(e.target.files[0]);
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
                disabled={addBannerMutation.isLoading}
                className="bg-[#636ab1] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  addBannerHandler();
                }}
              >
                {addBannerMutation.isLoading ? "saving.." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default BannerAdd;
