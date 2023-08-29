import React from "react";
import { Link } from "react-router-dom";

const CustomBreadcrumb = ({ productTitle }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li
          className="breadcrumb-item active breadcrumb-product"
          aria-current="page"
        >
          {productTitle}
        </li>
      </ol>
    </nav>
  );
};

export default CustomBreadcrumb;
