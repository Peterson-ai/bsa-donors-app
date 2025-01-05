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
          <AdminDashboard />
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
  },
  {
    path: "/admin/analytics",
    element: (
      <AdminRoute>
        <AdminLayout>
          <AnalyticsPage />
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
    path: "/admin/engagement",
    element: (
      <AdminRoute>
        <AdminLayout>
          <EngagementAnalysisPage />
        </AdminLayout>
      </AdminRoute>
    )
  }
];