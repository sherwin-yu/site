import { VercelRequest, VercelResponse } from '@vercel/node';
import handler from './send-email';

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

const nodemailer = require('nodemailer');

// Mock environment variables
const originalEnv = process.env;

describe('/api/send-email', () => {
  let mockRequest: Partial<VercelRequest>;
  let mockResponse: Partial<VercelResponse>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;
  let mockSendMail: jest.Mock;

  beforeEach(() => {
    // Reset environment variables
    process.env = {
      ...originalEnv,
      EMAIL_USER: 'test@gmail.com',
      EMAIL_PASS: 'testpassword123',
    };

    mockJson = jest.fn();
    mockStatus = jest.fn(() => ({ json: mockJson }));
    mockSendMail = jest.fn();

    mockRequest = {
      method: 'POST',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      },
    };

    mockResponse = {
      status: mockStatus,
      json: mockJson,
    };

    // Reset nodemailer mock
    nodemailer.createTransport.mockReturnValue({
      sendMail: mockSendMail,
    });
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  test('returns 405 for non-POST requests', async () => {
    mockRequest.method = 'GET';

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(mockStatus).toHaveBeenCalledWith(405);
    expect(mockJson).toHaveBeenCalledWith({ message: 'Method not allowed' });
  });

  test('returns 400 when required fields are missing', async () => {
    mockRequest.body = {
      name: 'John Doe',
      // missing email, subject, message
    };

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({ message: 'All fields are required' });
  });

  test('sends email successfully with correct data', async () => {
    mockSendMail.mockResolvedValue(true);

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: 'gmail',
      auth: {
        user: 'test@gmail.com',
        pass: 'testpassword123',
      },
    });

    expect(mockSendMail).toHaveBeenCalledWith({
      from: 'test@gmail.com',
      to: 'test@gmail.com',
      subject: 'Portfolio Contact: Test Subject',
      html: expect.stringContaining('John Doe'),
      replyTo: 'john@example.com',
    });

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({ message: 'Email sent successfully!' });
  });

  test('handles email sending errors', async () => {
    mockSendMail.mockRejectedValue(new Error('SMTP Error'));

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({ message: 'Failed to send email' });
  });

  test('formats HTML email correctly', async () => {
    mockSendMail.mockResolvedValue(true);
    mockRequest.body.message = 'Line 1\nLine 2\nLine 3';

    await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

    const emailOptions = mockSendMail.mock.calls[0][0];
    expect(emailOptions.html).toContain('<strong>Name:</strong> John Doe');
    expect(emailOptions.html).toContain('<strong>Email:</strong> john@example.com');
    expect(emailOptions.html).toContain('<strong>Subject:</strong> Test Subject');
    expect(emailOptions.html).toContain('Line 1<br>Line 2<br>Line 3');
  });

  test('validates all required fields individually', async () => {
    const requiredFields = ['name', 'email', 'subject', 'message'];

    for (const field of requiredFields) {
      const incompleteBody = { ...mockRequest.body };
      delete incompleteBody[field];

      mockRequest.body = incompleteBody;

      await handler(mockRequest as VercelRequest, mockResponse as VercelResponse);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ message: 'All fields are required' });

      jest.clearAllMocks();
    }
  });
});