import React from "react";
import Pagination from "@mui/material/Pagination";
import "./styles.css";

export default function PaginationComponent({ page, handlePageChange }) {
  return (
    <div className="pagination-container">
      <Pagination
        className="pagination-component"
        count={10}
        page={page}
        onChange={handlePageChange}
        size="large"
        showFirstButton
        showLastButton
      />
    </div>
  );
}
