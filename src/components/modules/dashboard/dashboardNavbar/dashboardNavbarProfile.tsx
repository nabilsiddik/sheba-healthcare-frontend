import { IoMdNotifications } from "react-icons/io"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LuLogOut } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

interface IDropdownMenu {
    title: string,
    link: string,
    icon: React.ReactElement
}

const DashboardNavbarProfile = () => {

    const dropdownMenuList = [
        {
            title: 'Profile',
            link: '/profile',
            icon: <FaRegUserCircle />
        },
        {
            title: 'Change Password',
            link: '/profile',
            icon: <MdOutlinePassword />
        }
    ]

    return (
        <div className="flex items-center gap-5">
            <div className="relative">
                <div className="absolute w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center -top-3 -right-3 text-[12px] font-bold">10</div>
                <IoMdNotifications className="text-2xl" />
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Image src={'/assets/images/profile/user.png'} className='rounded-full cursor-pointer' width={30} height={30} alt="dashboard profile photo"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel className="text-lg">My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            {dropdownMenuList.length > 0 && dropdownMenuList.map((item: IDropdownMenu, index: number) => {
                                return <Link href={item?.link} key={index} className="cursor-pointer">
                                    <DropdownMenuItem>
                                    {item?.title}
                                    <DropdownMenuShortcut>{item?.icon}</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                </Link>
                            })}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="bg-transparent">
                            <Button className="w-full cursor-pointer">
                                Log out
                                <LuLogOut />
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default DashboardNavbarProfile
