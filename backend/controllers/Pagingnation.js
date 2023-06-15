require("dotenv").config();

module.exports.pagingnation = async (reqPage, reqLimit, Obj) => {
  const page = reqPage || 1;
  const ITEM_PER_PAGE = reqLimit || process.env.ITEMS_PER_PAGE
  const skip = (page - 1) * ITEM_PER_PAGE//6
  const query = {}
  const countPromise = Obj.estimatedDocumentCount(query)
  const itemsPromise = Obj.find(query).sort({ createdAt: -1 });
  itemsPromise.limit(ITEM_PER_PAGE).skip(skip);
  const [count, items] = await Promise.all([countPromise, itemsPromise])
  const pageCount = Math.ceil(count / ITEM_PER_PAGE)
  const pageNum = parseInt(page)
  return (
    {
      pagination: {
        count,
        pageCount,
        pageNum
      },
      items
    }
  )
}