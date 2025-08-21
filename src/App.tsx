import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Guard from "@/components/Guard";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import TakeQuiz from "./pages/TakeQuiz";
import Result from "./pages/Result";
import Profile from "./pages/Profile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddQuestion from "./pages/admin/AddQuestion";
import Users from "./pages/admin/Users";
import UserProfile from "./pages/admin/UserProfile";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={
                <Guard requireAuth={false}>
                  <Login />
                </Guard>
              } />
              <Route path="/register" element={
                <Guard requireAuth={false}>
                  <Register />
                </Guard>
              } />

              {/* User Routes */}
              <Route path="/" element={
                <Guard requireRole="user">
                  <UserDashboard />
                </Guard>
              } />
              <Route path="/take-quiz" element={
                <Guard requireRole="user">
                  <TakeQuiz />
                </Guard>
              } />
              <Route path="/result" element={
                <Guard requireRole="user">
                  <Result />
                </Guard>
              } />
              <Route path="/profile" element={
                <Guard requireRole="user">
                  <Profile />
                </Guard>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <Guard requireRole="admin">
                  <AdminDashboard />
                </Guard>
              } />
              <Route path="/admin/add-question" element={
                <Guard requireRole="admin">
                  <AddQuestion />
                </Guard>
              } />
              <Route path="/admin/users" element={
                <Guard requireRole="admin">
                  <Users />
                </Guard>
              } />
              <Route path="/admin/users/:userId" element={
                <Guard requireRole="admin">
                  <UserProfile />
                </Guard>
              } />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
