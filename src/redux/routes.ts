const BASE = process.env.NEXT_PUBLIC_SERVER_API;

export const API_ROUTES = {
  // Authentication
  auth: {
    // user
    register: BASE + "/register", // POST
    login: BASE + "/login", // POST
    forgotPassword: BASE + "/forgot-password", // POST
    verifyEmail: BASE + "/verify-email/:email", // POST
    resetPassword: BASE + "/reset-password/:email", // POST
  },

  //Admin
  adminUsers: {
    create: BASE + "/admin/user/create", // POST
    update: BASE + "/admin/user/update/", // PUT :id
    delete: BASE + "/admin/user/delete/", // DELETE :id
    getByID: BASE + "/admin/user/get/", // GET :id
    getAll: BASE + "/admin/users", // GET
  },
};
