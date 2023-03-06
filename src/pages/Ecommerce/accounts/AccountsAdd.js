import React, { useState } from "react";
import axios from "axios";
import { GiToken } from "react-icons/gi";
import { useMutation, useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../context/auth";
const AccountsAdd = ({ setShowModal }) => {
  const [englishAccountName, setEnglishAccountName] = useState();
  const [amharicAccountName, setAmharicAccountName] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [paymentMethodId, setPaymentMethodId] = useState();
  const [accountType, setAccountType] = useState();

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const addAccountHandler = () => {
    addAccountMutationSubmitHandler();
  };

  const addAccountMutation = useMutation(
    async (newData) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}admin/accounts`,
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

  const addAccountMutationSubmitHandler = async (values) => {
    try {
      addAccountMutation.mutate(
        {
          accountNameEnglish: englishAccountName,
          accountNameAmharic: amharicAccountName,
          accountNumber: accountNumber,
          accountType: accountType,
          payment_method_id: paymentMethodId,
        },
        {
          onSuccess: () => {
            setShowModal(false);
            toast.success("Add success");
            setShowModal(false);
          },
          onError: (err) => {
            console.log({ err });
            toast.error(err?.response?.data?.message ?? "Account add failed");
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const PaymentData = useQuery(
    ["PaymentDataApi"],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}admin/payment-methods`,
        {
          headers,
        }
      ),
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

  const paymentSelectHandler = (e) => {
    const id = e.target.value;
    setPaymentMethodId(id);
    console.log(id);
  };

  const formik = useFormik({
    initialValues: {
      englishName: "",
      amharicName: "",
      accountNumber: "",
      accountType: "",
      paymentMethod: "",
    },
    validationSchema: Yup.object({
      englishName: Yup.string().required("English name is required"),
      amharicName: Yup.string().required("Amharic name is required"),
      accountNumber: Yup.string().required("Account number is required"),
      accountType: Yup.string().required("account Type is required"),
      paymentMethod: Yup.string().required("Payment method is required"),
    }),
    onSubmit: (values) => {
      addAccountHandler();
    },
  });

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <form
            onSubmit={formik.handleSubmit}
            className=" px-8 pt-6 pb-8 w-full"
          >
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Add Account</h3>
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
                <div className="felx flex-row w-80">
                  <div>
                    <label className="block text-black text-sm font-base mb-1">
                      English Account Name
                    </label>
                    <input
                      name="englishName"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setEnglishAccountName(e.target.value);
                      }}
                    />
                    {formik.touched.englishName && formik.errors.englishName ? (
                      <div className="text-[13px] text-red-500">
                        {formik.errors.englishName}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-black text-sm font-base mb-1">
                      Amharic Account Name
                    </label>
                    <input
                      name="amharicName"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setAmharicAccountName(e.target.value);
                      }}
                    />
                    {formik.touched.amharicName && formik.errors.amharicName ? (
                      <div className="text-[13px] text-red-500">
                        {formik.errors.amharicName}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-black text-sm font-base mb-1">
                      Account Number
                    </label>
                    <input
                      name="accountNumber"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setAccountNumber(e.target.value);
                      }}
                    />
                    {formik.touched.accountNumber &&
                    formik.errors.accountNumber ? (
                      <div className="text-[13px] text-red-500">
                        {formik.errors.accountNumber}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label className="block text-black text-sm font-base mb-1">
                      Account Type
                    </label>
                    <input
                      name="accountType"
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      onChange={(e) => {
                        formik.handleChange(e);
                        setAccountType(e.target.value);
                      }}
                    />
                    {formik.touched.accountType && formik.errors.accountType ? (
                      <div className="text-[13px] text-red-500">
                        {formik.errors.accountType}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      for="countries"
                      class="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Select Payment Method
                    </label>
                    <select
                      class="bg-gr ay-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="paymentMethod"
                      onChange={(e) => {
                        formik.handleChange(e);
                        paymentSelectHandler(e);
                      }}
                    >
                      <option value="">
                        Select Payment Method English Name
                      </option>
                      {PaymentData?.data?.data?.data.map((payment) => (
                        <>
                          <option key={payment?.id} value={payment?.id}>
                            {payment?.name?.english}
                          </option>
                        </>
                      ))}
                    </select>
                    {formik.touched.paymentMethod &&
                    formik.errors.paymentMethod ? (
                      <p className="text-[13px] font-medium capitalize text-red-500">
                        {formik.errors.paymentMethod}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  disabled={addAccountMutation.isLoading}
                  className="bg-[#636ab1] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  {addAccountMutation.isLoading ? "saving.." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      <ToastContainer />
    </>
  );
};

export default AccountsAdd;
