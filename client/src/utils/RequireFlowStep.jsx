import { Navigate } from "react-router-dom";

export default function RequireFlowStep({ step, children }) {
  const flowStep = localStorage.getItem("reset_step");

  // Nếu chưa có bước nào mà lại vào otp hoặc đặt mật khẩu → CẤM
  if (!flowStep) {
    return <Navigate to="/quenmatkhau" replace />;
  }

  // Nếu chưa qua bước OTP mà vào đặt mật khẩu → CẤM
  if (step === 2 && flowStep !== "otp_verified") {
    return <Navigate to="/quenmatkhau" replace />;
  }

  return children;
}
