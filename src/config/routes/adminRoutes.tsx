import { AdminRoute } from "@/components/AdminRoute";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";
import AnalyticsPage from "@/pages/admin/AnalyticsPage";
import CampaignsManagementPage from "@/pages/admin/CampaignsManagementPage";
import CreateAdminPage from "@/pages/admin/CreateAdminPage";
import DonorList from "@/pages/admin/DonorList";
import DonorProfilingPage from "@/pages/admin/DonorProfilingPage";
import EngagementAnalysisPage from "@/pages/admin/EngagementAnalysisPage";
import { Routes, Route, Navigate } from "react-router-dom";

export const adminRoutes = [
  {
    path: "/create-admin",
    element: <CreateAdminPage />
  },
  {
    path: "/admin/*",
    element: (
      <AdminRoute>
        <AdminLayout>
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="campaigns" element={<CampaignsManagementPage />} />
            <Route path="donors" element={<DonorList />} />
            <Route path="donor-profiling" element={<DonorProfilingPage />} />
            <Route path="engagement" element={<EngagementAnalysisPage />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </AdminLayout>
      </AdminRoute>
    )
  }
];