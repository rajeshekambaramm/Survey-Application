import Skeleton from "react-loading-skeleton";

export default function LoadingCard() {

    return (

        <div className="card shadow-sm border-0 mb-4 p-3">

            <Skeleton height={30} width="60%" />

            <Skeleton
                height={20}
                count={2}
                className="mt-2"
            />

            <Skeleton
                height={40}
                className="mt-3"
            />

        </div>

    );

}