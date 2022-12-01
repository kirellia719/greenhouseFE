import React from "react";

const Modal = (props) => {
  return (
    <div
      className="modal fade myModal"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Bạn có muốn chỉnh thông số ngưỡng
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div
              className="row"
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                marginBottom: "10px",
              }}
            >
              Ngưỡng của {props.label.toLowerCase()} ban đầu là:
            </div>
            <div
              className="row"
              style={{ fontSize: "20px", marginBottom: "10px" }}
            >
              Giá trị nhỏ nhất ban đầu: {props.min}
            </div>
            <div
              className="row"
              style={{ fontSize: "20px", marginBottom: "10px" }}
            >
              Giá trị lớn nhất ban đầu: {props.max}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={props.conFirmHandler}
              data-bs-dismiss="modal"
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
