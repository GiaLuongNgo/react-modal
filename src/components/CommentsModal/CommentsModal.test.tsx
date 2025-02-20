import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentsModal from './CommentsModal';
import { initialComments } from '../../constants/comments';

describe('CommentsModal Component', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal with initial comments', () => {
    render(<CommentsModal {...defaultProps} />);
    expect(screen.getByText('Send Comments')).toBeInTheDocument();
    expect(screen.getByText('Saved Comments')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(4); // 3 comments + All Users toggle
  });

  it('handles select all toggle', async () => {
    render(<CommentsModal {...defaultProps} />);
    const allUsersToggle = screen.getAllByRole('checkbox')[0];
    await userEvent.click(allUsersToggle);
    
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.slice(1).forEach(checkbox => {
      expect(checkbox).toBeChecked();
    });
  });

  it('handles comment deletion', async () => {
    render(<CommentsModal {...defaultProps} />);
    const deleteButtons = screen.getAllByLabelText('Delete');
    await userEvent.click(deleteButtons[0]);
    expect(screen.getAllByRole('checkbox')).toHaveLength(3); // 2 comments + All Users toggle
  });

  it('handles comment editing', async () => {
    render(<CommentsModal {...defaultProps} />);
    await userEvent.click(screen.getAllByLabelText('Edit')[0]);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, ' updated');
    await userEvent.click(screen.getByLabelText('Save'));
    expect(screen.getByText(`${initialComments[0].comment} updated`)).toBeInTheDocument();
  });
}); 