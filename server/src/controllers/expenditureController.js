import express from 'express';
import { expenditureService } from '../services/expenditureService';
import { upsertExpenditureDto } from '../validations/expenditureDto';

const router = express.Router();

router
  .get('/', async (req, res) => {
    const expenditure = await expenditureService.getAll();
    return res.json({
      data: expenditure,
      status: 200,
    });
  })
  .post('/', upsertExpenditureDto, async (req, res) => {
    const expenditure = req.body;
    const newExpenditure = await expenditureService.create(expenditure);
    return res.json({
      data: newExpenditure,
      status: 201,
    });
  })
  .put('/update/:postId', async (req, res) => {
    const postId = req.params.postId;
    const newExpenditure = await expenditureService.update(postId, req.body);
    return res.json({
      data: newExpenditure,
      status: 201,
    });
  });

export const expenditureController = router;
