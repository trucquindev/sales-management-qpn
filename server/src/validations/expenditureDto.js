import Joi from 'joi';

export const upsertExpenditureDto = async (req, res, next) => {
  const scheme = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().required(),
    image: Joi.string().optional(),
    money: Joi.number().required(),
    date: Joi.date().required(),
    time: Joi.date().required(),
    note: Joi.string().min(0).trim().strict().optional(),
    address: Joi.string().min(0).trim().strict().optional(),
    typeOfExpenditure: Joi.boolean().required(),
  });

  try {
    await scheme.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(res.status(400).json(error));
  }
};