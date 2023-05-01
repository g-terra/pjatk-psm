import {Particle} from "@/lib/physics-utils/Particle";
import React, {FC} from "react";
import {CollisionLogEntry} from "@/lib/physics-utils/collisions/CollisionCalculator";
import ParticleParticleEntryView from "@/components/collisions/log-viewer/ParticleParticleEntryView";
import ParticleWallEntryView from "@/components/collisions/log-viewer/ParticleWallEntryView";

interface Props {
    entry: CollisionLogEntry

    count: number
}


function renderEntry(entry: CollisionLogEntry) {
    return <>
        {
            entry.type === "particle-particle" && <ParticleParticleEntryView entry={entry}/>
        }
        {
            entry.type === "particle-wall" && <ParticleWallEntryView entry={entry}/>
        }
    </>;
}

const CollisionLogEntryView: FC<Props> = ({entry,count}) => {

    const [collapsed, setCollapsed] = React.useState<boolean>(false);

    return <div className="flex flex-col bg-white shadow-md p-4 gap-2 rounded-xl mt-2 min-w-[900px]">
        <h1 className="text-xl  font-bold"> Collision number {count} - Type: {entry.type} </h1>
        {
            collapsed && renderEntry(entry)
        }
        <button onClick={() => setCollapsed(!collapsed)} className="bg-gray-200 rounded-md p-2">
            {collapsed ? "Collapse" : "Expand"}
        </button>

    </div>;
}


export default CollisionLogEntryView;

