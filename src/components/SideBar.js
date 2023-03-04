import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { VscDashboard } from "react-icons/vsc";
import {
  FaBlog,
  FaBloggerB,
  FaChevronDown,
  FaShoppingCart,
  FaTools,
} from "react-icons/fa";
import { TbReport } from "react-icons/tb";

import { SiCrowdsource } from "react-icons/si";
import { HiDocumentReport } from "react-icons/hi";

import {
  GiSandsOfTime,
  GiShoppingCart,
  GiTatteredBanner,
} from "react-icons/gi";
import { FaUserMd } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { AiFillDashboard, AiTwotoneSetting } from "react-icons/ai";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Logo from "../assets/Logo";

const SideBar = () => {
  const [open, setOpen] = useState(null);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <>
      <div>
        <div class="h-full bg-white    ">
          <ul class="">
            <li>
              <div className="pl-8 pt-6">
                <Logo />
              </div>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => [
                  "flex items-center pl-2 mt-6  border pt-4 pb-4 text-sm font-normal rounded-sm   ",
                  isActive
                    ? " bg-[#636ab1] pt-4 pb-4  mt-1 mb-1 text-white text-lg hover:text-gray-200"
                    : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                ]}
              >
                <AiFillDashboard className="mr-2 text-xl" /> Dashboard
              </NavLink>
            </li>
            <Fragment>
              <Accordion open={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)}>
                  <li>
                    <div class="  flex items-center  pl-2  text-sm font-normal text-gray-900 rounded-lg hover:text-[#636ab1] ">
                      <SiCrowdsource className="mr-2 text-xl" />
                      Community Forum
                    </div>
                  </li>
                </AccordionHeader>
                <AccordionBody>
                  {" "}
                  <div className="bg-gray-50 ">
                    <li>
                      <NavLink
                        to="/category-blog"
                        className={({ isActive }) => [
                          "flex items-center pl-6  pt-1 pb-1 mt-1 mb-1 text-xs font-normal rounded-sm     ",
                          isActive
                            ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg  hover:text-gray-200"
                            : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                        ]}
                      >
                        Category
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/group"
                        className={({ isActive }) => [
                          "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                          isActive
                            ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                            : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                        ]}
                      >
                        Group/room
                      </NavLink>
                    </li>
                  </div>
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 2}>
                <AccordionHeader onClick={() => handleOpen(2)}>
                  <li>
                    <div class="  flex items-center  pl-2 text-sm font-normal text-gray-900 rounded-lg hover:text-[#636ab1] active:text-[#636ab1]">
                      <FaBlog className="mr-2 text-xl" />
                      Blog
                    </div>
                  </li>
                </AccordionHeader>
                <AccordionBody>
                  {" "}
                  <div className="bg-gray-50 h-auto">
                    <li>
                      <NavLink
                        to="/tag"
                        className={({ isActive }) => [
                          "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                          isActive
                            ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                            : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                        ]}
                      >
                        Tag
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/trisemester"
                        className={({ isActive }) => [
                          "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                          isActive
                            ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                            : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                        ]}
                      >
                        Trisemester
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/week"
                        className={({ isActive }) => [
                          "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                          isActive
                            ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                            : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                        ]}
                      >
                        Week
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/blog"
                        className={({ isActive }) => [
                          "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                          isActive
                            ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                            : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                        ]}
                      >
                        Blog
                      </NavLink>
                    </li>
                  </div>
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 3}>
                <AccordionHeader onClick={() => handleOpen(3)}>
                  <div class="flex items-center  pl-2 text-sm font-normal text-gray-900 rounded-lg hover:text-[#636ab1] active:text-[#636ab1]">
                    <FaShoppingCart className="mr-2 text-xl" />
                    Ecommerce
                  </div>
                </AccordionHeader>
                <AccordionBody>
                  <div className="bg-gray-50 ">
                    <li>
                      <NavLink
                        to="/orders"
                        className={({ isActive }) => [
                          "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                          isActive
                            ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                            : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                        ]}
                      >
                        Orders
                      </NavLink>
                    </li>
                  </div>

                  <div className="bg-gray-50 ">
                    <li>
                      <NavLink
                        to="/products"
                        className={({ isActive }) => [
                          "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                          isActive
                            ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                            : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                        ]}
                      >
                        Products
                      </NavLink>
                    </li>
                  </div>
                  <div className="bg-gray-50 ">
                    <li>
                      <NavLink
                        to="/units"
                        className={({ isActive }) => [
                          "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                          isActive
                            ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                            : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                        ]}
                      >
                        Units
                      </NavLink>
                    </li>
                  </div>
                  <div className="bg-gray-50 ">
                    <li>
                      <NavLink
                        to="/Accounts"
                        className={({ isActive }) => [
                          "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                          isActive
                            ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                            : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                        ]}
                      >
                        Accounts
                      </NavLink>
                    </li>
                  </div>
                  <div className="bg-gray-50 ">
                    <li>
                      <NavLink
                        to="/payment-methods"
                        className={({ isActive }) => [
                          "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                          isActive
                            ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                            : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                        ]}
                      >
                        Payment Methods
                      </NavLink>
                    </li>
                  </div>
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 4}>
                <AccordionHeader onClick={() => handleOpen(4)}>
                  <li>
                    <div class="flex items-center  pl-2 text-sm font-normal text-gray-900 rounded-lg hover:text-[#636ab1] active:text-[#636ab1]">
                      <HiDocumentReport className="mr-2 text-xl" />
                      Report
                    </div>
                  </li>
                </AccordionHeader>
                <AccordionBody>
                  <div className="bg-gray-50 ">
                    <li>
                      <div className="bg-gray-50 ">
                        <li>
                          <NavLink
                            to="/question-answer-reports"
                            className={({ isActive }) => [
                              "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                              isActive
                                ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                                : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                            ]}
                          >
                            Question-answer-reports{" "}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/question-answer-reply-reports"
                            className={({ isActive }) => [
                              "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                              isActive
                                ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                                : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                            ]}
                          >
                            Question-answer-reply-reports{" "}
                          </NavLink>
                        </li>{" "}
                        <li>
                          <NavLink
                            to="/blog-reports"
                            className={({ isActive }) => [
                              "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                              isActive
                                ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                                : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                            ]}
                          >
                            Blog-reports{" "}
                          </NavLink>
                        </li>{" "}
                        <li>
                          <NavLink
                            to="/blog-comment-reports"
                            className={({ isActive }) => [
                              "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                              isActive
                                ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                                : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                            ]}
                          >
                            Blog-comment-reports{" "}
                          </NavLink>
                        </li>{" "}
                        <li>
                          <NavLink
                            to="/question-reports"
                            className={({ isActive }) => [
                              "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                              isActive
                                ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                                : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                            ]}
                          >
                            Question-reports{" "}
                          </NavLink>
                        </li>
                        <div className="bg-gray-50 ">
                          <li>
                            <NavLink
                              to="/reason"
                              className={({ isActive }) => [
                                "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                                isActive
                                  ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                                  : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                              ]}
                            >
                              Reason
                            </NavLink>
                          </li>
                        </div>
                      </div>
                    </li>
                  </div>
                </AccordionBody>
              </Accordion>

              <Accordion open={open === 5}>
                <AccordionHeader onClick={() => handleOpen(5)}>
                  <li>
                    <div class="flex items-center  pl-2 text-sm font-normal text-gray-900 rounded-lg hover:text-[#636ab1] active:text-[#636ab1] ">
                      <GiTatteredBanner className="mr-2 text-xl" />
                      Banner
                    </div>
                  </li>
                </AccordionHeader>
                <AccordionBody>
                  <div className="bg-gray-50 ">
                    <li>
                      <NavLink
                        to="/banner"
                        className={({ isActive }) => [
                          "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                          isActive
                            ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                            : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                        ]}
                      >
                        Banner
                      </NavLink>
                    </li>
                  </div>
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 6}>
                <AccordionHeader onClick={() => handleOpen(6)}>
                  <li>
                    <div class="flex items-center  pl-2 text-sm font-normal text-gray-900 rounded-lg hover:text-[#636ab1] active:text-[#636ab1] ">
                      <FaTools className="mr-2 text-xl" />
                      Tools
                    </div>
                  </li>
                </AccordionHeader>
                <AccordionBody>
                  <div className="bg-gray-50 ">
                    <li>
                      <NavLink
                        to="/appointment"
                        className={({ isActive }) => [
                          "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                          isActive
                            ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                            : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                        ]}
                      >
                        Appointment{" "}
                      </NavLink>
                    </li>
                  </div>

                  <div className="bg-gray-50 ">
                    <li>
                      <NavLink
                        to="/exercises"
                        className={({ isActive }) => [
                          "flex items-center pl-6  pt-1 pb-1 text-xs font-normal rounded-sm   ",
                          isActive
                            ? " bg-[#636ab1] pt-1 pb-1 mt-1 mb-1 text-white text-lg hover:text-gray-200"
                            : "text-gray-900  hover:bg-gray-200 hover:text-[#636ab1] ",
                        ]}
                      >
                        Exercises
                      </NavLink>
                    </li>
                  </div>
                </AccordionBody>
              </Accordion>
            </Fragment>

            <div className="bg-gray-50 h-auto"></div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
