"use client";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        {/* Import Noto Sans font with weight 500 */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500&display=swap"
        />
      </Head>

      <div>
        {/* Banner Section */}
        <div
          className="position-relative"
          style={{ height: "60vh", overflow: "hidden" }}
        >
          {/* Background Image */}
          <Image
            src="/banner1.jpg" // Replace with your image path
            alt="Athens View"
            layout="fill"
            objectFit="cover"
            quality={100}
          />

          {/* 
          Text and Button */}
          <div
            className="position-absolute top-50 start-0 translate-middle-y text-white"
            style={{
              padding: "20px",
              marginLeft: "50px", // Adjust for spacing from left
              borderRadius: "8px",
              fontFamily: "'Noto Sans', sans-serif", // Apply Noto Sans here
              fontWeight: "500", // Apply font weight 500
            }}
          >
            <h1
              className="fw-bold"
              style={{
                fontFamily: "'Noto Sans', sans-serif",
                fontWeight: "600",
                fontSize: "41px",
              }}
            >
              Athens
            </h1>
            <a
              href="#jobs"
              className="btn btn-pink mt-3"
              style={{
                backgroundColor: "#ff0082",
                marginTop: "20px",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                textTransform: "uppercase",
                fontWeight: "500",
                fontSize: "14px",
                fontFamily: "'Noto Sans', sans-serif", // Apply Noto Sans here as well
              }}
            >
              View all job openings
            </a>
          </div>
        </div>

        {/* Pink and Purple Strip */}
        <div
          className="gradient-strip"
          style={{
            height: "35px", // Height of the strip
            background: "linear-gradient(to right,  #8e44ad,#ff007f)", // Pink to purple gradient
          }}
        ></div>

        <style jsx>{`
          .gradient-strip {
            width: 100%; /* Default to full width */
          }
          @media (min-width: 992px) {
            /* Applies to large screens and above (bootstrap lg breakpoint) */
            .gradient-strip {
              width: 80%;
              margin: 0 auto; /* Centers the strip */
            }
          }
        `}</style>
      </div>
    </>
  );
}
