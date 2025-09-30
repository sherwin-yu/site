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
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
  });

  test('submits form with correct data', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Email sent successfully!' }),
    } as Response);

    render(<Contact />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

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
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Email sent successfully!' }),
    } as Response);

    render(<Contact />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    });
  });

  test('shows error message on failed submission', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: false,
    } as Response);

    render(<Contact />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
    });
  });

  test('clears form after successful submission', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Email sent successfully!' }),
    } as Response);

    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(nameInput).toHaveValue('');

    });
    
    expect(emailInput).toHaveValue('');
  });

  test('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    // Mock a delayed response
    mockFetch.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: async () => ({ message: 'Email sent successfully!' }),
      } as Response), 100))
    );

    render(<Contact />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
  });
});