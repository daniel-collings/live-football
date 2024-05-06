import Link from "next/link";
import PlaceholderDesign from "@/app/_components/PlaceholderDesign";
import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";

export default function Page(){
    return(
        <ConstraintLayoutTemplate>
            <div className="grid gap-x-4">
                <Link href="/matches/fixtures">Fixtures</Link>
                <Link href="/matches/live">Live Games</Link>
                <Link href="/matches/results">Results</Link>
            </div>

            <PlaceholderDesign/>
        </ConstraintLayoutTemplate>
    )
}