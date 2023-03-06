import React, { useState } from "react";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useAuth } from "../../../context/auth";

import OrdersTable from "./OrdersTable";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(false);
  const [editOrderId, setEditOrderId] = useState(false);

  const [viewOrderId, setViewOrderId] = useState(false);
  const [editOrdId, setEditOrdId] = useState(false);

  const { token, user } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const OrderData = useQuery(
    ["OrderDataApi", showModal, deleteOrderId, editOrderId, editOrdId],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}admin/orders`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: () => {
        //  console.log(categoryData?.data?.data?.data[1]?.name?.amharic);
        setDeleteOrderId(null);
      },
      onError: (res) => {
        if (res?.response?.status == 401) {
          console.log(res.message);
        }
      },
    }
  );
  return (
    <div>
      <h2 class="mb-4 ml-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">
        Orders
      </h2>
      {/* modal
    <div className="flex justify-end p-2">
    <button
      className=" block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      type="button"
      onClick={() => setShowModal(true)}
    >
      Add Group
    </button>
  </div>
  {showModal ? <GroupAdd setShowModal={setShowModal} /> : null} */}
      {OrderData.error ? (
        <div className="text-red-700 text-4xl">Error!</div>
      ) : null}
      {OrderData.isLoading ? (
        <div className="h-44 flex items-center justify-center min-h-0">
          <Bars
            height="40"
            width="40"
            color="#636ab1"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div>
          <div class="relative shadow-md sm:rounded-lg">
            <TableContainer class="w-full text-sm text-left text-gray-500">
              <Table>
                <TableHead class="text-xs text-gray-700 uppercase ">
                  <TableRow>
                    <TableCell />

                    <TableCell align="left">User name</TableCell>
                    <TableCell align="right">Phone</TableCell>
                    <TableCell align="right">Order Status</TableCell>
                    <TableCell align="right">Issue Date</TableCell>
                    <TableCell align="right">Total Price</TableCell>
                    <TableCell align="center">Grand Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {OrderData?.data?.data?.data.map((order, id) => (
                    <OrdersTable key={id} order={order} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
