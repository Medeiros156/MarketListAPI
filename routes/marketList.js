import express from 'express';
import { getImage } from '../controllers/image.js';
import { getList, setList, removeFromList } from '../controllers/marketList.js';




const router = express.Router();

router.get('/list', getList);

router.get('/image', getImage);

router.post('/list', setList);

router.get('/:id', );

router.delete('/del', removeFromList);

router.patch('/:id', );

export default router;