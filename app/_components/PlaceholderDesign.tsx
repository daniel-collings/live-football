import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";

export default function PlaceholderDesign(){
    return(
        <ConstraintLayoutTemplate>
            <div className="space-y-8">

            <div className="grid grid-cols-2 md:grid-cols-4">
                <div className="skeleton w-44 h-32"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 ">
                <div className="skeleton col-span-1 h-16 col-start-4"></div>
            </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="skeleton col-span-full h-12"></div>
                    <div className="skeleton col-span-full h-12"></div>
                    <div className="skeleton col-span-full h-12"></div>
                    <div className="skeleton col-span-full h-12"></div>
                    <div className="skeleton col-span-1 h-16 col-start-4"></div>

                    <div className="skeleton col-span-full h-12"></div>
                    <div className="skeleton col-span-full h-12"></div>
                    <div className="skeleton col-span-full h-12"></div>
                    <div className="skeleton col-span-full h-12"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4">
                <div className="skeleton col-span-full h-96"></div>
            </div>
            </div>
        </ConstraintLayoutTemplate>
    )
}