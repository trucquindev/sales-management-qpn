import { ObjectId } from 'mongodb';
import { GET_DB } from '~/config/mongodb';
import { pagingSkipValue } from '~/utils/algorithms';
const EXPENDITURE_COLLECTION_NAME = 'expenditure';

const getAllHistories = async (userId, page, itemsPerPag) => {
  try {
    const queryCondition = [
      // { _destroy: false },
      {
        $or: [
          {
            userId: new ObjectId(userId),
          },
        ],
      },
    ];
    const query = await GET_DB()
      .collection(EXPENDITURE_COLLECTION_NAME)
      .aggregate(
        [
          {
            $match: { $and: queryCondition },
          },
          // sort title cuar board theo A-Z - theo chuan bang ma ASCII
          {
            $sort: { title: 1 },
          },
          // $facet xu ly nhieu luon trong 1 query
          {
            // https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/facet/
            $facet: {
              //luong thu nhat: query boards
              queryHistories: [
                {
                  $skip: pagingSkipValue(page, itemsPerPag), // boa di page truoc do da select
                },
                {
                  $limit: itemsPerPag, // gio han so luong toi da so luong ban ghi tra ve trong 1 page
                },
              ],
              // luong thu hai : query dem tong so luong bang ghi boards trong db va tra ve vao bien countHis ma userId nay co the select
              queryTotalBoards: [
                {
                  $count: 'countedHistories',
                },
              ],
            },
          },
        ],
        // fix viec tra ve B hoa truoc a thuong
        //https://www.mongodb.com/docs/v6.0/reference/collation/#std-label-collation-document-fields
        {
          collation: { locale: 'en' },
        }
      )
      .toArray();
    const res = query[0];
    return {
      histories: res.queryHistories || [],
      totalHistories: res.queryTotalBoards[0]?.countedHistories || 0,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const getAllExpenditure = async (userId, page, itemsPerPag) => {};

const createExpenditure = async (data) => {
  try {
    const expenditure = await GET_DB()
      .collection(EXPENDITURE_COLLECTION_NAME)
      .insertOne({ ...data, userId: new ObjectId(data.userId) });

    return expenditure;
  } catch (error) {
    throw new Error(error);
  }
};
const getPostById = async (postId) => {
  try {
    return await GET_DB()
      .collection(EXPENDITURE_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(postId) });
  } catch (error) {
    throw new Error(error);
  }
};
const update = async (postId, updateData) => {
  try {
    // loc cho field tap nham khi update
    // Object.keys(updateData).forEach((fieldName) => {
    //   if (INVALID_UPDATE_FIELDS.includes(fieldName))
    //     delete updateData[fieldName];
    // });
    const result = await GET_DB()
      .collection(EXPENDITURE_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(postId) },
        { $set: updateData },
        { returnDocument: 'after' }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export const expenditureModel = {
  getAllHistories,
  getAllExpenditure,
  createExpenditure,
  EXPENDITURE_COLLECTION_NAME,
  getPostById,
  update,
};
