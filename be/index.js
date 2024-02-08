const express = require("express");
const morgan = require("morgan");
const formidable = require("express-formidable");
const cors = require("cors");

const review = require("./routes/reviews/reviews");
const volunteer = require("./routes/volunteers/volunteers");
const campaign = require("./routes/campaigns/campaigns");
const coordinator = require("./routes/coordinators/coordinators");
const statistics = require("./routes/statistics/statistics");
const user = require("./routes/user");
const app = express();
const router = express.Router();

// using morgan for logs
router.use(morgan("combined"));
router.use(express.json());
router.use(express.urlencoded());
router.use(cors({ origin: "*" }));

router.use("/reviews", review);
router.use("/volunteers", volunteer);
router.use("/campaigns", campaign);
router.use("/coordinators", coordinator);
router.use("/statistics", statistics);
// router.use("/users", user);

router.get("/", (req, res) => {
  res.send("Hello I am working my friend Supabase <3");
});

app.use("/", router);
app.use(
  "/users",
  morgan("combined"),
  cors({ origin: "*" }),
  express.raw({ type: "application/json" }),
  user
);

app.listen(3000, () => {
  console.log(`> Ready on http://localhost:3000`);
});
