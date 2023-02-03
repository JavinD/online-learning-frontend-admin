import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InvoiceForm from "../../../components/forms/InvoiceForm";
import { RootState } from "../../../store";
import {
  fetchInvoiceDetail,
  InvoiceDetailDispatch,
} from "../../../store/slices/invoice/invoiceDetailSlice";
import { toastFailed, toastSuccess } from "../../../utils/util";

export default function InvoicePayPage() {
  const { invoice } = useSelector((state: RootState) => state.invoiceDetail);
  const invoiceDetailDispatch: InvoiceDetailDispatch = useDispatch();
  const { id } = useParams();
  const [cookies] = useCookies(["admin_token"]);
  const discount = useRef(0);
  const total = useRef(0);
  const idNum = Number(id);
  const API_URL_ADMIN = process.env.REACT_APP_API__URL_AUTH_ADMIN;

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
        invoiceDetailDispatch(
          fetchInvoiceDetail({
            id: idNum,
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
        invoiceDetailDispatch(
          fetchInvoiceDetail({
            id: idNum,
            access_token: cookies.admin_token,
          })
        );
        toastSuccess("Invoice cancelled");
      })
      .catch((error) => {
        toastFailed("Failed to cancel invoice");
      });
  };

  useEffect(() => {
    invoiceDetailDispatch(
      fetchInvoiceDetail({
        id: idNum,
        access_token: cookies.admin_token,
      })
    );
  }, [invoiceDetailDispatch, cookies.admin_token, idNum]);

  useEffect(() => {
    if (invoice) {
      discount.current = invoice.benefit_discount;
      total.current = invoice.total;
    }
  }, [invoice]);

  return (
    <div className="container mt-5">
      <InvoiceForm
        handleCancelInvoice={handleCancelInvoice}
        handleConfirmInvoice={handleConfirmInvoice}
        invoice={invoice}
      />
    </div>
  );
}
