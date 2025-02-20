import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders Open Comments button', () => {
    render(<App />);
    expect(screen.getByText('Open Comments')).toBeInTheDocument();
  });

  it('opens modal when button is clicked', () => {
    render(<App />);
    const openButton = screen.getByText('Open Comments');
    fireEvent.click(openButton);
    expect(screen.getByText('Send Comments')).toBeInTheDocument();
  });

  it('closes modal when Cancel is clicked', () => {
    render(<App />);
    const openButton = screen.getByText('Open Comments');
    fireEvent.click(openButton);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(screen.queryByText('Send Comments')).not.toBeInTheDocument();
  });
}); 