import './globals.css';
import { HealthProvider } from '@/src/context/HealthContext';

export const metadata = {
  title: 'Health Tracker AI — Medical Records Workflow & Predictive Intelligence',
  description: 'AI-integrated health records platform storing, extracting, and forecasting disease risks using clinical LLMs and vector embeddings.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <HealthProvider>
          {children}
        </HealthProvider>
      </body>
    </html>
  );
}
