import jwt from "jsonwebtoken";
import usersRepositories from "../repositories/users.repositories.js";
import getMetaData from "metadata-scraper";

export async function postSignIn(req, res) {
  const { id, picture_url } = res.locals.user;

  try {
    const userData = { userId: id };
    const secretkey = process.env.JWT_SECRET;
    const settings = { expiresIn: 60 * 60 * 24 * 30 };

    const token = jwt.sign(userData, secretkey, settings);

    const user = {
      token,
      picture_url,
      userId: id,
    };

    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postSignUp(req, res) {
  const { name, picture_url, email, password } = res.locals.signUpValidated;
  usersRepositories.signUpUser(name, email, password, picture_url);
  res.sendStatus(201);
}

export async function getPosts(req, res) {
  const user_id = res.locals.userId;

  try {
    const user = await usersRepositories.selectUserInfosById(user_id);
    const postsData = await usersRepositories.getPostsByUserId(user_id);
    const formattedData = await Promise.all(
      postsData.map(async (post) => {
        const metadata = await getMetaData(post.url);

        return {
          ...post,
          metadata: {
            icon: metadata.icon,
            title: metadata.title,
            description: metadata.description,
          },
        };
      })
    );

    const data = {
      user: user[0],
      formattedData,
    };

    return res.status(200).send(data);
  } catch (e) {
    return res.sendStatus(500);
  }
}

export async function getUsers(req, res) {
  const { string } = res.locals.string;
  const { userId } = req.user;

  try {
    const users = await usersRepositories.selectUsersByString(string, userId);

    return res.status(200).send(users);
  } catch (e) {
    return res.status(500).send(e);
  }
}
