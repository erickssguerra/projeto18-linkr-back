import { hashsRepository } from "../repositories/hashs.repository.js";

export async function getHashtags(req, res) {
  try {
    const hashtagsArray = await hashsRepository.getHashtags();

    hashtagsArray.forEach((hashtagInfo) => {
        const hashtagName = hashtagInfo.name.split('#');
        hashtagInfo.name = hashtagName[1];
    })

    return res.send(hashtagsArray);
  } catch (err) {
    return res.status(500).send(err);
  }
}
