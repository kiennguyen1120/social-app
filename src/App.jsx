import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PageLayout from "./Layouts/PageLayout";
import { Toaster } from "./components/ui/toaster";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {
  const [authUser] = useAuthState(auth);

  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<PageLayout />}>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route path="/:username" element={<ProfilePage />} />
        </Route>
        <Route
          path="/auth"
          element={!authUser ? <AuthPage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
