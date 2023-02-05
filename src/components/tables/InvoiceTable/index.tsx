import { useNavigate } from "react-router-dom";
import { IInvoicePagination } from "../../../interfaces";
import { toDate, toRupiah } from "../../../utils/util";
import TableItem from "../TableItem";
import "./styles.scss";

type Props = {
  invoices: IInvoicePagination | undefined;
  handleCancelInvoice: (id: string, action: string) => void;
  handleConfirmInvoice: (id: string, action: string) => void;
};

export default function InvoiceTable({
  invoices,
  handleCancelInvoice,
  handleConfirmInvoice,
}: Props) {
  const actionCancel = "cancel";
  const actionConfirm = "confirm";
  const navigate = useNavigate();
  const chooseClassForStatus = (status: string): string => {
    switch (status) {
      case "completed":
        return "bg-success";
      case "awaiting_payment":
        return "bg-warning";
      case "canceled":
        return "bg-danger";
      case "awaiting_confirmation":
        return "bg-info";
      default:
        return "bg-secondary";
    }
  };

  const parseStatus = (status: string): string => {
    switch (status) {
      case "completed":
        return "Completed";
      case "awaiting_payment":
        return "Awaiting Payment";
      case "canceled":
        return "Canceled";
      case "awaiting_confirmation":
        return "Awaiting Confirmation";
      default:
        return "Unknown";
    }
  };

  return (
    <div>
      {/* Invoices Table */}
      <div className="row table-container">
        <div className="col-lg-12">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Invoice ID</th>
                  <th scope="col">Total</th>
                  <th scope="col">Transaction Date</th>
                  <th scope="col">Payment Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {invoices?.data && invoices.data.length > 0 ? (
                  invoices.data.map((invoice, index) => {
                    return (
                      <tr key={invoice.id}>
                        <th scope="row ">{index + 1}</th>
                        <TableItem child={invoice.id} />
                        <TableItem child={toRupiah(invoice.total)} />
                        <TableItem child={toDate(invoice.created_at)} />
                        <TableItem
                          child={
                            invoice.payment_date
                              ? toDate(invoice.payment_date)
                              : "-"
                          }
                        />
                        <TableItem
                          child={
                            <span
                              className={`badge ${chooseClassForStatus(
                                invoice.status
                              )}`}
                            >
                              {parseStatus(invoice.status)}
                            </span>
                          }
                        />
                        <TableItem
                          child={
                            <div className="action-buttons">
                              <button
                                onClick={() => {
                                  navigate(`/invoice/${invoice.id}`);
                                }}
                                className="btn btn-sm btn-primary"
                              >
                                Details
                              </button>

                              <button
                                onClick={() =>
                                  handleConfirmInvoice(
                                    invoice.id.toString(),
                                    actionConfirm
                                  )
                                }
                                className={
                                  "btn btn-sm btn-success " +
                                  (invoice.status !== "awaiting_confirmation"
                                    ? "d-none"
                                    : "")
                                }
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() =>
                                  handleCancelInvoice(
                                    invoice.id.toString(),
                                    actionCancel
                                  )
                                }
                                className={
                                  "btn btn-sm btn-danger " +
                                  (invoice.status === "completed" ||
                                  invoice.status === "canceled"
                                    ? "d-none"
                                    : "")
                                }
                              >
                                Cancel
                              </button>
                            </div>
                          }
                        />
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center">
                      No Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
