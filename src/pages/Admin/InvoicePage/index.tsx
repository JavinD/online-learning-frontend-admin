import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import InvoiceFilterForm from "../../../components/forms/InvoiceFilterForm";
import GenericPagination from "../../../components/navigations/GenericPagination";
import InvoiceTable from "../../../components/tables/InvoiceTable";
import ToastComponent from "../../../components/toast";
import { RootState } from "../../../store";
import {
  fetchInvoices,
  InvoiceDispatch,
} from "../../../store/slices/invoice/invoiceSlice";
import { toastFailed, toastSuccess } from "../../../utils/util";

export default function InvoicePage() {
  const API_URL_ADMIN = process.env.REACT_APP_API__URL_AUTH_ADMIN;
  const [cookies] = useCookies(["admin_token"]);
  const { invoices } = useSelector((state: RootState) => state.invoice);
  const invoiceDispatch: InvoiceDispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [currentSortDir, setCurrentSortDir] = useState<string>("desc");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");

  useEffect(() => {
    invoiceDispatch(
      fetchInvoices({
        page: pageNumber,
        search: "",
        size: 10,
        sortBy: "created_at",
        sortDir: currentSortDir,
        last: filterDate,
        tags: "",
        category: "",
        status: filterStatus,
        access_token: cookies.admin_token,
      })
    );
  }, [
    cookies,
    invoiceDispatch,
    pageNumber,
    currentSortDir,
    filterDate,
    filterStatus,
  ]);

  useEffect(() => {
    if (invoices !== undefined) {
      setPageTotal(
        Math.ceil(
          invoices?.pagination_response.total_item /
            invoices?.pagination_response.limit
        )
      );
    }
  }, [invoices]);

  const handleConfirmInvoice = (id: string, action: string) => {
    if (window.confirm("Are you sure you want to confirm?")) {
    } else {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.admin_token}`,
      },
      body: JSON.stringify({
        action: action,
      }),
    };

    fetch(API_URL_ADMIN + "/invoice/" + id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Error 404: Not Found");
          }
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((res) => {
        invoiceDispatch(
          fetchInvoices({
            page: pageNumber,
            search: "",
            size: 10,
            sortBy: "created_at",
            sortDir: currentSortDir,
            last: filterDate,
            tags: "",
            category: "",
            status: filterStatus,
            access_token: cookies.admin_token,
          })
        );
        toastSuccess("Invoice confirmed");
      })
      .catch((error) => {
        toastFailed("Failed to confirm invoice");
      });
  };

  const handleCancelInvoice = (id: string, action: string) => {
    if (window.confirm("Are you sure you want to cancel?")) {
    } else {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.admin_token}`,
      },
      body: JSON.stringify({
        action: action,
      }),
    };

    fetch(API_URL_ADMIN + "/invoice/" + id, requestOptions)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Error 404: Not Found");
          }
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((res) => {
        invoiceDispatch(
          fetchInvoices({
            page: pageNumber,
            search: "",
            size: 10,
            sortBy: "created_at",
            sortDir: currentSortDir,
            last: filterDate,
            tags: "",
            category: "",
            status: filterStatus,
            access_token: cookies.admin_token,
          })
        );
        toastSuccess("Invoice cancelled");
      })
      .catch((error) => {
        toastFailed("Failed to cancel invoice");
      });
  };

  const handleStatusChange = (newValue: any, actionMeta: any) => {
    setFilterStatus(newValue.value);
    setPageNumber(1);
  };

  const handleDateChange = (newValue: any, actionMeta: any) => {
    setFilterDate(newValue.value);
    setPageNumber(1);
  };

  const handleSortDirChange = (newValue: any, actionMeta: any) => {
    setCurrentSortDir(newValue.value);
    setPageNumber(1);
  };

  return (
    <div className="container">
      <ToastComponent />
      <div className="row">
        <div className="col-12 section-container">
          <h1 className="h3 mb-2 text-gray-800 section-title">Invoices</h1>
          <p className="mb-4 section-subtitle">
            These are all of the invoices in history.
          </p>
        </div>
      </div>
      {/* Invoice Table */}

      <InvoiceFilterForm
        handleDateChange={handleDateChange}
        handleSortDirChange={handleSortDirChange}
        handleStatusChange={handleStatusChange}
      />
      <InvoiceTable
        handleCancelInvoice={handleCancelInvoice}
        handleConfirmInvoice={handleConfirmInvoice}
        invoices={invoices}
      />

      <GenericPagination
        pageNumber={pageNumber}
        pageTotal={pageTotal}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}
