import { AiOutlineArrowRight } from "react-icons/ai";

const KycVerifyEmailBody = () => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col p-3 md:p-10 h-full w-full justify-center items-center my-10">
        <div className="bg-[#EDB84233] flex flex-row p-3 md:p-10 text-center items-center max-w-xl rounded-sm">
          <form className="bg-[#FFFFFF] m-0 w-full py-8 px-3 md:px-6 rounded-md shadow-lg flex flex-col gap-4">
            <div className="font-[700] text-[13px] md:text-[20px] text-[#191C1F]">
              Kyc Password Verification
            </div>
            <div className="font-[400] text-[11px] md:text-[15px] md:text-[#5F6C72]">
              Enter the email address associated with the{" "}
              <span className="text-[#EDB842]">Sondya</span> account you are
              logged into.
            </div>
            <div className="flex flex-row justify-start text-[12px] md:text-[18px]">
              <span className="text-[#191C1F] font-[400] ">Email Address</span>
            </div>
            <input
              type="email"
              className="outline-none border hover:border-[#EDB842] rounded-md p-2"
              name="email"
              autoFocus={true}
            />
            <small>
              A 4-digit code will be sent to your email which you will use for
              verification
            </small>

            <button
              type="submit"
              className="p-2 flex flex-row justify-center gap-3 items-center rounded-md bg-[#EDB842] text-center text-white"
            >
              <span>Send Code</span>
              <AiOutlineArrowRight />
            </button>

            <hr />
            <div className="text-[#475156] text-[11px] md:text-[15px]">
              Check
              <span className="text-[#EDB842]"> Spam account</span> in your
              email , if you didnt receive the email in your inbox.
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default KycVerifyEmailBody;
