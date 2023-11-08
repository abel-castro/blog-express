import * as controllers from '../../controllers';
import { mockNextFunction, mockRequestInputs, mockResponse } from '../utils.test';


jest.mock('../../postsService', () => ({
    getAllPosts: jest.fn().mockReturnValue([
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
        { id: 3, title: 'Post 3' }
    ]),
}));

describe('getAll controller tests', (): void => {
    test('returns 200 status', async (): Promise<void> => {
        const req = mockRequestInputs({});
        const res = mockResponse();
        const next = mockNextFunction(res);

        await controllers.getAll(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
    })
})