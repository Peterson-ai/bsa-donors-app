import { AdminRoute } from "@/components/AdminRoute";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import DonorList from "@/pages/admin/DonorList";
import DonorProfilingPage from "@/pages/admin/DonorProfilingPage";
import EngagementAnalysisPage from "@/pages/admin/EngagementAnalysisPage";
import CampaignsManagementPage from "@/pages/admin/CampaignsManagementPage";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";
import CreateAdminPage from "@/pages/admin/CreateAdminPage";

export const adminRoutes = [
  {
    path: "/admin/create",
    element: <CreateAdminPage />
  },
  {
    path: "/admin/",
    element: (
      <AdminRoute>
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </AdminRoute>
    )
  },
  {
    path: "/admin/donors",
    element: (
      <AdminRoute>
        <AdminLayout>
          <DonorList />
        </AdminLayout>
      </AdminRoute>
    )
  },
  {
    path: "/admin/campaigns",
    element: (
      <AdminRoute>
        <AdminLayout>
          <CampaignsManagementPage />
        </AdminLayout>
      </AdminRoute>
    )
  },
  {
    path: "/admin/donor-profiling",
    element: (
      <AdminRoute>
        <AdminLayout>
          <DonorProfilingPage />
        </AdminLayout>
      </AdminRoute>
    )
  },
  {
    path: "/admin/analytics",
    element: (
      <AdminRoute>
        <AdminLayout>
          <EngagementAnalysisPage />
        </AdminLayout>
      </AdminRoute>
    )
  },
  {
    path: "/admin/settings",
    element: (
      <AdminRoute>
        <AdminLayout>
          <AdminSettingsPage />
        </AdminLayout>
      </AdminRoute>
    )
  }
];