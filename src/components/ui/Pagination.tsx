import React from 'react'


type propTypes = {
    maxPage: number,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<propTypes> = ({ page, setPage, maxPage }) => {

    const [pageTemp, setPageTemp] = React.useState<number>(page)

    const previousClickAction = () => {
        if (page === 1) {
            return
        }
        setPage(page - 1)
        setPageTemp(page - 1)
    }

    const nextClickAction = () => {
        if (page >= maxPage) {
            return
        }
        setPage(page + 1)
        setPageTemp(page + 1)
    }

    const inputChangeAction = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageTemp(Number(event.target.value))
    }

    const inputBlurAction = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) > maxPage) {
            setPage(maxPage)
            setPageTemp(maxPage)
            return
        }

        if (Number(event.target.value) < 1) {
            setPage(1)
            setPageTemp(1)
            return
        }

        setPage(Number(event.target.value))
        setPageTemp(Number(event.target.value))
    }


    return (
        <div className="flex gap-4">
            <button onClick={previousClickAction}>Prev</button>
            <input className="w-6 border-2" type="text" onChange={inputChangeAction} onBlur={inputBlurAction} value={pageTemp} />
            <button onClick={nextClickAction}>Next</button>
        </div>
    )
}

export default Pagination