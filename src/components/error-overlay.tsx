import { clearError } from "./actions/handle-error";

const ErrorOverlay: React.FC = () => {
  let ret = (
    <>
      <div id="error-overlay" className="overlay" onClick={() => clearError()}>
        <div
          id="error-popup"
          className="popup"
          onClick={() => clearError()}
        ></div>
      </div>
    </>
  );

  return ret;
};

export { ErrorOverlay };
