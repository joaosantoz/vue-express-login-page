import {
  describe, it, vi, expect,
} from 'vitest';
import { createUser } from '../controllers/registrationController.js';

describe('Registration Controller', () => {
  it('should return a status code of 201 and a success message', () => {
    const mockReq = {};
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    createUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Usuário cadastrado com sucesso!' });
  });
});
