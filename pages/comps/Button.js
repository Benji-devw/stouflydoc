
export default function Button ({props, children}) {
    return (
        <button type="submit" className="btn-warpper text-white text-bold py-2 px-4 m-3 focus:outline-none focus:shadow-outline">
            {children}
        </button>
    )
}
