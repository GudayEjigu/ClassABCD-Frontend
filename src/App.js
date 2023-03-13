import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/home/Dashboard";
import { Bars } from "react-loader-spinner";
import { useAuth } from "./context/auth";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Category from "./pages/Blog/CategoryBlog";
import CategoryBlog from "./pages/Blog/CategoryBlog";
import CategoryCommunity from "./pages/community/CategoryCommunity";
import GoogleFontLoader from "react-google-font-loader";

import Forum from "./pages/community/Forum";
import { toast, ToastContainer } from "react-toastify";

import ReportManagmentCommunity from "./pages/community/ReportManagmentCommunity";
import Trisemester from "./pages/Blog/trisemester/Trisemester";
import Tag from "./pages/Blog/tag/Tag";
import Group from "./pages/Group/Group/Group";
import Blog from "./pages/Blog/blog/Blog";
import Week from "./pages/Blog/week/Week";
import PaymentMethods from "./pages/Ecommerce/payment methods/PaymentMethods";
import Posts from "./pages/Group/Group/Posts";
import BlogView from "./pages/Blog/blog/BlogView";
import Orders from "./pages/Ecommerce/orders/Orders";
import Products from "./pages/Ecommerce/products/Products";

import Reason from "./pages/report/reason/Reason";
import Banner from "./pages/banner/Banner";
import AppointmentManagment from "./pages/expert/appointment/AppointmentManagment";

import Exercises from "./pages/tools/exercises/Exercises";
import QuestionAnswerReports from "./pages/report/reports/questionAnswerReports/QuestionAnswerReports";
import QuestionAnswerReplyReports from "./pages/report/reports/questionAnswerReplyReports/QuestionAnswerReplyReports";
import BlogReports from "./pages/report/reports/blogReports/BlogReports";
import BlogCommentReports from "./pages/report/reports/blogCommentReports/BlogCommentReports";
import QuestionReports from "./pages/report/reports/questionReports/QuestionReports";
import Unit from "./pages/Ecommerce/product unit/Unit";
import OrderView from "./pages/Ecommerce/orders/OrderView";
import Accounts from "./pages/Ecommerce/accounts/Accounts";
import ProductsView from "./pages/Ecommerce/products/ProductsView";
import Speciality from "./pages/expert/speciality/Speciality";
import ManageExpert from "./pages/expert/manage expert/ManageExpert";
import Locations from "./pages/tools/locations/Locations";
import EmoticonTypes from "./pages/tools/emoticon types/EmoticonTypes";
import Emoticons from "./pages/tools/emoticons/Emoticons";

const App = () => {
  const { token, user, checked } = useAuth();
  function LoginComp() {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  function HomeComp() {
    return (
      <>
        {" "}
        <GoogleFontLoader
          fonts={[
            {
              font: "Poppins",
              weights: [300, "400i"],
            },
          ]}
        />
        <div className="" style={{ fontFamily: "Poppins" }}>
          <div className=" ">
            <div className=" bg-gray-200 flex flex-row h-[100vh] overflow-y-scroll ">
              <div className=" w-[25%] shadow-sm  bg-white  ">
                <SideBar />
              </div>
              <div className="  w-[100%] ">
                <div className=" rounded-lg ">
                  <div className="h-20  ml-8 mt-8 border-t mr-8  bg-white shadow-sm pb-4">
                    <NavBar />
                  </div>

                  <div className="m-8 p-8 bg-white">
                    <Routes>
                      {" "}
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/category-blog" element={<CategoryBlog />} />
                      <Route path="/tag" element={<Tag />} />
                      <Route path="/trisemester" element={<Trisemester />} />
                      <Route path="/posts/:id" element={<Posts />} />
                      <Route path="/accounts" element={<Accounts />} />
                      <Route
                        path="/payment-methods"
                        element={<PaymentMethods />}
                      />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/orders/:id" element={<OrderView />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/products/:id" element={<ProductsView />} />
                      <Route path="/units" element={<Unit />} />
                      <Route
                        path="/question-answer-reports"
                        element={<QuestionAnswerReports />}
                      />
                      <Route
                        path="/question-answer-reply-reports"
                        element={<QuestionAnswerReplyReports />}
                      />
                      <Route path="/blog-reports" element={<BlogReports />} />
                      <Route
                        path="/blog-comment-reports"
                        element={<BlogCommentReports />}
                      />
                      <Route
                        path="/question-reports"
                        element={<QuestionReports />}
                      />
                      <Route path="/reason" element={<Reason />} />
                      <Route path="/banner" element={<Banner />} />
                      <Route
                        path="/appointment"
                        element={<AppointmentManagment />}
                      />
                      <Route path="/exercises" element={<Exercises />} />
                      <Route
                        path="/category-community"
                        element={<CategoryCommunity />}
                      />
                      <Route path="/group" element={<Group />} />
                      <Route path="/forum" element={<Forum />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog-view/:id" element={<BlogView />} />
                      <Route path="/week" element={<Week />} />
                      <Route
                        path="/report-managment-community"
                        element={<ReportManagmentCommunity />}
                      />
                      <Route path="/speciality" element={<Speciality />} />
                      <Route path="/manage-expert" element={<ManageExpert />} />
                      <Route path="/emoticons" element={<Emoticons />} />
                      <Route path="/locations" element={<Locations />} />
                      <Route
                        path="/emoticon-types"
                        element={<EmoticonTypes />}
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function RoutComp() {
    if (token && user) {
      return (
        <>
          <HomeComp />
        </>
      );
    } else {
      return <LoginComp />;
    }
  }
  return (
    <div>
      <>
        {checked ? (
          <RoutComp />
        ) : (
          <div className="h-44 flex items-center justify-center min-h-screen">
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
        )}
      </>
    </div>
  );
};

export default App;
