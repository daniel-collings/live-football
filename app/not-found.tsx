import Link from "next/link";

export default function NotFound(){
    return(
        <div className="flex flex-col justify-center items-center align-middle h-96 space-y-4">
            <h1 className="font-bold text-xl">Oophf so close!</h1>
            <h2 className="text-lg">League Currently Not Support</h2>
            <br/>
            <p>Wave your flag and contact us to get this live ASAP.</p>
            <p>For now here&apos;s some useful links:</p>
            <ul className="text-center">
                <li className="text-blue-600 underline"><Link href="/">Home</Link></li>
                <li className="text-blue-600 underline"><Link href="/live">Live Matches</Link></li>
                <li className="text-blue-600 underline"><Link href="/leagues">Leagues</Link></li>
                <li className="text-blue-600 underline"><Link href="/teams">Teams</Link></li>
            </ul>
        </div>
    )
}