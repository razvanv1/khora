import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useUserProfile, UserProfile } from "./hooks/useUserProfile";

// Lazy load all pages for better performance
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Pantry = lazy(() => import("./pages/Pantry"));
const Blender = lazy(() => import("./pages/Blender"));
const Recipes = lazy(() => import("./pages/Recipes"));
const FavoriteRecipes = lazy(() => import("./pages/FavoriteRecipes"));
const Hydration = lazy(() => import("./pages/Hydration"));
const Supplements = lazy(() => import("./pages/Supplements"));
const Profile = lazy(() => import("./pages/Profile"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Landing = lazy(() => import("./pages/Landing"));
const Admin = lazy(() => import("./pages/Admin"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));

// Loading spinner component
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
      {/* SEO Headings - always present in DOM */}
      <h1 className="sr-only">Khora - Aplicație Premium de Nutriție Vegană România</h1>
      <h2 className="sr-only">Dezvață ce ai crezut despre nutriția vegană. Învață ce contează cu adevărat.</h2>
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-3 border-[#2dd4bf]/20 border-t-[#2dd4bf] animate-spin mx-auto mb-3" />
        <p className="text-white/50 text-sm">Se încarcă...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const { profile, isLoading, needsOnboarding, saveProfile } = useUserProfile();
  const [location] = useLocation();
  const handleOnboardingComplete = (newProfile: UserProfile) => {
    saveProfile(newProfile);
  };

  // Show loading state
  if (isLoading) {
    return <PageLoader />;
  }

  // If user needs onboarding and is not on landing or onboarding page, show Landing
  if (needsOnboarding) {
    // Allow access to landing, onboarding, and blog pages without onboarding
    if (location === '/onboarding') {
      return (
        <Suspense fallback={<PageLoader />}>
          <Onboarding onComplete={handleOnboardingComplete} />
        </Suspense>
      );
    }
    if (location.startsWith('/blog')) {
      return (
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path={"/blog"} component={Blog} />
            <Route path={"/blog/:slug"} component={BlogArticle} />
            <Route component={Landing} />
          </Switch>
        </Suspense>
      );
    }
    // Allow access to legal pages without onboarding
    if (location === '/terms') return <Suspense fallback={<PageLoader />}><Terms /></Suspense>;
    if (location === '/privacy') return <Suspense fallback={<PageLoader />}><Privacy /></Suspense>;
    if (location === '/cookies') return <Suspense fallback={<PageLoader />}><Cookies /></Suspense>;
    if (location === '/contact') return <Suspense fallback={<PageLoader />}><Contact /></Suspense>;
    if (location === '/faq') return <Suspense fallback={<PageLoader />}><FAQ /></Suspense>;
    // Show Landing page for new users
    return <Suspense fallback={<PageLoader />}><Landing /></Suspense>;
  }

  // Main app router for users who completed onboarding
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/landing"} component={Landing} />
        <Route path={"/pantry"} component={Pantry} />
        <Route path={"/blender"} component={Blender} />
        <Route path={"/recipes"} component={Recipes} />
        <Route path={"/recipes/favorites"} component={FavoriteRecipes} />
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
        <Route path={"/faq"} component={FAQ} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
