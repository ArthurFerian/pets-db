import { Router } from 'express';
import * as PetController from './../controllers/petsController.js'

const router = Router();

router.get("/", PetController.listarTodos);

router.get("/:id", PetController.buscarPetPorId);

router.post("/", PetController.criar);

router.put("/:id", PetController.atualizar);

router.delete("/:id", PetController.apagar)

export default router;