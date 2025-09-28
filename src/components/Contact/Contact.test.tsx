import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';

// Mock fetch
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('Contact Component', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  test('renders contact form with all fields', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('updates form fields when user types', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
  });

  test('submits form with correct data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Email sent successfully!' }),
    } as Response);

    render(<Contact />);

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await userEvent.type(screen.getByLabelText(/message/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await userEvent.click(submitButton);

    expect(mockFetch).toHaveBeenCalledWith('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message'
      }),
    });
  });

  test('shows success message on successful submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Email sent successfully!' }),
    } as Response);

    render(<Contact />);

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await userEvent.type(screen.getByLabelText(/message/i), 'Test message');

    await userEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });
  });

  test('shows error message on failed submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    } as Response);

    render(<Contact />);

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await userEvent.type(screen.getByLabelText(/message/i), 'Test message');

    await userEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
    });
  });

  test('clears form after successful submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Email sent successfully!' }),
    } as Response);

    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await userEvent.type(screen.getByLabelText(/message/i), 'Test message');

    await userEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
    });
  });

  test('disables submit button while submitting', async () => {
    // Mock a delayed response
    mockFetch.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: async () => ({ message: 'Email sent successfully!' }),
      } as Response), 100))
    );

    render(<Contact />);

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await userEvent.type(screen.getByLabelText(/message/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await userEvent.click(submitButton);

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
  });
});