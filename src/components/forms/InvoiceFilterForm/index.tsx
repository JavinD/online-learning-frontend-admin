import React from "react";
import GenericSelect from "../../inputs/GenericSelect";

type Props = {
  handleStatusChange: (newValue: any, actionMeta: any) => void;
  handleDateChange: (newValue: any, actionMeta: any) => void;
  handleSortDirChange: (newValue: any, actionMeta: any) => void;
};

export default function InvoiceFilterForm({
  handleStatusChange,
  handleDateChange,
  handleSortDirChange,
}: Props) {
  const statusOptions = [
    { value: "", label: "All" },
    { value: "awaiting_payment", label: "Awaiting Payment" },
    { value: "awaiting_confirmation", label: "Awaiting Confirmation" },
    { value: "completed", label: "Completed" },
    { value: "canceled", label: "Canceled" },
  ];

  const transactionDateOptions = [
    { value: "", label: "All Time" },
    { value: "7days", label: "Last 7 days" },
    { value: "30days", label: "Last 30 days" },
    { value: "90days", label: "Last 90 days" },
    { value: "365days", label: "Last 365 days" },
  ];

  const sortOptions = [
    { value: "asc", label: "Oldest" },
    { value: "desc", label: "Latest" },
  ];

  return (
    <div className="container">
      {/* FIlter Inputs */}
      <div className="filter-inputs row d-flex justify-content-center align-items-center">
        <div className="filter-input col-md-4">
          <div className="category-input">
            <GenericSelect
              defaultOptions={statusOptions}
              isMulti={false}
              handleChange={handleStatusChange}
              placeholder="Filter by Status"
            />
          </div>
        </div>
        <div className="filter-input col-md-4">
          <div className="sort-input">
            <GenericSelect
              defaultOptions={transactionDateOptions}
              isMulti={false}
              handleChange={handleDateChange}
              placeholder="Filter by Date: "
            />
          </div>
        </div>

        <div className="filter-input col-md-4">
          <div className="sort-input">
            <GenericSelect
              defaultOptions={sortOptions}
              isMulti={false}
              handleChange={handleSortDirChange}
              placeholder="Sort By: "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
