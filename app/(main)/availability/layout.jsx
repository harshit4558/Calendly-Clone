import { Suspense } from "react";
import Availability from "./page";

export default function AvailabilityPage({ children }) {
    return(
        <div className="mx-auto">
        <Suspense fallback={<div>Loading Availability ...</div>}>
            {children}
        </Suspense>
        </div>
    )
}