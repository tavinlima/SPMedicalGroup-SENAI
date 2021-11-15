export default function Footer() {
    const data = new Date()

    return (
        <footer>
            <div className="container">
                <nav>
                    <p>sp medical group</p>
                    <p>{data.getFullYear()}</p>
                </nav>
            </div>
        </footer>
    )
}