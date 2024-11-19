// app/layout.js

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import { Metadata } from "next"; // For setting meta tags like title and description

export const metadata = {
  title: "Blog Management",
  description: "Manage your blog posts with ease",
};

export default function Layout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          {/* You can add additional head elements here, such as title, meta, etc. */}
        </head>
        <body>
          {/* You can place your sidebar and navbar components here */}
          <main className="container-fluid" style={{ padding: "0px" }}>
            {children}
          </main>
        </body>
      </html>
    </>
  );
}
