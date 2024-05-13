import ActivityLogger from "@/app/components/ActivityLogging";
import LogActivity from "@/app/components/LogActivity";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

function ActivityLog() {
  return (
    <>
      <LogActivity/>
      <ActivityLogger/>
    </>
  );
}

export default ActivityLog;