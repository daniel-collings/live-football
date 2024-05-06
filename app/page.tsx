import Image from "next/image";
import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";
import React, {FC, ReactNode} from "react";
import Link from "next/link";
import LiveScores from "@/app/_components/LiveScores";
import _liveScores from "@/data/live-scores.json"

export default function Home() {
    const { response } = _liveScores

    return (

        <ConstraintLayoutTemplate>
            <div className="space-y-16">
                <div className="grid grid-cols-3 md:grid-cols-6 justify-between gap-4 items-center">
                    <Link href="/leagues/premier-league-39"><Card><Image alt="Premier League"
                                                                         src="/league-logos/prem-league.jpg"
                                                                         height={125}
                                                                         width={125}/></Card></Link>
                    <Link href="/leagues/major-league-soccer-253"><Card><Image alt="Major League"
                                                                               src="/league-logos/mls-logo.jpg"
                                                                               height={125}
                                                                               width={125}/></Card></Link>
                    <Link href="/leagues/la-liga-140"><Card><Image alt="La Liga"
                                                                   src="/league-logos/la-liga-logo.jpg"
                                                                   height={125}
                                                                   width={125}/></Card></Link>
                    <Link href="/leagues/bundesliga-78"> <Card><Image alt="Bundesliga"
                                                                      src="/league-logos/bundesliga-logo.jpg"
                                                                      height={125}
                                                                      width={125}/></Card></Link>
                    <Link href="/leagues/ligue-1-61"> <Card><Image alt="Ligue 1"
                                                                   src="/league-logos/ligue-1-logo.png"
                                                                   height={125}
                                                                   width={125}/></Card></Link>
                    <Link href="/leagues/serie-a-135"> <Card><Image alt="Serie A"
                                                                    src="/league-logos/Serie-A.png"
                                                                    height={125}
                                                                    width={125}/></Card></Link>
                </div>

                <div className="">
                    <LiveScores matches={response}/>

                </div>


            </div>
        </ConstraintLayoutTemplate>

    );
}

const Card: FC<{ children: ReactNode }> = ({children}) => {
    return (
        <div className="shadow rounded-md w-auto h-28 flex items-center justify-center">
            {children}
        </div>
    )
}

