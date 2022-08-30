export default function Header({ title = "Parking Management", subtitle='' }) {
    return (
        <section className="hero is-primary">
            <div className="hero-body">
                <p className="title">
                    {title}
                </p>
                <p className="subtitle">
                    {subtitle}
                </p>
            </div>
        </section>
    )
}