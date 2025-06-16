export function Header() {
    return (
        <header className="bg-primary text-primary-content p-4">
            <div className="flex flex-wrap justify-center items-center gap-4 text-center">
                <img src="/logo.svg" alt="Logo" className="w-10 h-10"/>
                <span className="text-2xl font-semibold">Green Berlin</span>
            </div>
        </header>
    );
}
