interface Player {
    id: number;
    name: string;
    photo: string;
    team: {
        id: number;
        name: string;
        logo: string;
    };
    yellowCards: number;
    redCards: number;
    assists: number;
    goals: number;
}

export function restructureData(datasets: any[]): Player[] {
    const playerMap: { [key: number]: Player } = {};

    datasets.forEach(dataset => {
        dataset.response.forEach((item: any) => {
            const playerId = item.player.id;
            const player = playerMap[playerId];

            if (player) {
                // Update existing player data
                player.yellowCards += item.statistics[0].cards.yellow;
                player.redCards += item.statistics[0].cards.red;
                player.assists += item.statistics[0].goals.assists || 0;
                player.goals += item.statistics[0].goals.total;
            } else {
                // Create new player object
                playerMap[playerId] = {
                    id: playerId,
                    name: item.player.name,
                    photo: item.player.photo,
                    team: {
                        id: item.statistics[0].team.id,
                        name: item.statistics[0].team.name,
                        logo: item.statistics[0].team.logo
                    },
                    yellowCards: item.statistics[0].cards.yellow,
                    redCards: item.statistics[0].cards.red,
                    assists: item.statistics[0].goals.assists || 0,
                    goals: item.statistics[0].goals.total
                };
            }
        });
    });

    return Object.values(playerMap);
}