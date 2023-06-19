require("dotenv").config();

module.exports.pagingnation = async (
  reqPage,
  reqLimit,
  Obj,
  reqQuerry,
  name
) => {
  const page = reqPage || 1;
  const querry = reqQuerry;
  let query;
  const ITEM_PER_PAGE = reqLimit || process.env.ITEMS_PER_PAGE;
  const skip = (page - 1) * ITEM_PER_PAGE; //6
  if (querry) {
    query = { [name]: { $regex: `${querry}`, $options: "i" } };
  } else {
    query = {};
  }
  const countPromise = Obj.countDocuments(query);
  const itemsPromise = Obj.find(query).sort({ createdAt: -1 });
  itemsPromise.limit(ITEM_PER_PAGE).skip(skip);
  let [count, items] = await Promise.all([countPromise, itemsPromise]);
  const pageCount = Math.ceil(count / ITEM_PER_PAGE);
  const pageNum = parseInt(page);
  return {
    pagination: {
      count,
      pageCount,
      pageNum,
    },
    items,
  };
};
