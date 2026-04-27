import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AudioProvider } from '../context/AudioContext';
import { LanguageProvider } from '../context/LanguageContext';
import App from '../App';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AudioProvider>
        <LanguageProvider>
          {component}
        </LanguageProvider>
      </AudioProvider>
    </BrowserRouter>
  );
};

describe('App', () => {
  it('renders without crashing', () => {
    renderWithProviders(<App />);
  });

  it('renders ECLABS logo', () => {
    renderWithProviders(<App />);
    const logo = screen.getByText('ECLABS.');
    expect(logo).toBeInTheDocument();
  });
});
