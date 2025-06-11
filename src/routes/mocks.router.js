import { Router } from 'express';
import { generateMockUsers } from '../utils/mockGenerator.js';
import PetModel from '../dao/models/Pet.js';
import UserModel from '../dao/models/User.js';

const router = Router();

// GET /api/mocks/mockingusers
router.get('/mockingusers', async (req, res) => {
  try {
    const users = await generateMockUsers(50);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/mockingpets', (req, res) => {
    const mockPets = [
      { name: 'Firulais', specie: 'dog', age: 3 },
      { name: 'Michi', specie: 'cat', age: 2 },
      { name: 'Max', specie: 'rabbit', age: 1 },
      { name: 'Coco', specie: 'parrot', age: 4 }
    ];
  
    res.json(mockPets);
  });


router.post('/generateData', async (req, res) => {
    const { users = 0, pets = 0 } = req.body;
  
    try {
      const newUsers = await generateMockUsers(users);
      await UserModel.insertMany(newUsers);
  
      const newPets = Array.from({ length: pets }, (_, i) => ({
        name: `Pet${i + 1}`,
        specie: 'dog',
        age: Math.floor(Math.random() * 10) + 1,
      }));
  
      await PetModel.insertMany(newPets);
  
      res.json({
        message: 'Datos insertados correctamente',
        usersInserted: users,
        petsInserted: pets,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


export default router;