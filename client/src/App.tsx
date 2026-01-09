import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
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
import { useUserProfile, UserProfile } from "./hooks/useUserProfile";

function AppContent() {
  const { profile, isLoading, needsOnboarding, saveProfile } = useUserProfile();

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    saveProfile(newProfile);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#00d4aa]/20 border-t-[#00d4aa] animate-spin mx-auto mb-4" />
          <p className="text-white/60">Se încarcă...</p>
        </div>
      </div>
    );
  }

  // Show onboarding if not completed
  if (needsOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Main app router
  return (
    <Switch>
      <Route path={"/"} component={Home} />
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
