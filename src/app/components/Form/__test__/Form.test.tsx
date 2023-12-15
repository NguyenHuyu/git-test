import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import Form from '@/app/components/Form/Form'
import { act } from 'react-dom/test-utils';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
    rest.post('http://localhost:3000/api/login', async (req, res, ctx) => {
        const { email, password }: any = await req.json();

        if (email === 'test@example.com' && password === 'password') {
            return res(ctx.status(200), ctx.json({ status: 200 }));
        } else if (email === 'test@example.com') {
            return res(ctx.status(404), ctx.json({ status: 404 }));
        } else if (password === 'password') {
            return res(ctx.status(405), ctx.json({ status: 405 }));
        } else if (email !== 'test@example.com' && password !== 'password') {
            return res(ctx.status(500), ctx.json({ status: 500 }));
        }
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe('Form Đăng nhập', () => {
    it('Đúng email đúng pass', async () => {
        render(<Form />);

        const emailInput = screen.getByLabelText('email');
        const passwordInput = screen.getByLabelText('password');
        const submitButton = screen.getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            const successMessage = screen.getByLabelText("message")
            expect(successMessage).toBeInTheDocument();
        });
    });
    it('Sai email đúng pass', async () => {
        render(<Form />);

        const emailInput = screen.getByLabelText('email');
        const passwordInput = screen.getByLabelText('password');
        const submitButton = screen.getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'tes557652t@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            const successMessage = screen.getByLabelText("message")
            expect(successMessage).toBeInTheDocument();
        });
    });
    it('Đúng email sai pass', async () => {
        render(<Form />);

        const emailInput = screen.getByLabelText('email');
        const passwordInput = screen.getByLabelText('password');
        const submitButton = screen.getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'pas22sword45' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            const successMessage = screen.getByLabelText("message")
            expect(successMessage).toBeInTheDocument();
        });
    });
    it('Sai email sai pass', async () => {
        render(<Form />);
        const emailInput = screen.getByLabelText('email');
        const passwordInput = screen.getByLabelText('password');
        const submitButton = screen.getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'test33@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'pas22sword' } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            const successMessage = screen.getByLabelText("message")
            expect(successMessage).toBeInTheDocument();
        });
    });




    // Add more test cases for different scenarios (e.g., invalid email, invalid password, etc.)
});