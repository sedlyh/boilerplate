import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {AuthProvider} from "@/context/AuthContext";
import {SiteHeader} from "@/components/site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <SidebarProvider  defaultOpen={true}>
                <AppSidebar variant="inset"  />
                <SidebarInset>
                    <main>
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </AuthProvider>

    )
}