require("dotenv").config();

<<<<<<< HEAD
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
=======
module.exports.pagingnation = async (Obj, name, reqQuery) => {
  const limitDefault = process.env.ITEMS_PER_PAGE;
  const { limit = limitDefault, page = 1, q, ...rest } = reqQuery;
  const querry = q;
  let query;
  const ITEM_PER_PAGE = limit;
  const skip = (page - 1) * ITEM_PER_PAGE; //6
  if (querry) {
   name&&(query = { [name]: { $regex: `${querry}`, $options: "i" } });
  } else {
    query = {};
  }
  if(Object.keys(rest).length !== 0){
    query = await Object.assign(query, rest);
    console.log(query);
  }
>>>>>>> 8bdb7bd0c4794df439b0f51f30c15b84d618ca94
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
