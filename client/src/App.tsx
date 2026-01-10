import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Pantry from "./pages/Pantry";
import Blender from "./pages/Blender";
import Recipes from "./pages/Recipes";
import Hydration from "./pages/Hydration";
import Supplements from "./pages/Supplements";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Onboarding from "./pages/Onboarding";
import Landing from "./pages/Landing";
import Admin from "./pages/Admin";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Contact from "./pages/Contact";
import { useUserProfile, UserProfile } from "./hooks/useUserProfile";

function AppContent() {
  const { profile, isLoading, needsOnboarding, saveProfile } = useUserProfile();
  const [location] = useLocation();
  const handleOnboardingComplete = (newProfile: UserProfile) => {
    saveProfile(newProfile);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#2dd4bf]/20 border-t-[#2dd4bf] animate-spin mx-auto mb-4" />
          <p className="text-white/60">Se încarcă...</p>
        </div>
      </div>
    );
  }

  // If user needs onboarding and is not on landing or onboarding page, show Landing
  if (needsOnboarding) {
    // Allow access to landing, onboarding, and blog pages without onboarding
    if (location === '/onboarding') {
      return <Onboarding onComplete={handleOnboardingComplete} />;
    }
    if (location.startsWith('/blog')) {
      return (
        <Switch>
          <Route path={"/blog"} component={Blog} />
          <Route path={"/blog/:slug"} component={BlogArticle} />
          <Route component={Landing} />
        </Switch>
      );
    }
    // Allow access to legal pages without onboarding
    if (location === '/terms') return <Terms />;
    if (location === '/privacy') return <Privacy />;
    if (location === '/cookies') return <Cookies />;
    if (location === '/contact') return <Contact />;
    // Show Landing page for new users
    return <Landing />;
  }

  // Main app router for users who completed onboarding
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/landing"} component={Landing} />
      <Route path={"/pantry"} component={Pantry} />
      <Route path={"/blender"} component={Blender} />
      <Route path={"/recipes"} component={Recipes} />
      <Route path={"/hydrate"} component={Hydration} />
      <Route path={"/supplements"} component={Supplements} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogArticle} />
      <Route path={"/onboarding"}>
        <Onboarding onComplete={handleOnboardingComplete} />
      </Route>
      <Route path={"/admin"} component={Admin} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/cookies"} component={Cookies} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
