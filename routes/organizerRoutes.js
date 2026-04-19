import express from "express";
import organizerController from "../controllers/organizerController.js";
import { forAuthUsers } from "../middlewares/authMiddelware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

const {
  requestOrganizer,
  getAllRequests,
  approveRequest,
  rejectRequest,
  getOrganizerDashboard,
} = organizerController;

// USER → request
router.post("/request", forAuthUsers, requestOrganizer);

// ADMIN → manage requests
router.get("/requests", forAuthUsers, authorizeRoles("admin"), getAllRequests);
router.put("/approve/:id", forAuthUsers, authorizeRoles("admin"), approveRequest);
router.put("/reject/:id", forAuthUsers, authorizeRoles("admin"), rejectRequest);

// ORGANIZER → dashboard
router.get("/dashboard", forAuthUsers, authorizeRoles("organizer"), getOrganizerDashboard);

export default router;















// import express from "express";
// import organizerController from "../controllers/organizerController.js";
// import { forAuthUsers, forAdmin, forOrganizer } from "../middlewares/authMiddelware.js";
// import authorizeRoles from "../middlewares/roleMiddleware.js";

// const router = express.Router();

// const {
//   getOrganizerDashboard,
//   requestOrganizer,
//   getAllRequests,
//   approveRequest,
//   rejectRequest
// } = organizerController;

// // ================= USER =================

// // Request to become organizer
// router.post("/request", forAuthUsers, requestOrganizer);


// // ================= ADMIN =================

// // Get all organizer requests
// router.get("/requests", forAdmin, authorizeRoles("admin"), getAllRequests);

// // Approve request
// router.put("/approve/:id", forAdmin, authorizeRoles("admin"), approveRequest);

// // Reject request
// router.put("/reject/:id", forAdmin, authorizeRoles("admin"), rejectRequest);


// // ================= ORGANIZER =================

// // Organizer Dashboard
// router.get(
//   "/dashboard",
//   forOrganizer,
//   authorizeRoles("organizer"),
//   getOrganizerDashboard
// );

// export default router;










// // import express from "express";
// // import organizerController from "../controllers/organizerController.js";
// // import { forOrganizer } from "../middlewares/authMiddelware.js";
// // import authorizeRoles from "../middlewares/roleMiddleware.js";

// // const router = express.Router();
// // const { getOrganizerDashboard } = organizerController;

// // // Organizer Dashboard
// // router.get("/dashboard", forOrganizer, authorizeRoles("organizer"), getOrganizerDashboard);

// // export default router;