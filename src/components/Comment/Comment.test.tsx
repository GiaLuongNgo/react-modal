import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Comment from './Comment';

describe('Comment Component', () => {
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnToggleSelect = jest.fn();

  const defaultProps = {
    id: 1,
    image: 'test-image.jpg',
    imageUrl: 'https://test-image.jpg',
    type: 'General',
    comment: 'Test comment',
    selected: false,
    onDelete: mockOnDelete,
    onEdit: mockOnEdit,
    onToggleSelect: mockOnToggleSelect
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders comment with correct content', () => {
    render(<Comment {...defaultProps} />);
    expect(screen.getByText('test-image.jpg')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Test comment')).toBeInTheDocument();
  });

  it('handles checkbox selection', async () => {
    render(<Comment {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(mockOnToggleSelect).toHaveBeenCalledWith(1);
  });

  it('handles edit mode', async () => {
    render(<Comment {...defaultProps} />);
    await userEvent.click(screen.getByLabelText('Edit'));
    
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, ' updated');
    await userEvent.click(screen.getByLabelText('Save'));
    
    expect(mockOnEdit).toHaveBeenCalledWith(1, 'Test comment updated');
  });

  it('handles delete action', async () => {
    render(<Comment {...defaultProps} />);
    await userEvent.click(screen.getByLabelText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('cancels edit mode', async () => {
    render(<Comment {...defaultProps} />);
    await userEvent.click(screen.getByLabelText('Edit'));
    await userEvent.click(screen.getByLabelText('Cancel'));
    expect(screen.getByText('Test comment')).toBeInTheDocument();
  });
}); 