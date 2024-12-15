import { expenditureModel } from '../models/expenditureModel';

export const expenditureService = {
  async getAll() {
    return {
      message: 'Get all expenditure',
    };
  },

  async create(expenditure) {
    const rs = await expenditureModel.createExpenditure(expenditure);
    return rs;
  },
  async update(postId, data) {
    const rs = await expenditureModel.update(postId, data);
    return rs;
  },
};
