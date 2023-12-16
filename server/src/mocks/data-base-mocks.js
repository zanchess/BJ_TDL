import { v4 as uuidv4 } from 'uuid';

export const userMock = {
    _id: uuidv4(),
    u_name: 'admin',
    u_password: '123',
    u_role: 'admin'
};

export const taskItem = {
    _id: uuidv4(),
    t_name: 'Name1',
    t_email: 'test@test.com',
    t_status: 'In progress'
};

export const tasksMock = [
    {
        _id: uuidv4(),
        t_name: 'Name1',
        t_email: 'test@test.com',
        t_status: 'In progress'
    },
    {
        _id: uuidv4(),
        t_name: 'Name2',
        t_email: 'test@test.com',
        t_status: 'In progress'
    },
    {
        _id: uuidv4(),
        t_name: 'Name3',
        t_email: 'test@test.com',
        t_status: 'In progress'
    },
    {
        _id: uuidv4(),
        t_name: 'Name4',
        t_email: 'test@test.com',
        t_status: 'In progress'
    },
    {
        _id: uuidv4(),
        t_name: 'Name5',
        t_email: 'test@test.com',
        t_status: 'In progress'
    },
    {
        _id: uuidv4(),
        t_name: 'Name6',
        t_email: 'test@test.com',
        t_status: 'In progress'
    },
    {
        _id: uuidv4(),
        t_name: 'Name7',
        t_email: 'test@test.com',
        t_status: 'In progress'
    },
    {
        _id: uuidv4(),
        t_name: 'Name8',
        t_email: 'test@test.com',
        t_status: 'In progress'
    },
    {
        _id: uuidv4(),
        t_name: 'Name9',
        t_email: 'test@test.com',
        t_status: 'In progress'
    }
];
