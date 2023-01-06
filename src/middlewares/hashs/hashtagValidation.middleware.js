import hashsRepositories from "../../repositories/hashs.repositories.js";

export async function hashtagValidation(req, res, next) {
  const { hashtag } = res.locals.hashtag;

  const hashName = "#" + hashtag;

  const hash = await hashsRepositories.getHashByName(hashName);

  if (hash.length === 0) {
    return res.sendStatus(404);
  }

  const hash_name = hash[0].name;

  res.locals.hashName = hash_name;
  try {
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  next();
}
