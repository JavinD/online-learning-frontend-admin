import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GenericButton from "../../../components/buttons/GenericButton";
import CourseTable from "../../../components/tables/CourseTable";
import InvoiceTable from "../../../components/tables/InvoiceTable";
import ToastComponent from "../../../components/toast";
import { RootState } from "../../../store";
import {
  CourseDispatch,
  fetchCourses,
} from "../../../store/slices/course/courseSlice";
import {
  fetchInvoices,
  InvoiceDispatch,
} from "../../../store/slices/invoice/invoiceSlice";
import { toastFailed, toastSuccess } from "../../../utils/util";
import "./styles.scss";

export default function DashboardPage() {
  const API_URL_ADMIN = process.env.REACT_APP_API__URL_AUTH_ADMIN;
  const [cookies] = useCookies(["admin_token"]);
  const { invoices } = useSelector((state: RootState) => state.invoice);
  const invoiceDispatch: InvoiceDispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.course);
  const courseDispatch: CourseDispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    invoiceDispatch(
      fetchInvoices({
        page: 1,
        search: "",
        size: 10,
        sortBy: "created_at",
        sortDir: "asc",
        last: "",
        tags: "",
        category: "",
        status: "awaiting_confirmation",
        access_token: cookies.admin_token,
      })
    );
  }, [cookies, invoiceDispatch]);

  useEffect(() => {
    courseDispatch(
      fetchCourses({
        page: 1,
        search: "",
        size: 10,
        sortBy: "created_at",
        sortDir: "asc",
        last: "",
        tags: "",
        category: "",
        status: "",
        access_token: "",
      })
    );
  }, [courseDispatch]);

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
            page: 1,
            search: "",
            size: 10,
            sortBy: "created_at",
            sortDir: "asc",
            last: "",
            tags: "",
            category: "",
            status: "awaiting_confirmation",
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
            page: 1,
            search: "",
            size: 10,
            sortBy: "created_at",
            sortDir: "asc",
            last: "",
            tags: "",
            category: "",
            status: "awaiting_confirmation",
            access_token: cookies.admin_token,
          })
        );
        toastSuccess("Invoice cancelled");
      })
      .catch((error) => {
        toastFailed("Failed to cancel invoice");
      });
  };

  const handleDeleteCourse = (slug: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
    } else {
      return;
    }
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.admin_token}`,
      },
    };

    fetch(API_URL_ADMIN + "/course/" + slug, requestOptions)
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
        courseDispatch(
          fetchCourses({
            page: 1,
            search: "",
            size: 10,
            sortBy: "created_at",
            sortDir: "asc",
            last: "",
            tags: "",
            category: "",
            status: "",
            access_token: cookies.admin_token,
          })
        );
        toastSuccess("Course deleted");
      })
      .catch((error) => {
        toastFailed("Failed to delete course");
      });
  };

  const handleEditCourse = (slug: string) => {
    navigate("/course/" + slug);
  };

  return (
    <div className="container">
      <ToastComponent />
      {/* Invoice Heading */}
      <div className="row ">
        <div className="col-12 section-container">
          <h1 className="h3 mb-2 text-gray-800 section-title">Invoices</h1>
          <p className="mb-4 section-subtitle">
            These are some of the invoices that are awaiting your confirmation.
          </p>
        </div>
      </div>
      {/* Invoice Table */}

      <InvoiceTable
        handleCancelInvoice={handleCancelInvoice}
        handleConfirmInvoice={handleConfirmInvoice}
        invoices={invoices}
      />

      {/* Go to Invoices Page button */}
      <div className="row">
        <div className="col-12">
          <GenericButton
            onClick={() => {
              navigate("/invoice");
            }}
            label="See All Invoices"
          />
        </div>
      </div>

      {/* Courses Heading */}
      <div className="row section-container">
        <div className="col-12">
          <h1 className="h3 mb-2 text-gray-800 section-title">Courses</h1>
          <p className="mb-4 section-subtitle">
            These are some of the courses that are available on DigiEdu.
          </p>
        </div>
      </div>

      {/* Courses Table */}
      <CourseTable
        handleDeleteCourse={handleDeleteCourse}
        handleEditCourse={handleEditCourse}
        courses={courses?.data}
      />

      {/* Go to Courses Page button */}
      <div className="row">
        <div className="col-12">
          <GenericButton
            onClick={() => {
              navigate("/course");
            }}
            label="See All Courses"
          />
        </div>
      </div>
    </div>
  );
}
