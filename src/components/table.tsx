import type { TableHeaderType } from "../types/models"
import type { VoteType } from "../types/models"

interface TableProps {
    tableHeader: TableHeaderType[],
    tableBody: VoteType[],
    winner: string
    handleclaimed: (id: string) => void
}

const Table = ({tableHeader, tableBody, winner, handleclaimed}: TableProps ) => {
    return(
        <table className="w-[95%] border-collapse overflow-hidden rounded-xl shadow-md border border-black">
            <thead className="bg-gray-100 font-anton tracking-wide text-gray-700">
                <tr>
                    {tableHeader.map((key, value) => (
                        <th 
                            key={value}
                            className="py-3 px-4 text-center border-black"
                        >
                            {key.label}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody className="font-outfit text-[clamp(0.75rem,2vw,1.10rem)]">
                {tableBody.map((row, index) => (
                    <tr
                        key={index}
                        className={`
                            border-b hoverable:hover:bg-gray-50 transition relative
                            ${row.claimed ? "opacity-50 after:content-[''] after:absolute after:left-0 after:right-0 after:top-1/2 after:h-[2px] after:bg-black" : ""}
                        `}
                    >
                        <td className="text-center py-3 px-4 max-w-[12rem] truncate">
                            {row.id}
                        </td>

                        <td className="text-center py-3 px-4 max-w-[12rem] truncate">
                            {row.fullname}
                        </td>

                        <td className="text-center py-3 px-4 max-w-[12rem] truncate">
                            {row.email}
                        </td>

                        <td className="text-center py-3 px-4">
                            {row.gcashnumber}
                        </td>

                        <td className="text-center py-3 px-4">
                            {row.bet}
                        </td>

                        <td className="text-center py-3 px-4">
                            <input 
                                type="checkbox"
                                disabled={row.claimed || winner === "" || row.betOn !== winner}
                                checked={row.claimed}
                                className={`h-5 w-5 accent-green-500 cursor-pointer disabled:opacity-50`}
                                onChange={() => handleclaimed(row.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}

export default Table