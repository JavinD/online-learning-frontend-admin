import React from "react";
import { ICartItem, ITransaction } from "../../../interfaces";
import { toRupiah } from "../../../utils/util";
import CourseCategory from "../../course/Category";
import "./style.scss";

type Props = {
  cartItem: ICartItem | ITransaction;
  handleRemoveItem: (courseId: string) => void;
};

export default function CartItemCard({ cartItem, handleRemoveItem }: Props) {
  const courseId = cartItem.course.id.toString();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to remove this item?")) {
      handleRemoveItem(courseId);
    } else {
    }
  };

  function instanceOfTransaction(data: any): data is ITransaction {
    return "price" in data;
  }

  if (instanceOfTransaction(cartItem)) {
    return (
      <div className="d-flex align-items-center mb-3 border shadow-sm bg-light ">
        <div className="flex-shrink-0">
          <img
            src={cartItem.course.img_thumbnail}
            className="img-fluid"
            style={{ width: 150 }}
            alt="Generic placeholder"
          />
        </div>
        <div className="flex-grow-1 ms-3">
          <a href="#!" className="float-end text-black">
            <i className="fas fa-times" />
          </a>
          <h5 className="cart-item-title">{cartItem.course.title}</h5>
          <div className="col-md-4 d-flex justify-content-center cart-category">
            <CourseCategory label={cartItem.course.category.name} />
          </div>

          <div className="d-flex align-items-center">
            <p className="fw-bold mb-0 me-5 pe-3">
              {toRupiah(cartItem.course.price)}
            </p>
            <div className="def-number-input">
              <span>
                Quantity: <strong>1</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center mb-5 border shadow-sm bg-light">
      <div className="flex-shrink-0">
        <img
          src={cartItem.course.img_thumbnail}
          className="img-fluid"
          style={{ width: 150 }}
          alt="Generic placeholder"
        />
      </div>
      <div className="flex-grow-1 ms-3">
        <a href="#!" className="float-end text-black">
          <i className="fas fa-times" />
        </a>
        <h5 className="cart-item-title">{cartItem.course.title}</h5>
        <div className="col-md-4 d-flex justify-content-center">
          <CourseCategory label={cartItem.course.category.name} />
        </div>

        <div className="d-flex align-items-center">
          <p className="fw-bold mb-0 me-5 pe-3">
            {toRupiah(cartItem.course.price)}
          </p>
          <div className="def-number-input">
            <span>
              Quantity: <strong>1</strong>
            </span>
          </div>
        </div>
      </div>
      <button className="btn btn-remove" onClick={handleClick}>
        X
      </button>
    </div>
  );
}
