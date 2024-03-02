import { FC, useState, useEffect } from "react";

import { requestAnimals, Animal } from "./api";
const Requirements: FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const [animal, setAnimal] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [result, setResult] = useState<Animal[]>([])
    const [byPage, setByPage] = useState<number>(4)

    useEffect(() => {
        setLoading(true)
        requestAnimals({ animal, amount, limit: byPage, offset: (page - 1) * byPage }).then((data) => {
            setResult(data)
            setLoading(false)
        }).catch(() => {
            throw new Error("something wrong...")   
        }
    )
    }, [animal, amount, page, byPage]);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col border-2 border-neutral-500 rounded-lg p-3 gap-3">
                <div className="flex gap-3">
                    <input
                        type="text"
                        className="border-2 border-neutral-500 pl-1 rounded-md"
                        placeholder="Animal"
                        onChange={(event) => setAnimal(event.target.value)}
                    />

                    <input
                        type="text"
                        className="border-2 border-neutral-500 pl-1 rounded-md"
                        placeholder="Amount"
                        onChange={(event) => setAmount(event.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        By page:
                        <input
                            type="number"
                            className="w-14 pl-2 border-2 border-neutral-500 px-1 rounded-md"
                            value={byPage}
                            min={1}
                            max={11}
                            onChange={(event) => setByPage(Number(event.target.value))}
                        />
                    </span>
                    <div className="flex items-center w-28 justify-between">
                        <button
                            className={`border-2 border-neutral-500 px-1 rounded-md ${
                                page === 1 ? "opacity-50" : "opacity-100"
                            }`}
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            prev
                        </button>
                        {page}
                        <button
                            className={`border-2 border-neutral-500 px-1 rounded-md ${
                                byPage > result.length ? "opacity-50" : "opacity-100"
                            }`}
                            disabled={byPage > result.length}
                            onClick={() => setPage(page + 1)}
                        >
                            next
                        </button>
                            
                    </div>
                </div>

                {
                    loading ? (
                        "Loading..."
                    ) : ( 
                        result.length !== 0 ? (
                            <ul>
                                {
                                    result.map((res) => (
                                        <li key={res.id}>{res.animal} {res.amount}</li>    
                                    ))   
                                }
                            </ul>
                        ) : ("No Results")
                    )
                }
            </div>
        </div>
    );
};

export default Requirements;
