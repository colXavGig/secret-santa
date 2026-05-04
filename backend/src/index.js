import express from 'express';
import { UserRegisterSchema } from '../../shared/src';
import z from 'zod';

const app = express()

app.use(express.json())

app.post('/register', (req, resp) => {
	const data = req.body

	const validationRes = UserRegisterSchema.safeParse(data);

	if (!validationRes.success) {
		resp.status(400).json(
			z.treeifyError(validationRes.error)
		)
		return
	}


})
