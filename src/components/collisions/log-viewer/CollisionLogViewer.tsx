import CollisionLogView from "@/components/collisions/log-viewer/CollisionLogEntry";
import React, {FC} from "react";
import {CollisionLogEntry} from "@/lib/physics-utils/collisions/CollisionCalculator";


interface Props {
    collisionLog: CollisionLogEntry[]
}

const CollisionLogViewer: FC<Props> = ({collisionLog}) => {
    const [filter, setFilter] = React.useState<string>("");

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    }

    return <div className={"flex flex-col justify-center items-center gap-4"}>
        <h1 className="text-2xl font-bold mb-2">Collision Log</h1>

        <div className="flex flex-row gap-2">
            <p>Filter:</p>
            <select onChange={handleFilterChange} value={filter} className="bg-gray-200 rounded-md p-2">
                <option value="">All</option>
                <option value="particle-particle">Particle-Particle</option>
                <option value="particle-wall">Particle-Wall</option>
            </select>
        </div>

        {collisionLog.length === 0 && <p className="text-lg">No collisions yet.</p>}

        <div className="h-[400px] overflow-auto">
            {collisionLog.filter(c => c.type.startsWith(filter)).map((collision, index) => {
                return (
                    <CollisionLogView entry={collision} key={index} count={index + 1}></CollisionLogView>
                )
            })}
        </div>
    </div>
}

export default CollisionLogViewer;