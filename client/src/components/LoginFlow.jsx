import Login from "./Login";
import QuenMatKhau from "./QuenMatKhau";
import NhapOTP from "./NhapOTP";
import DatMatKhauMoi from "./DatMatKhauMoi";

export default function LoginFlow({ step, setStep, resetEmail, setResetEmail }) {

  if (step === 1) {
    return (
      <QuenMatKhau
        onNext={(email) => {
          setResetEmail(email);
          setStep(2);
        }}
      />
    );
  }

  if (step === 2) {
    return (
      <NhapOTP
        email={resetEmail}
        onNext={() => setStep(3)}
      />
    );
  }

  if (step === 3) {
    return (
      <DatMatKhauMoi
        email={resetEmail}
        onNext={() => setStep(0)}
      />
    );
  }

  return <Login openForget={() => setStep(1)} />;
}
