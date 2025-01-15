import { Suspense } from "react";

export default function NotFound() {
    return (
        <Suspense>
        <div className=" text0-4xl font-extrabold w-screen pt-80 grid justify-center">
            <h1>
                404 - Page Not Found
            </h1>
        </div>
        </Suspense>
    )
}