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

function Router() {
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
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
