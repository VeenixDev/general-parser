import { Router, Request } from "express";
import userModel from "../models/userModel";
import User from "../entities/user";
import * as jose from "jose";

const router = Router({ mergeParams: true });

router.get("/", (req, res) => {
  // parent router has this parameter
  // @ts-ignore
  const name = req.params.user;

  const result = userModel.findOne({ name }).exec();

  if (result) {
    res.status(200).json(result);
  } else {
    res.sendStatus(404);
  }
});

router.post("/login", (req, res) => {
  // @ts-ignore
  const name = req.params.user;
  const password = req.body.password;

  if (password === undefined) {
    res.sendStatus(400);
    return;
  }

  userModel
    .findOne({ name })
    .exec()
    .then((usr) => {
      if (!usr) {
        res.sendStatus(404);
        return;
      }

      const user = new User(usr.name, usr.password, usr._id);

      if (user.checkPassword(password)) {
        jose
          .generateSecret("A128CBC-HS256")
          .then((secret) => {
            new jose.EncryptJWT({ "urn:example:claim": true })
              .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
              .setExpirationTime("1h")
              .encrypt(secret)
              .then((jwt) => {
                res
                  .status(200)
                  .cookie("jwt", jwt, { domain: process.env.SERVER_HOST })
                  .send({ jwt: jwt });
              })
              .catch((err) => {
                console.error("Error while encrypting jwt", err);
                res.sendStatus(500);
              });
          })
          .catch((err) => {
            console.error("Error while generating secret", err);
            res.sendStatus(500);
          });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  // @ts-ignore
  const name = req.params.user;
  const password = req.body.password;

  if (name === undefined || password === undefined) {
    res.sendStatus(400);
    return;
  }

  const newUser = new userModel({ name, password });

  newUser
    .save()
    .then((doc) => {
      if (doc) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

export default router;
