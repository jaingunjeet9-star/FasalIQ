import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { AppProvider } from '@/context/AppContext';
import { AppShell } from '@/components/layout/AppShell';

import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import Advisor from '@/pages/Advisor';
import CropScanner from '@/pages/CropScanner';
import FarmAnalysis from '@/pages/FarmAnalysis';
import CropComparison from '@/pages/CropComparison';
import OrganicAdvisor from '@/pages/OrganicAdvisor';
import Schemes from '@/pages/Schemes';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <AppShell>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/advisor" component={Advisor} />
          <Route path="/crop-scanner" component={CropScanner} />
          <Route path="/farm-analysis" component={FarmAnalysis} />
          <Route path="/crop-comparison" component={CropComparison} />
          <Route path="/organic-advisor" component={OrganicAdvisor} />
          <Route path="/schemes" component={Schemes} />
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    </AppShell>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
