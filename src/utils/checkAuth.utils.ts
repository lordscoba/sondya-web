import { redirect } from "react-router-dom";
import { LOGIN_SESSION } from "../extraStorage/storageStore";
import { logoutAction } from "../redux/actions/auth.actions";
import { checkExpiredToken } from "./checkexptoken.utils";

export const homeCheck = async () => {
  return null;
};
export const authCheck = async () => {
  const storedData = localStorage.getItem(LOGIN_SESSION);
  if (storedData === null || storedData === "") {
    return null;
  } else if (storedData) {
    const parsedData = JSON.parse(storedData);
    if (parsedData?.serverResponse?.data?.type === "user") {
      return redirect("/dashboard");
    } else if (parsedData?.serverResponse?.data?.type === "admin") {
      return redirect("/admin/dashboard");
    } else {
      logoutAction();
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(LOGIN_SESSION);
      }
      return redirect("/login");
    }
  } else if (checkExpiredToken()) {
    logoutAction();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(LOGIN_SESSION);
    }
    return redirect("/login");
  }
  return null;
};
export const dashboardCheck = async () => {
  const storedData = localStorage.getItem(LOGIN_SESSION);
  if (storedData === null || storedData === "") {
    return redirect("/login");
  } else if (storedData) {
    const parsedData = JSON.parse(storedData);
    if (parsedData?.serverResponse?.data?.type !== "user") {
      logoutAction();
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(LOGIN_SESSION);
      }
      return redirect("/login");
    }
    if (checkExpiredToken()) {
      logoutAction();
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(LOGIN_SESSION);
      }
      return redirect("/login");
    }
  }
  return null;
};
export const sellerDashboardCheck = async () => {
  const storedData = localStorage.getItem(LOGIN_SESSION);
  if (storedData === null || storedData === "") {
    return redirect("/login");
  } else if (storedData) {
    const parsedData = JSON.parse(storedData);

    // check if the person logged in us a user
    if (parsedData?.serverResponse?.data?.type !== "user") {
      logoutAction();
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(LOGIN_SESSION);
      }
      return redirect("/login");
    }

    // check if the token has expired
    if (checkExpiredToken()) {
      logoutAction();
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(LOGIN_SESSION);
      }
      return redirect("/login");
    }
    if (!parsedData?.serverResponse?.data?.kyc_completed) {
      return redirect("/kyc/verify/email");
    }
    return null;
  }
  return null;
};
export const adminDashboardCheck = async () => {
  const storedData = localStorage.getItem(LOGIN_SESSION);
  if (storedData === null || storedData === "") {
    return redirect("/login");
  } else if (storedData) {
    const parsedData = JSON.parse(storedData);
    if (parsedData?.serverResponse?.data?.type !== "admin") {
      logoutAction();
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(LOGIN_SESSION);
      }
      return redirect("/login");
    }
    if (checkExpiredToken()) {
      logoutAction();
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(LOGIN_SESSION);
      }
      return redirect("/login");
    }
  }
  return null;
};
