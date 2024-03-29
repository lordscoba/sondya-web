import { DeleteAccountBody } from "../components/deleteAccount";
import { Footer, Nav } from "../components/layout";

const DeleteAccount = () => {
  return (
    <div className="overflow-x-scroll">
      <Nav isHome />
      <DeleteAccountBody />
      <Footer />
    </div>
  );
};

export default DeleteAccount;
