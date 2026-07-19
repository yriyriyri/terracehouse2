import ContentPage from "@/components/ContentPage";
import ShutdownPage from "@/components/ShutdownPage";

const SHOW_SHUTDOWN_PAGE = true;

export default function Page() {
  return SHOW_SHUTDOWN_PAGE ? <ShutdownPage /> : <ContentPage />;
}
