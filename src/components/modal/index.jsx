import { useStore, actionStore } from "../../store";
import "./style.css";
import HeaderForm from "../form/headerForm";
import MainForm from "../form/mainform";

function Modal() {
  const [state, dispatch] = useStore();
  const { user, address, image, isShowModal, modalType } = state;

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="modal-header">
          <HeaderForm modalType={modalType} data={{ user, address, image }} />
          <button
            className="close-btn"
            type="button"
            onClick={() => dispatch(actionStore.handleModal(isShowModal))}
          >
            X
          </button>
        </div>
        <div className="modal-body">
          <MainForm modalType={modalType} data={{ user, address, image }} />
        </div>
      </div>
    </div>
  );
}

export default Modal;






