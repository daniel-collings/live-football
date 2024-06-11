import Image from "next/image";
import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";
import React, {FC, ReactNode} from "react";
import Link from "next/link";
import LiveScores from "@/app/_components/LiveScores";
import _liveScores from "@/data/live-scores.json"

export default function Home() {
    const { response } = _liveScores

    return (

        <div>
            <div className="flex flex-col bg-primary text-primary-content p-16">
                <div>
                    <h1>Live Football</h1>
                    <h2>By the fans, for the fans</h2>
                </div>

            </div>


            <ConstraintLayoutTemplate>
                <div className="space-y-16">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 justify-between gap-4 items-center">
                    <Link href="/leagues/premier-league-39">

                        <Card>
                            <Image alt="Premier League"
                                                                         src="/league-logos/prem-league.jpg"
                                                                         height={125}
                                                                         width={125}/>
                        </Card>
                    </Link>
                    <Link href="/leagues/major-league-soccer">
                        <Card>
                            <Image alt="Major League"
                                                                               src="/league-logos/mls-logo.jpg"
                                                                               height={125}
                                                                               width={125}/>
                        </Card>
                    </Link>
                    <Link href="/leagues/la-liga"><Card><Image alt="La Liga"
                                                                   src="/league-logos/la-liga-logo.jpg"
                                                                   height={125}
                                                                   width={125}/></Card></Link>
                    <Link href="/leagues/bundesliga"> <Card><Image alt="Bundesliga"
                                                                      src="/league-logos/bundesliga-logo.jpg"
                                                                      height={125}
                                                                      width={125}/></Card></Link>
                    <Link href="/leagues/ligue-1"> <Card><Image alt="Ligue 1"
                                                                   src="/league-logos/ligue-1-logo.png"
                                                                   height={125}
                                                                   width={125}/></Card></Link>
                    <Link href="/leagues/serie-a"> <Card><Image alt="Serie A"
                                                                    src="/league-logos/Serie-A.png"
                                                                    height={125}
                                                                    width={125}/></Card></Link>
                </div>

                <div className="">
                    {/* @ts-ignore*/}
                    <LiveScores matches={response}/>

                </div>


            </div>
        </ConstraintLayoutTemplate>
        </div>


    );
}

const Card: FC<{ children: ReactNode }> = ({children}) => {
    return (
        <div className="shadow rounded-md w-auto h-28 flex items-center justify-center">
            {children}
        </div>
    )
}

