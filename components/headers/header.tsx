import { ImStatsBars } from "react-icons/im";

function Header() {
    return (
        <header className="container py-1 mx-auto" >
            {/* <header className="container max-w-2xl px-6 py-6 mx-auto" > */}
            <div className="flex items-center justify-between">
                {/* User information */}
                <div className="flex items-center gap-2">
                    <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                        {/* Image */}
                        <img src="https://scontent-gru1-1.xx.fbcdn.net/v/t39.30808-6/319557058_3453741254872136_5863772816542046872_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=15mPO_xt18AQ7kNvgELTNrP&_nc_ht=scontent-gru1-1.xx&oh=00_AYCcBY3Nlvt-3qzvJPy1UzwThFaszWXF82p7qoRo1lQZwg&oe=6684DF80"
                            alt="Profile image"></img>
                    </div>
                    {/* Name */}
                    <small>Olá Halls e Mimikemi</small>
                </div>
                {/* Right side of our navigation */}
                <nav className="flex items-center gap-2">
                    <div>
                        <ImStatsBars className="text-2xl" />
                    </div>
                    <div>
                        <button className="btn btn-danger">
                            Sign out
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;