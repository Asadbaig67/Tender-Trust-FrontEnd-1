import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Tender from "../components/Tender";
import { TendersData } from "../data/dummy";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "@mui/material";
import NewsLetter from "../components/NewsLetter";
import LogoClouds from "../components/LogoClouds";
import Testimonials from "../components/Testimonials";
import { BiSearchAlt2 } from "react-icons/bi";
import Navbar_1 from "../components/Navbar_1";

const Home = () => {
  return (
    <div>
      {/* <div className="fixed w-full bg-white top-0 left-0 z-50">
        <Navbar_1 />
      </div> */}
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-16 mx-auto text-center">
          <div className="max-w-lg mt-5 mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
              Unlocking the Future of Tendering with Blockchain
            </h1>
            <p className="mt-6 text-gray-500 dark:text-gray-300">
              Revolutionize the way you manage and participate in tenders. Our
              cutting-edge blockchain technology ensures transparency, security,
              and efficiency in the entire tendering process. Say goodbye to
              traditional methods and embrace the future of tendering.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Search
              </label>
              <input
                id="search"
                name="email"
                type="text"
                autoComplete="search"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Search Tender"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-black bg-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <BiSearchAlt2 />
              </button>
            </div>
          </div>

          <div className="flex rounded-xl justify-center mt-10">
            {/* <Carousel
              className="object-cover w-full h-96 lg:w-4/5"
              showArrows={true}
              showStatus={true}
              showIndicators={true}
              infiniteLoop={true}
              autoPlay={true}
              interval={5000}
            >
              <div>
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
                  alt="Slide 1"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
                  alt="Slide 1"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
                  alt="Slide 1"
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
                  alt="Slide 1"
                />
              </div>
            </Carousel> */}
            <img
              className="object-cover w-full h-96 rounded-xl lg:w-4/5"
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
              alt=""
            />
          </div>

          <div className="mt-[40px] text-white">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold lg:ml-5">Latest Tenders</h1>
              <Link to='/tenders'>
                <Button
                  endIcon={<FaArrowRight />}
                  style={{
                    backgroundColor: "#fff",
                    marginRight: "20px",
                    color: "#000",
                  }}
                  className="p-2 font-semibold  rounded-lg"
                >
                  Explore All
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {TendersData.slice(0, 3).map((item, index) => {
                return (
                  <Tender
                    key={index}
                    title={item.title}
                    author={item.author}
                    description={item.description}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-5">
            <LogoClouds />
          </div>

          <div className="mt-5">
            <NewsLetter />
          </div>

          <div className="mt-5">
            <Testimonials />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
